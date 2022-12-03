import React, { useEffect, useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "./Autocomplete";
import Position from "./Position";
import * as api from '../../api';

const InvoiceList = (props) => {


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

    const newInvoice = () => {
        window.location.href = "/invoice";
    }

    return (
        <div>
            <HeaderAfterLogin />
            <div class="container-fluid uk-padding">
                <div class="row">
                    <div class="col-1" />
                    <div class="col-10" >
                        <div class="row">
                            <div class="col-9" />

                            <div class="col-3">
                                <button class="uk-button uk-button-primary uk-align-right" onClick={newInvoice}>Neue Rechnung</button>
                            </div>
                        </div>

                    </div>
                    <div class="col-1" />
                </div>
                <div class="row">
                    <div class="col-1" />
                    <div class="col-10" >
                        <h2 style={{ textAlign: "center" }}>Invoices</h2>
                        <table class="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <th>Invoice Nr. </th>
                                    <th>Customer Name / Topic </th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    invoiceList?.map((value, index) => {
                                        return (<tr>
                                            <td>{value.invoiceNumber}</td>
                                            <td>{value.client}</td>
                                            <td>{value.nettoSum}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div class="col-1" />
                </div>
            </div>
        </div>
    );

}

export default InvoiceList;

