import React from "react";
import HeaderFrontPage from "./HeaderFrontPage";
import Footer from "./Footer";
import logo from "../images/invoice.svg";

const SignUpPage = () => {
    const [firstName, SetFirstName] = React.useState("");
    const [lastName, SetLastName] = React.useState("");
    const [email, SetEmail] = React.useState("");
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [acceptDataProctection, SetAcceptDataProctection] = React.useState(false);

    const handleFirstNameChange = (event) => {
        SetFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        SetLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        SetEmail(event.target.value);
    }

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    }

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    }

    const handleAcceptDataProctectionChange = (event) => {

    }

    const createAccount = () => {

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
                                    <h3 className="uk-card-title uk-text-center">Sign Up for SBill</h3>
                                    <form>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: user"></span>
                                                <input className="uk-input uk-form-large" value={firstName} onChange={handleFirstNameChange} type="text" placeholder="Vorname" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: users"></span>
                                                <input className="uk-input uk-form-large" value={lastName} onChange={handleLastNameChange} type="text" placeholder="Nachname" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                                <input className="uk-input uk-form-large" value={email} onChange={handleEmailChange} type="text" placeholder="E-Mail Adresse" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" value={password1} onChange={handlePassword1Change} type="password" placeholder="Passwort" />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" value={password2} onChange={handlePassword2Change} type="password" placeholder="Passwort wiederhohlen" />
                                            </div>
                                        </div>

                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <label><input class="uk-checkbox" type="checkbox" value={acceptDataProctection} onChange={handleAcceptDataProctectionChange} /> Ich habe die Hinweise zum <a target="_blank" href="https://johannessiedersberger.com/datenschutz/">Datenschutz</a> gelesen und akzeptiere sie.*</label>
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <a className="uk-button uk-button-primary uk-button-large uk-width-1-1" style={{ background: "#1e87f0" }} onClick={createAccount}>Account Erstellen</a>
                                        </div>
                                        <div className="uk-text-small uk-text-center">
                                            Bereits registriert? <a href="/login" style={{ color: "#1e87f0" }}>Login</a>
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