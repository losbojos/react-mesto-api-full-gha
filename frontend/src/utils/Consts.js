const cardTemplateId = "card-template";

const SERVER_URL = 'https://api.losbojos.mesto.nomore.nomoreparties.co';
//const SERVER_URL = 'https://0.0.0.0:3000';

const REST_METHODS = { GET: 'GET', PATCH: 'PATCH', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

const PAGES = { MAIN: "/main", LOGIN: "/signin", REGISTER: "/signup" };

const authHeader = "authorization";

export {
    cardTemplateId,
    SERVER_URL,
    REST_METHODS,
    PAGES,
    authHeader,
}
