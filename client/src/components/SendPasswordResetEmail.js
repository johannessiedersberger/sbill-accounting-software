import React from "react";
import Footer from './Footer';
import HeaderFrontPage from "./HeaderFrontPage";
import logo from '../images/invoice.svg';

const SendPasswordResetEmail = (props) => {
    const [email, SetEmail] = React.useState("");


    const handleEmailChange = (event) => {
        SetEmail(event.target.value);
    }

    const sendPwResetEmail = () => {

    }


    return (
        <div>
            <HeaderFrontPage />
            <div className="uk-flex uk-animation-fade" data-uk-height-viewport>
                <div className="uk-width-1-1">
                    <div className="uk-container">
                        <div className="uk-grid-margin uk-grid uk-grid-stack" data-uk-grid>
                            <div className="uk-width-1-1@m">
                                <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                                    <img src={logo} width={100} className="uk-align-center" />
                                    <h3 className="uk-card-title uk-text-center">Type in your E-Mail Address here and receive an E-Mail to reset your password</h3>
                                    <form>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: mail"></span>
                                                <input className="uk-input uk-form-large" type="text" placeholder="email" value={email} onChange={handleEmailChange} />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <a className="uk-button uk-button-primary uk-button-large uk-width-1-1" style={{ background: "#1e87f0" }} onClick={sendPwResetEmail} >Send Email</a>
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

export default SendPasswordResetEmail;