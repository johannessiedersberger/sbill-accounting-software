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

const FeaturesPage = (props) => {


    return (
        <div>
            <HeaderFrontPage />

            <div className="container" style={{ margin: "auto", display: "block", marginTop: "60px", textAlign: "center" }}>
                <h2>Features</h2>
                <p>
                    Reason why SBill is a good choice
                </p>
            </div>

            <div className="container" style={{ margin: "auto", display: "block", marginTop: "60px", textAlign: "center" }}>
                <div className="row">
                    <div className="col-md-4">
                        <img src={invoice} style={{ height: 200, margin: "auto", display: "block" }} />
                        <h2>Digitize receipts</h2>
                        <p>
                            You can create invoices and estimates with the SBill accounting program easily and intuitively.
                            You can print out your invoice with
                            just one click, send it via e-mail or directly forward it through an interface to the Post.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <img src={invoicePrint} style={{ height: 200, margin: "auto", display: "block" }} />
                        <h2>Create Invoices</h2>
                        <p>
                            Creating professional estimates & invoices is finally easy. All mandatory data is stored automatically. This way your invoices are always legally secure.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <img src={Cancel} style={{ height: 200, margin: "auto", display: "block" }} />
                        <h2>Cancellation of invoices</h2>
                        <p>
                            Cancel an invoice? No problem. Simply create a cancellation invoice or a credit note from an invoice.
                        </p>
                    </div>
                </div>
            </div >



            <Footer />
        </div>

    )
}

export default FeaturesPage;