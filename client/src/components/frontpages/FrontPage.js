import React from "react";
import { useState } from "react";
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit-core.min.js';
import logo from '../../images/invoice.svg';
import invoice from '../../images/invoice_payment.svg';
import Footer from "./Footer";
import Finance from '../../images/finance.svg';
import HeaderFrontPage from "./HeaderFrontPage";

const FrontPage = (props) => {


    return (
        <div>
            <HeaderFrontPage />

            <div className="container" style={{ margin: "auto", display: "block", marginTop: "60px", textAlign: "center" }}>
                <h2>Simple Accounting Software for <br />Freelancers and Small Businesses</h2>
                <p>
                    Create invoices & estimates and automate your accounting
                </p>
                <img src={logo} style={{ height: 300, margin: "auto", display: "block", marginTop: "30px" }} />
                <button class="uk-button uk-button-primary uk-align-center uk-margin-medium">Get Started</button>
            </div>

            <div className="container" style={{ margin: "auto", display: "block", marginTop: "150px" }}>
                <div className="row">
                    <div className="col-md-2" />
                    <div className="col-md-4">
                        <img src={invoice} style={{ height: 300, margin: "auto", display: "block" }} />
                    </div>
                    <div className="col-md-4">
                        <h2 style={{ textAlign: "" }}>Create professional <br /> invoices</h2>
                        <p>
                            You can create invoices and estimates with the SBill accounting program easily and intuitively.
                            You can print out your invoice with
                            just one click, send it via e-mail or directly forward it through an interface to the Post.
                        </p>
                    </div>
                    <div className="col-md-2" />
                </div>
            </div >

            <div className="container" style={{ margin: "auto", display: "block", marginTop: "150px" }}>
                <div className="row">
                    <div className="col-md-2" />

                    <div className="col-md-4">
                        <h2 style={{ textAlign: "" }}>Simply do your own <br /> accounting</h2>
                        <p>
                            With SBill, you can digitally file your documents easily and clearly.
                            Our accounting software automatically creates a revenue-surplus invoice for you.
                            Even provisional VAT returns can be easily created.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <img src={Finance} style={{ height: 300, margin: "auto", display: "block" }} />
                    </div>

                    <div className="col-md-2" />
                </div>
            </div >


            <Footer />
        </div>

    )
}

export default FrontPage;