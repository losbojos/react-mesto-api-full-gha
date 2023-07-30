import React, { Fragment, useContext } from 'react';
import imageHeaderLogo from '../images/logo/header__logo.svg';
import { AuthorizationContext } from '../contexts/AuthorizationContext'
import { useLocation } from 'react-router-dom'
import { PAGES } from '../utils/Consts'

function Header({ handleLogout }) {

    const locationPath = useLocation().pathname;
    const authorizationContext = useContext(AuthorizationContext);

    const isLogged = authorizationContext.loggedIn;
    const isLoginPage = !isLogged && (locationPath === PAGES.LOGIN);
    const isRegisterPage = !isLogged && (locationPath === PAGES.REGISTER);

    return (
        <header className="header">
            <img className="header__logo" src={imageHeaderLogo} alt="Логотоп" />
            <nav className="header__nav">
                {isLogged &&
                    (
                        <Fragment>
                            <p className="header__info">{authorizationContext.email}</p>
                            <a href='#' onClick={handleLogout} className="header__button cursor-pointer">Выйти</a>
                        </Fragment>
                    )
                }
                {isLoginPage &&
                    (
                        <a href={PAGES.REGISTER} className="header__button cursor-pointer">Регистрация</a>
                    )
                }
                {isRegisterPage &&
                    (
                        <a href={PAGES.LOGIN} className="header__button cursor-pointer">Войти</a>
                    )
                }
            </nav>
        </header>
    );
}

export default Header;

