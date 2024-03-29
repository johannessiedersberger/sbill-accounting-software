import React, { useState, ChangeEvent } from "react";
import { useNavigate, Link } from 'react-router-dom';
import HeaderFrontPage from "../frontpages/HeaderFrontPage";
import Footer from "../frontpages/Footer";
import logo from "../../images/invoice.svg";
import * as api from '../../api';
import UIkit from "uikit";

const SignUpPage = () => {
    const [firstName, SetFirstName] = useState("");
    const [lastName, SetLastName] = useState("");
    const [email, SetEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [acceptDataProctection, SetAcceptDataProctection] = useState(false);

    const navigate = useNavigate();

    const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        SetFirstName(event.target.value);
    }

    const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        SetLastName(event.target.value);
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        SetEmail(event.target.value);
    }

    const handlePassword1Change = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword1(event.target.value);
    }

    const handlePassword2Change = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword2(event.target.value);
    }

    const handleAcceptDataProctectionChange = (event: ChangeEvent<HTMLInputElement>) => {
        SetAcceptDataProctection(event.target.checked);
    }

    const createAccount = async () => {
        const signUpData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password1: password1,
            password2: password2,
            acceptDataProctection: acceptDataProctection
        }

        try {
            await api.signUp(signUpData);
        } catch (err) {
            UIkit.notification({
                message: 'Error during SignUp: ' + err,
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }

    }

    return (
        <div>
            <HeaderFrontPage />
            <div className="uk-flex uk-flex-middle uk-animation-fade" uk-height-viewport>
                <div className="uk-width-1-1">
                    <div className="uk-container">
                        <div className="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
                            <div className="uk-width-1-1@m">
                                <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                                    <img src={logo} width={100} className="uk-align-center" />
                                    <h3 className="uk-card-title uk-text-center">Create an Account</h3>
                                    <form>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                                <input className="uk-input uk-form-large" value={firstName} onChange={handleFirstNameChange} type="text" placeholder="Firstname" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: users"></span>
                                                <input className="uk-input uk-form-large" value={lastName} onChange={handleLastNameChange} type="text" placeholder="Lastname" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                                <input className="uk-input uk-form-large" value={email} onChange={handleEmailChange} type="text" placeholder="E-Mail Adress" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" value={password1} onChange={handlePassword1Change} type="password" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" value={password2} onChange={handlePassword2Change} type="password" placeholder="Passwort repeaded" />
                                            </div>
                                        </div>

                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <label><input className="uk-checkbox" type="checkbox" checked={acceptDataProctection} onChange={handleAcceptDataProctectionChange} /> I've read the <a target="_blank" href="https://johannessiedersberger.com/datenschutz/">Data Protection</a> and accepted it.*</label>
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <a className="uk-button uk-button-primary uk-button-large uk-width-1-1" onClick={createAccount}>Create Account</a>
                                        </div>
                                        <div className="uk-text-small uk-text-center">
                                            Already registered? <a href="/login" style={{ color: "#1e87f0" }}>Login</a>
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

export default SignUpPage;