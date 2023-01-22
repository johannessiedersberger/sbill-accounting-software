import React, { useEffect, useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as api from '../../api';
import { Buffer } from 'buffer';

const ReceiptsList = (props: any) => {


    return (
        <div>
            <HeaderAfterLogin />
            <div className="container-fluid uk-padding">
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <div className="row">
                            <div className="col-9" />
                            <div className="col-3">
                                <button className="uk-button uk-button-primary uk-align-right" >Ausgabe Erfassen</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-1" />
                </div>
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <h2 style={{ textAlign: "center" }}>Belege</h2>
                    </div>
                    <div className="col-1" />
                </div>
            </div>
        </div>
    );

}

export default ReceiptsList;

