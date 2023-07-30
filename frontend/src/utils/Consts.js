/*
const validationOptions = {
    formSelector: '.form',
    inputSectionSelector: '.form__input-section',
    inputSelector: '.form__input',
    errorSelector: '.form__error',
    submitSelector: '.form__button-save',

    inputInvalidClass: 'form__input_invalid',
    disabledButtonClass: 'form__button-save_disabled',
    inputErrorClass: 'form__error_active'
}
*/

const cardTemplateId = "card-template";
const CARDS_SERVER_URL = 'https://mesto.nomoreparties.co/v1/cohort-64';
const AUTHORIZATION_SERVER_URL = 'https://auth.nomoreparties.co';

const myToken = 'aa9e9707-2a21-4ede-81bb-dea5ef0ef1d1';

const REST_METHODS = { GET: 'GET', PATCH: 'PATCH', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

const PAGES = { MAIN: "/main", LOGIN: "/signin", REGISTER: "/signup" };

export {
    cardTemplateId, CARDS_SERVER_URL as serverUrl, myToken,
    REST_METHODS, AUTHORIZATION_SERVER_URL, PAGES
}
