import React, { Fragment, useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from '../components/ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AuthorizationContext } from '../contexts/AuthorizationContext'
import { AppContext } from '../contexts/AppContext'
import cardsApiInstance from '../utils/CardsApi.js';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import { checkLiked } from '../components/Card';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from '../components/ConfirmationPopup';
import Login from '../components/Login';
import Register from '../components/Register';
import authorizationApiInstance from '../utils/AuthorizationApi';
import { PAGES } from '../utils/Consts';
import { ProtectedRoute } from '../components/ProtectedRoute';
import infoIcon from '../images/infotooltip/info.svg';
import errorIcon from '../images/infotooltip/error.svg';
import InfoTooltip from '../components/InfoTooltip';

function App() {

  // popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Открыт попап редактирования профиля?
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // Открыт попап добавления карточки?
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // Открыт попап редактирования аватара?
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false); // Открыт попап подтверждения операции?
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // Открыт попап расширенного изображения карточки?
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false); // Открыт попап с информационным сообщением?

  const [selectedCard, setSelectedCard] = useState(null); // Развернутая карточка
  const [cards, setCards] = useState([]); // Карточки мест
  const tokenStorageKey = 'jwt';

  const navigate = useNavigate();

  const errorHandler = (error, afterClose = null) => {
    console.log(error);

    //alert(error);
    handleInfoTooltip(error, errorIcon, afterClose);
  }

  // Текущий контекст авторизаци
  const [authorizationContext, setAuthorizationContext] = useState(
    { loggedIn: false, email: '', token: '' } // Данные о текущем авторизованном пользователе
  );

  const handleLogin = ({ email, password }) => {

    authorizationApiInstance.authorize({ email, password })
      .then(data => {
        if (data.token) {
          localStorage.setItem(tokenStorageKey, data.token);
          setAuthorizationContext({ loggedIn: true, email: email, token: data.token });
          navigate(PAGES.MAIN);
        }
      })
      .catch(err => errorHandler(err));
  }

  const handleRegister = ({ email, password }) => {
    authorizationApiInstance.register({ email, password })
      .then((data) => {
        handleInfoTooltip("Вы успешно зарегистрировались!", infoIcon,
          navigate(PAGES.LOGIN)); // После регистрации перенаправляем на окно логина
      })
      .catch(err => errorHandler(err));
  }

  const handleLogout = () => {
    // Удаление токена из локального хранилища
    localStorage.removeItem(tokenStorageKey);

    // удаление данных пользователя
    setAuthorizationContext({ loggedIn: false, email: '', token: '' });
    navigate(PAGES.LOGIN);
  }

  const tockenCheck = () => {
    const localToken = localStorage.getItem(tokenStorageKey);

    if (localToken) {
      authorizationApiInstance.getContent(localToken)
        .then(data => {
          setAuthorizationContext({ loggedIn: true, email: data.data.email, token: localToken });
          navigate(PAGES.MAIN);
        })
        .catch(error => errorHandler(error));
    }
  }

  useEffect(() => {
    tockenCheck(); // Проверить наличие токена 1 раз на старте
  }, []);



  // Текущий пользователь, по умолчанию заполним некоторыми данными, чтобы меньше проверок делать далее
  const [currentUser, setCurrentUser] = useState({
    _id: -1, // Идентификатор пользователя
    name: '', // Имя пользователя
    about: '', // О пользователе
    avatar: '' // Аватар
  });


  useEffect(() => {
    cardsApiInstance.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(error => errorHandler(error));
  }
    , [] // Пустой массив = Эффект не зависит ни от чего = выполняется 1 раз при монтировании
  );

  useEffect(() => {
    if (!currentUser || currentUser._id === -1)
      setCards([]); // Пока не залогинились - пустой набор карточек
    else
      cardsApiInstance.getCards()
        .then(result => {
          setCards(result);
        })
        .catch(error => errorHandler(error));
  }
    , [currentUser] // Запрашиваем карточки после логина пользователя
  );

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function onEditProfileInfo() {
    setIsEditProfilePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onAddCard() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // Текст и иконка для высплывабщего сообщения
  const [infoTooltip, setInfoTooltip] = useState({
    message: '',
    iconSource: '',
    afterClose: null
  });

  function handleInfoTooltip(msg, iconSource, afterClose = null) {

    setInfoTooltip({
      message: msg,
      iconSource: iconSource,
      afterClose: afterClose
    });

    setIsInfoTooltipOpen(true);
  }

  // Состояние ожидания ответа от сервера
  const [isLoading, setIsLoading] = React.useState(false);

  // Универсальная функция, которая принимает функцию запроса
  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setIsLoading(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      // в каждом запросе нужно ловить ошибку
      .catch(error => errorHandler(error))
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ name, about }) {

    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
    function makeRequest() {
      // `return` позволяет потом дальше продолжать цепочку `then, catch, finally`
      return cardsApiInstance.setUserInfo({ name, about })
        .then(data => setCurrentUser(data));
    }

    // вызываем универсальную функцию, передавая в нее запрос
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatar }) {

    function makeRequest() {
      return cardsApiInstance.setAvatar(avatar)
        .then(data => setCurrentUser(data));
    }

    handleSubmit(makeRequest);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = checkLiked(card, currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    cardsApiInstance.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(error => errorHandler(error));
  }

  // Объект-параметр для передачи в окно подтверждения операции
  const [handleConfirmationParam, setHandleConfirmationParam] = useState(null);

  function handleCardDeleteConfirmation(deletingCard) {
    setHandleConfirmationParam(deletingCard);
    setIsConfirmationPopupOpen(true);
  }

  function handleCardDelete(deletingCard) {
    function makeRequest() {
      return cardsApiInstance.deleteCard(deletingCard._id)
        .then(() => {
          setCards(cards.filter(iCard => iCard._id !== deletingCard._id));
        });
    }

    handleSubmit(makeRequest);
    setHandleConfirmationParam(null);
  }

  function handleAddPlace({ name, link }) {

    function makeRequest() {
      return cardsApiInstance.addCard({ name, link })
        .then(newCard => setCards([newCard, ...cards]));
    }

    handleSubmit(makeRequest);
  }

  return (
    <AppContext.Provider value={{ isLoading }}>
      <AuthorizationContext.Provider value={authorizationContext}>
        <CurrentUserContext.Provider value={currentUser}>
          <Fragment>
            <Header handleLogout={handleLogout} />

            <Routes>

              <Route path={PAGES.MAIN} element={<ProtectedRoute element={Main}
                onEditProfile={onEditProfileInfo}
                onAddPlace={onAddCard}
                onEditAvatar={onEditAvatar}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteConfirmation}
              />} />

              <Route path={PAGES.LOGIN} element={
                <Login handleLogin={handleLogin} />
              } />

              <Route path={PAGES.REGISTER} element={
                <Register handleRegister={handleRegister} />
              } />

              <Route path="*" element={<Navigate to={PAGES.MAIN} replace />} />

            </Routes>
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser} />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />

            <ConfirmationPopup
              isOpen={isConfirmationPopupOpen}
              onClose={closeAllPopups}
              onConfirm={handleCardDelete}
              onConfirmParam={handleConfirmationParam}
            />

            <ImagePopup
              isOpen={isImagePopupOpen}
              card={selectedCard}
              onClose={closeAllPopups}
            />

            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              afterClose={infoTooltip.afterClose}
              message={infoTooltip.message}
              iconLink={infoTooltip.iconSource}
            />



          </Fragment>
        </CurrentUserContext.Provider>
      </AuthorizationContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
