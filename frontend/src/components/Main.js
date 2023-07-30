import React, { useContext } from 'react';
import { Card } from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {

    const {
        onEditProfile, // Обработчик редактирования профиля
        onAddPlace, // Обработчик добавления карточки
        onEditAvatar, // Обработчик редактирования аватара
        onCardClick, // Обработчик нажатия на изображении карточки
        cards, // Массив карточек
        onCardLike, // Обработчик лайка
        onCardDelete // Обработчик удаления карточки
    } = props;

    const currentUser = useContext(CurrentUserContext); // Текущий пользователь в глобальном контексте

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-section">
                    <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
                    <button type="button" aria-label="Установить аватар пользователя"
                        className="profile__avatar-button cursor-pointer" onClick={onEditAvatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name overflow-ellipsis">{currentUser.name}</h1>
                        <button type="button" aria-label="Редактировать профиль"
                            className="profile__edit-button cursor-pointer" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__about overflow-ellipsis">{currentUser.about}</p>
                </div>
                <button type="button" aria-label="Добавить фото" className="profile__add-button cursor-pointer" onClick={onAddPlace}></button>
            </section>

            <ul className="cards">
                {
                    cards.map(card => {
                        return (
                            <li className="cards__list-item" key={card._id}>
                                <Card {...card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                            </li>
                        );
                    })
                }
            </ul >
        </main >
    );
}

export default Main;
