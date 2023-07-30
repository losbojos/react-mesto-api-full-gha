import React from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';

function AuthForm({ handleAuth, titleText, buttonSubmitText, children }) {

    const inputEmail = 'email'; // Имя инпута с email
    const inputPwd = 'password'; // Имя инпута с паролем


    const handleSubmit = (e) => {
        e.preventDefault();
        handleAuth(values);
    }

    const { values, handleChange, errors, isValid } = useFormAndValidation();

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">{titleText}</h1>
            <div className="login__inputs">

                <input id="email" required name={inputEmail} type="email"
                    placeholder='Email'
                    value={values[inputEmail] || ''} onChange={handleChange}
                    className={`login__input ${errors[inputEmail] && 'login__input_invalid'}`}
                />
                <span className={`form__error ${errors[inputEmail] && 'form__error_active'}`}>
                    {errors[inputEmail]}
                </span>

                <input id="password" required minLength="8" name={inputPwd} type="password"
                    placeholder='Пароль' autoComplete='off'
                    value={values[inputPwd] || ''} onChange={handleChange}
                    className={`login__input ${errors[inputPwd] && 'login__input_invalid'}`}
                />
                <span className={`form__error ${errors[inputPwd] && 'form__error_active'}`}>
                    {errors[inputPwd]}
                </span>

            </div>
            <button
                type="submit"
                className={`login__submit cursor-pointer ${!isValid && 'login__submit_disabled'}`}
            >
                {buttonSubmitText}
            </button>
            {children}
        </form>

    );
}

export default AuthForm;