import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext'
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup(props) {

    const { isOpen, onClose, onConfirm, onConfirmParam } = props;
    const { isLoading } = useContext(AppContext); // Глобальный контекст приложения

    function handleSubmit(e) {
        e.preventDefault();
        if (onConfirm) {
            onConfirm(onConfirmParam);
        }
    }

    return (
        <PopupWithForm
            title=''
            name='form-edit-confirmation'
            buttonText={isLoading ? 'Выполнение...' : 'Да'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <p className="form__text">Вы уверены?</p>
        </PopupWithForm>
    );
}

export default ConfirmationPopup;