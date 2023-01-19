const { Request, Response, User, UserSession, Repository, PasswordManager, JwtTokenCreator } = require('./authAdditional');

const COOKIE_KEY_REFRESH_TOKEN = "refresh_token"
const HEADER_KEY_APP_TYPE_ID = "app_type_id"
const EXPIRES_AT_SHORT_TIME_15_MIN = 15 * 60 * 1000;
const EXPIRES_AT_LONG_TIME_30_DAY = 30 * 24 * 60 * 60 * 1000;

class AuthServer {
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
        let appTypeId = request.headersMap.get(HEADER_KEY_APP_TYPE_ID);
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
     * Keep 'refresh_token' in Secure; HttpOnly cookie is mandatory!
     * @param username {string}
     * @param request {Request}
     * @return {Response}
     * @private
     */
    #authorize = (username, request) => {
        const response = new Response().setCookiesMap(request.cookiesMap);

        const refreshToken = JwtTokenCreator.newToken(username, EXPIRES_AT_LONG_TIME_30_DAY);
        response.cookiesMap.set(COOKIE_KEY_REFRESH_TOKEN, `Set-Cookie: ${COOKIE_KEY_REFRESH_TOKEN}=${refreshToken}; Expires=${EXPIRES_AT_LONG_TIME_30_DAY}; Secure; HttpOnly`);

        return response
            .setBody({
                "access_token": JwtTokenCreator.newToken(username, EXPIRES_AT_SHORT_TIME_15_MIN),
                "token_type": "Bearer",
                "expires_in": EXPIRES_AT_SHORT_TIME_15_MIN,
                [HEADER_KEY_APP_TYPE_ID]: this.#userSessionAppTypeId(username, request)
            })
            .setStatusCode(200);
    }

    /**
     * Identify user app
     * support login for multiple devices and browsers
     * @param username {string}
     * @param request {Request}
     */
    #userSessionAppTypeId = (username, request) => {
        let appTypeId = request.headersMap.get(HEADER_KEY_APP_TYPE_ID);

        if (!Repository.usernameToUserSessionsMap.has(username)) {
            Repository.usernameToUserSessionsMap.set(username, new Map());
        }

        const session = Repository.usernameToUserSessionsMap.get(username).get(appTypeId);
        if (session) {
            Repository.usernameToUserSessionsMap.get(username).set(session.appTypeId, {...session, refreshToken});
        } else {
            appTypeId = `app_${Repository.usernameToUserSessionsMap.get(username)?.length ?? 0}`
            Repository.usernameToUserSessionsMap.get(username).set(appTypeId, new UserSession(username, appTypeId, refreshToken));
        }

        return appTypeId;
    }
}

module.exports = { AuthServer, COOKIE_KEY_REFRESH_TOKEN, HEADER_KEY_APP_TYPE_ID, EXPIRES_AT_SHORT_TIME_15_MIN, EXPIRES_AT_LONG_TIME_30_DAY };
