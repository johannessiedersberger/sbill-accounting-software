import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import HeaderFrontPage from "./HeaderFrontPage";
import logo from '../images/invoice.svg';

const LoginPage = () => {
    const [email, SetEmail] = React.useState("");
    const [password, SetPassword] = React.useState("");


    const handleEmailChange = (event) => {
        SetEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        SetPassword(event.target.value);
    }

    const login = () => {

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
                                                <input className="uk-input uk-form-large" type="text" placeholder="Deine E-Mail Adresse" value={email} onChange={handleEmailChange} />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" type="password" placeholder="Dein Passwort" value={password} onChange={handlePasswordChange} />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <a className="uk-button uk-button-primary uk-button-large uk-width-1-1" onClick={login}>Login</a>
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