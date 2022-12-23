import React, { useState, ChangeEvent } from 'react';
import Footer from '../frontpages/Footer';
import logo from '../../images/invoice.svg';
import HeaderFrontPage from '../frontpages/HeaderFrontPage';

const PasswordResetPage = () => {

    //const userId = props.match.params.userId;
    //const token = props.match.params.token;

    const [newPassword1, setnewPassword1] = useState("");
    const [newPassword2, setnewPassword2] = useState("");


    const handleNewPassword1Change = (event: ChangeEvent<HTMLInputElement>) => {
        setnewPassword1(event.target.value);
    }

    const handleNewPassword2Change = (event: ChangeEvent<HTMLInputElement>) => {
        setnewPassword2(event.target.value);
    }

    const resetPassword = () => {

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
                                    <h3 className="uk-card-title uk-text-center">Reset Password</h3>
                                    <form>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" type="password" placeholder="New Password" value={newPassword1} onChange={handleNewPassword1Change} />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <div className="uk-inline uk-width-1-1">
                                                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                                                <input className="uk-input uk-form-large" type="password" placeholder="Repeat new Password" value={newPassword2} onChange={handleNewPassword2Change} />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                            <a className="uk-button uk-button-primary uk-button-large uk-width-1-1" onClick={resetPassword}>Change Password</a>
                                        </div>
                                        <div className="uk-text-small uk-text-center">
                                            Already Registered? <a href="/login" style={{ color: "#1e87f0" }}>Login</a>
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

export default PasswordResetPage;