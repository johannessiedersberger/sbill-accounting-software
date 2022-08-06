import React from "react";
import { useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit-core.min.js';
import logo from '../images/invoice.svg';
const FrontPage = (props) => {


    return (
        <div>
            <nav class="uk-navbar-container uk-margin" uk-navbar="mode: click">
                <div class="uk-navbar-left">
                    <a class="uk-navbar-item uk-logo uk-margin-left" href="#">SBill</a>

                    <ul class="uk-navbar-nav">
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                    </ul>
                    <ul class="uk-navbar-nav uk-position-right uk-margin-right">
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Sign Up</a></li>
                    </ul>

                </div>
            </nav>

            <h2 style={{ textAlign: "center" }}>Simple Accounting Software for <br />Freelancers and Small Businesses</h2>

            <img src={logo} style={{ height: 300, margin: "auto", display: "block" }} />
        </div>

    )
}

export default FrontPage;