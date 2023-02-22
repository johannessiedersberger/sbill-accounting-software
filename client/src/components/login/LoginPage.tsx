import React from "react";
import { useState, ChangeEvent } from "react";
import styled from "styled-components";
import Footer from "../frontpages/Footer";
import HeaderFrontPage from "../frontpages/HeaderFrontPage";
import logo from '../../images/invoice.svg';
import UIkit from "uikit";
import * as api from '../../api';
import { useStore } from '../../App';

const LoginPage = () => {
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const user = useStore(state => state.user)
    if (user) {
        window.location.href = "/dashboard"
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        SetEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        SetPassword(event.target.value);
    }

    const addUser = useStore(state => state.setUser);

    const login = async () => {
        const loginData = {
            email: email,
            password: password
        }
        try {
            const response = await api.signIn(loginData);
            const data = response.data;

            addUser(data);

            window.location.href = "/dashboard";
        } catch (err) {
            UIkit.notification({
                message: 'Error during Login: ' + err,
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }

    }

    return (
        <div>
            <HeaderFrontPage />
            <div className="uk-flex  uk-animation-fade" data-uk-height-viewport>
                <div className="uk-width-1-1">
                    <div className="uk-container">
                        <div className="uk-grid-margin uk-grid uk-grid-stack" data-uk-grid>
                            <div className="uk-width-1-1@m">
                                <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                                    <img src={logo} width={100} className="uk-align-center" />
                                    <h3 className="uk-card-title uk-text-center">Sign-In <br />with your Account</h3>
                                    <form>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                                <input className="uk-input uk-form-large" type="text" placeholder="Deine E-Mail Adresse" value={email} onChange={handleEmailChange} id="email-input" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" type="password" placeholder="Dein Passwort" value={password} onChange={handlePasswordChange} id="password-input" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <a className="uk-button uk-button-primary uk-button-large uk-width-1-1" onClick={login} id="login-button">Login</a>
                                        </div>
                                        <div className="uk-text-small uk-text-center">
                                            Not registered? <a href="/signup" style={{ color: "#6c63ff" }}>Create Account</a>
                                        </div>
                                        <div className="uk-text-small uk-text-center">
                                            Forgot Password? <a href="/reset-password-email" style={{ color: "#6c63ff" }}>Reset Password</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default LoginPage;