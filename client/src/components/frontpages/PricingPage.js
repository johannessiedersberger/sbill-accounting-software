import React from "react";
import { useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit-core.min.js';
import invoicePrint from '../../images/invoice.svg';
import invoice from '../../images/invoice_payment.svg';
import Footer from "./Footer";
import Finance from '../../images/finance.svg';
import HeaderFrontPage from "./HeaderFrontPage";
import Cancel from "../../images/cancel.svg";

const PricingPage = (props) => {


    return (
        <div>
            <HeaderFrontPage />

            <div className="container" style={{ margin: "auto", display: "block", marginTop: "60px", textAlign: "center" }}>
                <h2>Pricing</h2>
                <p>
                    Choose a price
                </p>
            </div>

            <div className="container" style={{ margin: "auto", display: "block", marginTop: "60px", textAlign: "center" }}>
                <div className="row">
                    <div className="col-md-4">
                        <div class="uk-card uk-card-default uk-card-body">
                            <h3 class="uk-card-title">Freelancer</h3>
                            <hr />
                            <div class="uk-card-body">
                                <span class="uk-h2">1$/mo</span>
                                <p class="uk-margin-top">
                                    Create Invoices<br />
                                    Send Invoices to Clients<br />
                                    Create Quotes
                                </p>
                                <button class="uk-button uk-button-default uk-width-expand">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div class="uk-card uk-card-default uk-card-body">
                            <h3 class="uk-card-title">Small Business</h3>
                            <hr />
                            <div class="uk-card-body">
                                <span class="uk-h2">10$/mo</span>
                                <p class="uk-margin-top">
                                    Create Reports<br />
                                    24/7 Support<br />
                                    Tax Consultation Included
                                </p>
                                <button class="uk-button uk-button-primary uk-width-expand">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div class="uk-card uk-card-default uk-card-body">
                            <h3 class="uk-card-title">Enterprise</h3>
                            <hr />
                            <div class="uk-card-body">
                                <span class="uk-h2">99$/mo</span>
                                <p class="uk-margin-top">
                                    Medium priority<br />Offline access<br />Modify assets
                                </p>
                                <button class="uk-button uk-button-default uk-width-expand">Contact Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >



            <Footer />

        </div >

    )
}

export default PricingPage;