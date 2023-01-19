class Request {
    setBody(body) {
        this.body = body;
        return this;
    }

    setCookiesMap(cookiesMap) {
        this.cookiesMap = cookiesMap;
        return this;
    }

    setHeadersMap(headersMap) {
        this.headersMap = headersMap;
        return this;
    }

    toString() {
        return `body: ${this.body}\nheadersMap: ${this.headersMap}\ncookiesMap: ${this.cookiesMap}`
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

module.exports = { Request, Response, User, UserSession, Repository, PasswordManager, JwtTokenCreator };
