import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../utils/constants";
import Loading from "../images/loading.svg";
import Logo from "../images/invoice.svg";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const AccountActivatedPage = () => {
    const params = useParams();
    const uniqueString = params.uniqueString;
    const [hasLoaded, setHasLoaded] = useState(false);
    const [successFullActivation, SetSuccessFullActivation] = useState(false);

    useEffect(() => {
        if (hasLoaded === false) {
            activateAccount();
        }
    });

    const activateAccount = () => {
        axios({
            url: `${API_ENDPOINT}/api/users/verify/${uniqueString}`,
            method: 'get'
        }).then((response) => {

            if (response.status === 200) {
                // All went right
                setHasLoaded(true);
                SetSuccessFullActivation(true);
            }
        }).catch((err) => {
            setHasLoaded(true);
            SetSuccessFullActivation(false);
            console.log(err);
        });;
    }


    return (
        <div>
            <div className="uk-section  uk-flex uk-flex-middle uk-animation-fade" data-uk-height-viewport>
                <div className="uk-width-1-1">
                    <div className="uk-container">
                        <div className="uk-grid-margin uk-grid uk-grid-stack" data-uk-grid>
                            <div className="uk-width-1-1@m">
                                <div className="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                                    <img src={Logo} width={100} className="uk-align-center" />
                                    {
                                        hasLoaded === false ? (<img src={Loading} style={{ display: "block", margin: "0 auto" }} />) :
                                            (<div></div>)
                                    }
                                    {
                                        (successFullActivation && hasLoaded) ? (<h3 className="uk-card-title uk-text-center">Du wurdest erfolgreich Registriert</h3>) : (<div></div>)
                                    }
                                    {
                                        (successFullActivation === false && hasLoaded) ? (<h3 className="uk-card-title uk-text-center">Registrieren Fehlgeschlagen</h3>) : (<div></div>)
                                    }
                                    <form>
                                        <div className="uk-text-small uk-text-center">
                                            Account activated? <a href="/login" style={{ color: "#425cbb" }}>Login</a>
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

export default AccountActivatedPage;