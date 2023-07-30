import { REST_METHODS, AUTHORIZATION_SERVER_URL } from './Consts.js';

class AuthorizationApi {

    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
    }

    _processError(res, conversionMap) {
        const val = conversionMap[res.status];
        const errorInfo = val ? val : res.statusText;
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
                        this._processError(res,
                            {
                                400: "Некорректно заполнено одно из полей",
                            })
            );
    };

    authorize({ email, password }) {
        return fetch(`${this.baseUrl}/signin`, {
            method: REST_METHODS.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(
                res =>
                    res.ok ? res.json() :
                        this._processError(res,
                            {
                                400: "Не передано одно из полей",
                                401: "Пользователь с указанным email не найден"
                            })
            );
    };

    getContent(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: REST_METHODS.GET,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(
                res =>
                    res.ok ? res.json() :
                        this._processError(res,
                            {
                                // Если токен не передан или передан без Bearer
                                400: "Токен не передан или передан не в том формате",

                                // Если передан некорректный токен
                                401: "Переданный токен некорректен"

                            })
            );
    };
}

const authorizationApiInstance = new AuthorizationApi({
    baseUrl: AUTHORIZATION_SERVER_URL
});

export default authorizationApiInstance;
