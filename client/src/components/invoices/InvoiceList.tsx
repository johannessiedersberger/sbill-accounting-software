import React, { useEffect, useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Position from "./Position";
import InvoiceItem from "./InvoiceItem";
import * as api from '../../api';

const InvoiceList = () => {

    const [invoiceList, setInvoiceList] = useState([]);

    useEffect(() => {
        getAllInvoices()
    }, []);

    const getAllInvoices = () => {
        api.getAllInvoices().then((res) => {
            setInvoiceList(res.data);
            console.log(res.data);
        });
    }

    const newInvoice = async () => {

        try {
            const newNumber = await api.getNewInvoiceNumber();

            await api.postInvoice({
                invoiceNumber: parseInt(newNumber.data.newNumber),
                createdDate: new Date(),
                dueDate: new Date(),
                client: "",
                address: "",
                topic: "",
                invoiceItems: [],
                nettoSum: 0,
                valueTax: 0,
                invoiceAmount: 0,
            });

            window.location.href = `/invoice/${newNumber.data.newNumber}`;
        } catch (error) {
            console.log("eee");
            console.log(error);
        }

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
                                <button className="uk-button uk-button-primary uk-align-right" onClick={newInvoice}>Neue Rechnung</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-1" />
                </div>
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <h2 style={{ textAlign: "center" }}>Rechnungen</h2>
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
                                    invoiceList?.map((value, index) => {
                                        return (
                                            <InvoiceItem key={index} invoice={value} />
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

export default InvoiceList;

