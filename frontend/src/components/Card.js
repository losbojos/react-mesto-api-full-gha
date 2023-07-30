import React, { useContext } from 'react';
import imageErrorHandler from '../utils/ImageErrorHandler'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function checkLiked(card, currentUserId) {
    return card.likes.some((like) => {
        return (like._id === currentUserId);
    });
}

function Card(props) {

    const currentUser = useContext(CurrentUserContext); // Текущий пользователь в глобальном контексте
    const caption = props.name; // Заголовок изображения
    const imageLink = props.link; // Ссылка на изображение
    const isLiked = checkLiked(props, currentUser._id); // Лайкнута мною?
    const isOwnCard = (currentUser._id === props.owner._id); // Это моя карточка?
    const likesNumber = props.likes.length; // Количество лайков

    const buttonLikeClasses = `cards__like cursor-pointer ${isLiked && "cards__like_liked"}`;
    const altValue = `фотография ${caption} `;

    // Обработчик клика изображения
    function handleCardClick() {
        props.onCardClick(props);
    }

    // Обработчика клика лайка
    function handleLikeClick() {
        props.onCardLike(props);
    }

    // Обработчика клика кнопки удаления карточки
    function handleDeleteClick() {
        props.onCardDelete(props);
    }

    return (
        <article className="cards__card">
            <img
                src={imageLink}
                alt={altValue}
                className="cards__foto"
                onError={imageErrorHandler}
                onClick={handleCardClick}
            />
            {
                isOwnCard &&
                <button type="button" aria-label="Удалить карточку"
                    className="cards__delete cursor-pointer" onClick={handleDeleteClick} />
            }
            <div className="cards__caption-container">
                <h2 className="cards__caption overflow-ellipsis">{caption}</h2>
                <div className="cards__like-container">
                    <button
                        type="button"
                        aria-label="Поставить лайк"
                        className={buttonLikeClasses}
                        onClick={handleLikeClick}
                    />
                    <span className="cards__like-number">{likesNumber}</span>
                </div>
            </div>
        </article >
    );
}

export { Card, checkLiked };