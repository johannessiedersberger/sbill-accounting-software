import React from 'react';
import Logo from '../images/invoice.svg';
import Footer from './Footer';
import HeaderFrontPage from './HeaderFrontPage';


const CheckEmailPage = (props) => {

    return (
        <div>
            <HeaderFrontPage />
            <div className="uk-section  uk-flex uk-flex-middle uk-animation-fade" data-uk-height-viewport>
                <div className="uk-width-1-1">
                    <div className="uk-container">
                        <div className="uk-grid-margin uk-grid uk-grid-stack" data-uk-grid>
                            <div className="uk-width-1-1@m">
                                <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                                    <img src={Logo} width={100} className="uk-align-center" />
                                    <h3 className="uk-card-title uk-text-center">Check your E-Mail</h3>
                                    <form>
                                        <div className="uk-text-small uk-text-center">
                                            Login? <a href="/login" style={{ color: "#425cbb" }}>Login</a>
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
    );
}

export default CheckEmailPage;