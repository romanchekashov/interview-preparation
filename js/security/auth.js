const COOKIE_KEY_REFRESH_TOKEN = "refresh_token"
const COOKIE_KEY_APP_TYPE_ID = "app_type_id"

class Request {
    setBody(body) {
        this.body = body;
        return this;
    }

    setCookiesMap(cookiesMap) {
        this.cookiesMap = cookiesMap;
        return this;
    }

    toString() {
        return `body: ${this.body}\ncookiesMap: ${this.cookiesMap}`
    }
}
class Response extends Request {
    statusCode = 200;

    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    toString() {
        return super.toString() + `\nstatusCode: ${this.statusCode}`
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
        const token = `jwt(${username}, ${expiresAt}, ${secret})` + (Math.round(Math.random() * new Date().getTime()));
        this.#tokens.set(token, {username, expiresAt, created: new Date()})
        return token;
    }

    static parseToken(token) {
        const claims = this.#tokens.get(token);
        if (!claims) {
            throw new Error('invalid token')
        }
        if (new Date().getTime() - claims.created > claims.expiresAt) {
            throw new Error('token expired')
        }
        return claims.username;
    }
}
const EXPIRES_AT_SHORT_TIME_15_MIN = 15 * 60 * 1000;
const EXPIRES_AT_LONG_TIME_30_DAY = 30 * 24 * 60 * 60 * 1000;

class Server {
    /**
     * Creates new user
     * @param request {Request}
     * @return {Response}
     */
    signUp = (request) => {
        const {username, password} = request.body;

        if (!username || !password || Repository.usernameToUserMap.has(username) || !PasswordManager.isPasswordStrong(password)) {
            return new Response().setBody(`Correct username and password are required`).setCookiesMap(request.cookiesMap).setStatusCode(400);
        }

        Repository.usernameToUserMap.set(username, new User(username, PasswordManager.encryptPassword(password)));

        return new Response().setCookiesMap(request.cookiesMap).setStatusCode(201);
    }

    /**
     * Authenticate and authorize user
     * @param request {Request}
     * @return {Response}
     */
    signIn = (request) => {
        const {username, password} = request.body;

        const user = Repository.usernameToUserMap.get(username);
        if (!user || user.password !== PasswordManager.encryptPassword(password)) {
            return new Response().setBody(`Correct username and password are required`).setCookiesMap(request.cookiesMap).setStatusCode(400);
        }

        return this.#authorize(username, request)
    }

    /**
     * Issue new access token and refresh token
     * @param request {Request}
     * @return {Response}
     */
    refreshToken = (request) => {
        let session;
        try {
            session = this.#checkIsSignInRequiredAndGetUserSession(request);
        } catch (err) {
            return new Response().setBody(err.message).setCookiesMap(request.cookiesMap).setStatusCode(401);
        }

        return this.#authorize(session.username, request);
    };

    /**
     * delete user session
     * @param request {Request}
     * @return {Response}
     */
    signOut = (request) => {
        let session;
        try {
            session = this.#checkIsSignInRequiredAndGetUserSession(request);
        } catch (err) {
            return new Response().setBody(err.message).setCookiesMap(request.cookiesMap).setStatusCode(401);
        }

        Repository.usernameToUserSessionsMap.get(session.username).delete(session.appTypeId);

        const response = new Response().setCookiesMap(request.cookiesMap);
        response.cookiesMap.clear();
        return response;
    }

    /**
     * @param request {Request}
     * @private
     */
    #checkIsSignInRequiredAndGetUserSession = (request) => {
        let refreshToken = request.cookiesMap.get(COOKIE_KEY_REFRESH_TOKEN)?.substring('Set-Cookie: refresh_token='.length).split(';')[0];
        let appTypeId = request.cookiesMap.get(COOKIE_KEY_APP_TYPE_ID)?.substring('Set-Cookie: app_type_id='.length).split(';')[0];
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
     * Authorize user
     * @param username {string}
     * @param request {Request}
     * @return {Response}
     * @private
     */
    #authorize = (username, request) => {
        const response = new Response().setCookiesMap(request.cookiesMap).setStatusCode(200);

        const refreshToken = JwtTokenCreator.newToken(username, EXPIRES_AT_LONG_TIME_30_DAY);
        response.cookiesMap.set(COOKIE_KEY_REFRESH_TOKEN, `Set-Cookie: ${COOKIE_KEY_REFRESH_TOKEN}=${refreshToken}; Expires=${EXPIRES_AT_LONG_TIME_30_DAY}; Secure; HttpOnly`);

        // support login for multiple devices and browsers
        let appTypeId = request.cookiesMap.get(COOKIE_KEY_APP_TYPE_ID);

        if (!Repository.usernameToUserSessionsMap.has(username)) {
            Repository.usernameToUserSessionsMap.set(username, new Map());
        }

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

    userSessions() {
        console.log('userSessions', Repository.usernameToUserSessionsMap);
    }
}

class BrowserSession {
    cookiesMap = new Map();

    /**
     * @param server {Server}
     * @param user {User}
     */
    constructor(server, user) {
        this.server = server;
        this.user = user;
    }

    signUp() {
        const response = this.server.signUp(new Request().setBody(this.user).setCookiesMap(this.cookiesMap));
        console.log('signUp', this.user, response)
        return response;
    }

    signIn() {
        const response = this.server.signIn(new Request().setBody(this.user).setCookiesMap(this.cookiesMap));
        console.log('signIn', this.user, response)
        return response;
    }

    signOut() {
        const response = this.server.signOut(new Request().setCookiesMap(this.cookiesMap));
        console.log('signOut', response)
        return response;
    }

    refreshToken() {
        const response = this.server.refreshToken(new Request().setCookiesMap(this.cookiesMap));
        console.log('refreshToken', response)
        return response;
    }

    userSessions() {
        this.server.userSessions();
    }
}

const server = new Server();
const client = new BrowserSession(server, new User('roman', 'A23HJkl@'));
// const client2 = new BrowserSession(server, new User('user2', 'A23HJkl@'));

client.signIn();
client.userSessions();
client.signUp();
client.signIn();
client.userSessions();
client.refreshToken();
client.userSessions();
client.signOut();
client.userSessions();
