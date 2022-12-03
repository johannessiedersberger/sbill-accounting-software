import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "./Autocomplete";
import Position from "./Position";

const InvoiceItem = (props) => {

    const openInvoiceItem = () => {

    }


    return (
        <div>
            <tr onClick={openInvoiceItem}>
                <td>{props.invoiceNumber}</td>
                <td>{props.client}</td>
                <td>{props.nettoSum}</td>
            </tr>
        </div>
    );

}

export default InvoiceItem;

