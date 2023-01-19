const COOKIES_MAP = new Map();
const COOKIE_KEY_REFRESH_TOKEN = "refresh_token"
const COOKIE_KEY_APP_TYPE_ID = "app_type_id"

class Request {
    cookiesMap = COOKIES_MAP;
    statusCode;

    constructor(body, statusCode = 200) {
        this.body = body;
        this.statusCode = statusCode;
    }
}
class Response extends Request {
    constructor(body, statusCode) {
        super(body, statusCode)
    }
}

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
class UserSession {
    constructor(username, appTypeId, refreshToken) {
        this.username = username;
        this.appTypeId = appTypeId;
        this.refreshToken = refreshToken;
    }
}
class Repository {
    static usernameToUserMap = new Map();
    static usernameToUserSessionsMap = new Map();
}

class PasswordManager {
    static isPasswordStrong = (password) => new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(password);

    /**
     * Examples of adaptive one-way functions that should be used include bcrypt, PBKDF2, scrypt, and argon2.
     * https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html
     * @param password
     * @return {`bcrypt(${string}, salt)`}
     */
    static encryptPassword = (password) => `bcrypt(${password}, salt)`;
}

class JwtTokenCreator {
    static #tokens = new Map()

    static newToken(username, expiresAt) {
        const secret = 'JWT_SECRET_KEY'; // read from .env
        const token = `jwt(${username}, ${expiresAt}, ${secret})`;
        this.#tokens.set(token, {username, expiresAt, created: new Date()})
        return token;
    }

    static parseToken(token) {
        const claims = this.#tokens.get(token);
        if (!claims || new Date().getTime() - claims.created > claims.expiresAt) {
            throw new Error('invalid token')
        }
        return claims.username;
    }
}
const EXPIRES_AT_SHORT_TIME_15_MIN = 15 * 60 * 1000;
const EXPIRES_AT_LONG_TIME_30_DAY = 30 * 24 * 60 * 60 * 1000;

/**
 * Creates new user
 * @param request {Request}
 * @return {Response}
 * @private
 */
const signUp = (request) => {
    const {username, password} = request.body;

    if (!username || !password || Repository.usernameToUserMap.has(username) || !PasswordManager.isPasswordStrong(password)) {
        throw new Error(`Correct username and password are required`)
    }

    Repository.usernameToUserMap.set(username, new User(username, PasswordManager.encryptPassword(password)));

    return new Response('ok', 201);
}

/**
 * Authenticate and authorize user
 * @param request {Request}
 * @return {Response}
 * @private
 */
const signIn = (request) => {
    const {username, password} = request.body;

    const user = Repository.usernameToUserMap.get(username);
    if (!user || user.password !== PasswordManager.encryptPassword(password)) {
        throw new Error(`Correct username and password are required`)
    }

    return _authorize(request)
}

/**
 * Authenticate and authorize user
 * @param request {Request}
 * @return {Response}
 * @private
 */
const refreshToken = (request) => {
    _checkIsSignInRequiredAndGetUserSession(request);
    return _authorize(request);
};

/**
 * Authenticate and authorize user
 * @param request {Request}
 * @return {Response}
 * @private
 */
const signOut = (request) => {
    let session;
    try {
        session = _checkIsSignInRequiredAndGetUserSession(request);
    } catch (err) {
        return new Response(err.message, 401);
    }

    Repository.usernameToUserSessionsMap.get(session.username).delete(session.appTypeId);

    const response = new Response();
    response.cookiesMap.clear();
    return response;
}

/**
 * Authenticate and authorize user
 * @param request {Request}
 */
const _checkIsSignInRequiredAndGetUserSession = (request) => {
    let refreshToken = request.cookiesMap.get(COOKIE_KEY_REFRESH_TOKEN);
    let appTypeId = request.cookiesMap.get(COOKIE_KEY_APP_TYPE_ID);
    if (!refreshToken || !appTypeId) {
        throw new Error('sign in required')
    }

    const username = JwtTokenCreator.parseToken(refreshToken);
    const userSession = Repository.usernameToUserSessionsMap.get(username).get(appTypeId);
    if (!userSession || userSession.refreshToken !== refreshToken) {
        throw new Error('sign in required')
    }

    return userSession;
}

/**
 * Authenticate and authorize user
 * @param request {Request}
 * @return {Response}
 * @private
 */
const _authorize = (request) => {
    const {username} = request;
    const response = new Response();

    const refreshToken = JwtTokenCreator.newToken(username, EXPIRES_AT_LONG_TIME_30_DAY);
    response.cookiesMap.set(COOKIE_KEY_REFRESH_TOKEN, `Set-Cookie: ${COOKIE_KEY_REFRESH_TOKEN}=${refreshToken}; Expires=${EXPIRES_AT_LONG_TIME_30_DAY}; Secure; HttpOnly`);

    // support login for multiple devices and browsers
    let appTypeId = request.cookiesMap.get(COOKIE_KEY_APP_TYPE_ID);
    const session = Repository.usernameToUserSessionsMap.get(username).get(appTypeId);
    if (session) {
        Repository.usernameToUserSessionsMap.get(username).set(session.appTypeId, {...session, refreshToken});
    } else {
        appTypeId = `app_${Repository.usernameToUserSessionsMap.get(username)?.length ?? 0}`
        response.cookiesMap.set(COOKIE_KEY_APP_TYPE_ID, `Set-Cookie: ${COOKIE_KEY_APP_TYPE_ID}=${appTypeId}`);
        Repository.usernameToUserSessionsMap.get(username).set(appTypeId, new UserSession(username, appTypeId, refreshToken));
    }

    response.body = {
        "access_token": JwtTokenCreator.newToken(username, EXPIRES_AT_SHORT_TIME_15_MIN),
        "token_type":"Bearer",
        "expires_in":EXPIRES_AT_SHORT_TIME_15_MIN
    };

    return response;
}
