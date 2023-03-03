import React, { useEffect, useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as api from '../../api';
import { Buffer } from 'buffer';
import ReceiptListItem from "./ReceiptListItem";

const ReceiptsList = (props: any) => {

    const [receiptList, setReceiptList] = useState([]);

    useEffect(() => {
        getAllReceipts();
    }, []);

    const getAllReceipts = () => {
        api.getAllReceipts().then((res) => {
            setReceiptList(res.data);
            console.log(res.data);
        });
    }

    const openNewReceiptForm = () => {
        window.location.href = `/receipt/`;
    }


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
                                <button id="button-add-expense" className="uk-button uk-button-primary uk-align-right" onClick={openNewReceiptForm}>Ausgabe Erfassen</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-1" />
                </div>
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <h2 style={{ textAlign: "center" }}>Belege</h2>
                        <table className="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <th>Nr.</th>
                                    <th>Kunde</th>
                                    <th>Betreff</th>
                                    <th>Betrag (Netto)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    receiptList?.map((value, index) => {
                                        return (
                                            <ReceiptListItem key={index} receipt={value} />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1" />
                </div>
            </div>
        </div>
    );

}

export default ReceiptsList;

