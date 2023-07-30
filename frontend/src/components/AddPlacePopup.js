import React, { useContext } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { AppContext } from '../contexts/AppContext'
import useFormAndValidation from '../hooks/useFormAndValidation';

function AddPlacePopup(props) {

    const { isOpen, onClose, onAddPlace } = props;

    const inputName = 'name'; // Имя инпута с названием новой карточки
    const inputLink = 'link'; // Имя инпута с ссылкой на изображение новой карточки

    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения

    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    React.useEffect(() => {
        resetForm();
    }, [isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace(values);
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='form-add-card'
            buttonText={isLoading ? 'Сохранение...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <div className="form__input-section">
                <input
                    type="text" placeholder="Название"
                    name={inputName} id="image-caption-id"
                    value={values[inputName] || ""} onChange={handleChange}
                    required minLength="2" maxLength="30"
                    className={`form__input ${errors[inputName] && 'form__input_invalid'}`}
                />
                <span className={`form__error ${!isValid && 'form__error_active'}`} id="image-caption-id-error">
                    {errors[inputName]}
                </span>

            </div>
            <div className="form__input-section">
                <input
                    type="url" placeholder="Ссылка на картинку"
                    name={inputLink} id="image-link-id"
                    value={values[inputLink] || ""} onChange={handleChange}
                    required
                    className={`form__input ${errors[inputLink] && 'form__input_invalid'}`}
                />
                <span className={`form__error ${!isValid && 'form__error_active'}`} id="image-link-id-error">
                    {errors[inputLink]}
                </span>
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup;