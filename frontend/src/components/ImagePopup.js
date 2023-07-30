import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup(props) {

    const { isOpen, card, onClose } = props;

    const classNames = `popup ${isOpen ? 'popup_opened' : ''}`;
    const imgCaption = card ? card.name : '';
    const imgLink = card ? card.link : '';
    const imgAlt = `фотография ${imgCaption}`;

    usePopupClose(isOpen, onClose);

    return (

        <div className={classNames} id="popup-full-image">
            <section className="fullimage">
                <button
                    type="reset"
                    aria-label="Закрыть окно"
                    className="button-close cursor-pointer"
                    onClick={onClose}
                >
                </button>
                <figure className="fullimage__figure">
                    <img className="fullimage__image" src={imgLink} alt={imgAlt} />
                    <figcaption className="fullimage__caption">{imgCaption}</figcaption>
                </figure>
            </section>
        </div>

    );
}

export default ImagePopup;
