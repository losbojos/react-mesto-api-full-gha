import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

/*
    props: {
        title: Заголовок
        name: Идентификатор формы
        buttonText: Текст кнопки подтверждения операции (Сохранить, Создать итп)
        isOpen: Открыт ли попап?
        onClose: Обработчик закрытия
        onSubmit: Обработчик принятия формы
        children: вложенное содержимое формы в виде JSX-разметки
        isValid: Состояние валидности формы - приходит извне от валидации формы, чтобы 2 раза не валидировать
    }
*/
function PopupWithForm(props) {

    const { title, name, buttonText, isOpen, onClose, onSubmit, children, isValid = true } = props;

    const classNames = `popup popup_${name} ${isOpen ? 'popup_opened' : ''}`

    usePopupClose(isOpen, onClose);

    // const formRef = React.useRef();
    // const [isValid, setIsValid] = React.useState(false);
    // React.useEffect(() => {
    //     setIsValid(formRef.current.checkValidity());
    // }, [children]);

    return (

        <div className={classNames}>
            <div className="popup__container">
                <button
                    type="reset"
                    aria-label="Закрыть без сохранения изменений"
                    className="button-close cursor-pointer"
                    onClick={onClose}
                >
                </button>
                <h2 className="popup__title">{title}</h2>
                <form name={name} className="form" onSubmit={onSubmit}
                // ref={formRef}
                >
                    {children}
                    <button type="submit"
                        className={`form__button-save cursor-pointer ${!isValid && 'form__button-save_disabled'}`}
                    >
                        {buttonText || "Сохранить"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
