import React from 'react';
import AuthForm from './AuthForm';

function Login({ handleLogin }) {

    return (
        <AuthForm
            handleAuth={handleLogin}
            titleText='Вход'
            buttonSubmitText='Войти'
        />
    );
}

export default Login;