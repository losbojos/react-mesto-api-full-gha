import { SERVER_URL, REST_METHODS, authHeader } from './Consts.js';

const urls = { usersMe: '/users/me', avatar: '/avatar', cards: '/cards', likes: '/likes' };

class CardsApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    setToken(token) {
        this._token = token;
    }

    getUserInfo() {
        return this._requestServer(urls.usersMe, REST_METHODS.GET);
    }

    setUserInfo({ name, about }) {
        return this._requestServer(urls.usersMe, REST_METHODS.PATCH, { name, about });
    }

    setAvatar(link) {
        return this._requestServer(
            `${urls.usersMe}${urls.avatar}`,
            REST_METHODS.PATCH,
            { avatar: link });
    }

    getCards() {
        return this._requestServer(urls.cards, REST_METHODS.GET);
    }

    addCard({ name, link }) {
        return this._requestServer(urls.cards, REST_METHODS.POST, { name, link });
    }

    deleteCard(id) {
        return this._requestServer(`${urls.cards}/${id}`, REST_METHODS.DELETE);
    }

    changeLikeCardStatus(cardId, newLikeStatus) {
        return this._requestServer(`${urls.cards}/${cardId}${urls.likes}`,
            newLikeStatus ? REST_METHODS.PUT : REST_METHODS.DELETE);
    }

    _requestServer(urlAddition, method, bodyObject = null) {
        const myHeaders = new Headers();
        myHeaders.append([authHeader], `Bearer ${this._token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: method,
            credentials: "include",
            headers: myHeaders,
        };

        if (bodyObject)
            requestOptions.body = JSON.stringify(bodyObject);

        return fetch(this._baseUrl + urlAddition, requestOptions)
            .then(response => {
                if (response.ok)
                    return response.json();

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${response.status}`);
            });
    }
}

const cardsApiInstance = new CardsApi(SERVER_URL);

export default cardsApiInstance;