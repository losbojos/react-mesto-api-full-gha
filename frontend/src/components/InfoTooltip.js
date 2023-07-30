import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';


function InfoTooltip(props) {

    const { message, iconLink, isOpen, onClose, afterClose } = props;

    const classNames = `popup ${isOpen ? 'popup_opened' : ''}`;

    const combFunc = () => {
        onClose();
        if (afterClose) {
            afterClose();
        }
    }

    usePopupClose(isOpen, combFunc);

    return (

        <div className={classNames} id="info-tooltip">
            <section className="info-tooltip">
                <button
                    type="reset"
                    aria-label="Закрыть окно"
                    className="button-close cursor-pointer"
                    onClick={combFunc}
                >
                </button>
                <img className="info-tooltip__icon" src={iconLink} alt='Иконка типа сообщения' />
                <p className="info-tooltip__message">{message}</p>
            </section>
        </div>

    );
}

export default InfoTooltip;
