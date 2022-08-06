import React from "react";
import { useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit-core.min.js';
import logo from '../images/invoice.svg';
import Footer from "./Footer";
import HeaderFrontPage from "./HeaderFrontPage";


const FrontPage = (props) => {


    return (
        <div>
            <HeaderFrontPage />

            <h2 style={{ textAlign: "center" }}>Simple Accounting Software for <br />Freelancers and Small Businesses</h2>

            <img src={logo} style={{ height: 300, margin: "auto", display: "block" }} />
            <button class="uk-button uk-button-primary uk-align-center uk-margin-medium">Get Started
            </button>
            <Footer />
        </div>

    )
}

export default FrontPage;