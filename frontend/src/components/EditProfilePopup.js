import React, { useContext, useEffect } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from '../contexts/AppContext'
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditProfilePopup(props) {

    const { isOpen, onClose, onUpdateUser } = props;

    const inputName = 'name'; // Имя инпута с именем пользователя
    const inputAbout = 'about'; // Имя инпута с описанием о пользователе

    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения
    const currentUser = useContext(CurrentUserContext); // Текущий пользователь в глобальном контексте

    // Используем хук формы с валидацией
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    /* После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    Нужно еще следить за isOpen (за состоянием открытости), чтобы вставлять в инпуты данные пользователя, 
    иначе, если мы удалим информацию из инпутов и просто закроем попап, 
    то при следующем открытии инпуты будут пустые (без данных пользователя) */
    useEffect(() => {
        resetForm({ [inputName]: currentUser.name, [inputAbout]: currentUser.about });
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser(values);
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='form-edit-profile'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <div>
                <div className="form__input-section">
                    <input
                        type="text" placeholder="Имя"
                        name={inputName} id="profile-name-id"
                        value={values[inputName] || ''} onChange={handleChange}
                        required minLength="2" maxLength="40"
                        className={`form__input ${errors[inputName] && 'form__input_invalid'}`}
                    />
                    <span className={`form__error ${errors[inputName] && 'form__error_active'}`}>
                        {errors[inputName]}
                    </span>
                </div>
                <div className="form__input-section">
                    <input
                        type="text" placeholder="О себе"
                        name={inputAbout} id="profile-about-id"
                        value={values[inputAbout] || ''} onChange={handleChange}
                        required minLength="2" maxLength="200"
                        className={`form__input ${errors[inputAbout] && 'form__input_invalid'}`}
                    />
                    <span className={`form__error ${errors[inputAbout] && 'form__error_active'}`}>
                        {errors[inputAbout]}
                    </span>
                </div>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;