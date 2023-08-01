import { REST_METHODS, SERVER_URL, authHeader } from './Consts.js';

class AuthorizationApi {

    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
    }

    async _processError(res, conversionMap = null) {
        let errorInfo = res.statusText;
        if (conversionMap && conversionMap[res.status])
            errorInfo = conversionMap[res.status];
        if (res.body) {
            const jsonObj = await res.json();
            if (jsonObj && jsonObj.message) {
                errorInfo = jsonObj.message;
            }
        }

        return Promise.reject(`Ошибка ${res.status}: ${errorInfo}`);
    }

    register({ email, password }) {
        return fetch(`${this.baseUrl}/signup`, {
            method: REST_METHODS.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(
                res =>
                    res.ok ? res.json() :
                        this._processError(res)
            );
    };

    authorize({ email, password }) {
        return fetch(`${this.baseUrl}/signin`, {
            method: REST_METHODS.POST,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(
                res =>
                    res.ok ? res.json() :
                        this._processError(res)
            );
    };

    getContent(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: REST_METHODS.GET,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                [authHeader]: `Bearer ${token}`,
            },
        })
            .then(
                res =>
                    res.ok ? res.json() :
                        this._processError(res)
            );
    };
}

const authorizationApiInstance = new AuthorizationApi({
    baseUrl: SERVER_URL
});

export default authorizationApiInstance;
