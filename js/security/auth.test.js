const { Request, User, Repository } = require('./authAdditional');
const { AuthServer, HEADER_KEY_APP_TYPE_ID } = require('./auth');

class BrowserSession {
    cookiesMap = new Map();
    headersMap = new Map();
    localStorageMap = new Map();

    /**
     * @param server {AuthServer}
     * @param user {User}
     */
    constructor(server, user) {
        this.server = server;
        this.user = user;
    }

    signUp() {
        const response = this.server.signUp(new Request().setBody(this.user).setCookiesMap(this.cookiesMap).setHeadersMap(this.headersMap));
        console.log('signUp', this.user, response)
        return response;
    }

    signIn() {
        const response = this.server.signIn(new Request().setBody(this.user).setCookiesMap(this.cookiesMap).setHeadersMap(this.headersMap));
        response.body[HEADER_KEY_APP_TYPE_ID] && this.localStorageMap.set(HEADER_KEY_APP_TYPE_ID, response.body[HEADER_KEY_APP_TYPE_ID]);
        console.log('signIn', this.user, response)
        return response;
    }

    signOut() {
        const request = new Request().setCookiesMap(this.cookiesMap);
        if (this.localStorageMap.has(HEADER_KEY_APP_TYPE_ID)) {
            request.setHeadersMap(new Map([[HEADER_KEY_APP_TYPE_ID, this.localStorageMap.get(HEADER_KEY_APP_TYPE_ID)]]));
        }

        const response = this.server.signOut(request);
        this.localStorageMap.delete(HEADER_KEY_APP_TYPE_ID);
        console.log('signOut', response)
        return response;
    }

    refreshToken() {
        const request = new Request().setCookiesMap(this.cookiesMap);
        if (this.localStorageMap.has(HEADER_KEY_APP_TYPE_ID)) {
            request.setHeadersMap(new Map([[HEADER_KEY_APP_TYPE_ID, this.localStorageMap.get(HEADER_KEY_APP_TYPE_ID)]]));
        }

        const response = this.server.refreshToken(request);
        console.log('refreshToken', response)
        return response;
    }

    userSessions() {
        console.log('userSessions', Repository.usernameToUserSessionsMap);
    }
}

const server = new AuthServer();
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
