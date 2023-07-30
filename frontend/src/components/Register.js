import React from 'react';
import AuthForm from './AuthForm';
import { PAGES } from '../utils/Consts';

function Register({ handleRegister }) {

    return (
        <AuthForm
            handleAuth={handleRegister}
            titleText='Регистрация'
            buttonSubmitText='Зарегистрироваться'
        >
            <p className="login__text">Уже зарегистрированы? <a href={PAGES.LOGIN} className="login__text login__text_link cursor-pointer">Войти</a></p>
        </AuthForm>
    );
}

export default Register;