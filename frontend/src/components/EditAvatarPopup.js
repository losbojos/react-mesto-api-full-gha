import React, { useRef, useContext, useEffect } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { AppContext } from '../contexts/AppContext'
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup(props) {

    const { isOpen, onClose, onUpdateAvatar } = props;

    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения
    const currentUser = useContext(CurrentUserContext); // Текущий пользователь в глобальном контексте
    // const inputRef = useRef(); // записываем объект, возвращаемый хуком, в переменную    
    const inputAvatar = 'profile-avatar'; // Имя инпута со ссылкой на изображение аватара

    /*
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        inputRef.current.value = currentUser.avatar;
    }, [currentUser, isOpen]); 
    // Нужно еще следить за isOpen (за состоянием открытости), 
    // чтобы вставлять в инпуты данные пользователя, иначе, 
    // если мы удалим информацию из инпутов и просто закроем попап, 
    // то при следующем открытии инпуты будут пустые (без данных пользователя)
    */

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
    React.useEffect(() => {
        resetForm({ [inputAvatar]: currentUser.avatar });
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            // avatar: inputRef.current.value,
            avatar: values[inputAvatar]
        });
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='form-edit-avatar'
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <div className="form__input-section">
                <input
                    type="url" placeholder="Ссылка на картинку"
                    name={inputAvatar} id="profile-avatar-id"
                    // ref={inputRef} 
                    value={values[inputAvatar] || ""} onChange={handleChange}
                    required
                    className={`form__input ${errors[inputAvatar] && 'form__input_invalid'}`}
                />
                <span className={`form__error ${!isValid && 'form__error_active'}`} id="profile-avatar-id-error">
                    {errors[inputAvatar]}
                </span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;