import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "./Autocomplete";
import Position from "./Position";
import { formatter } from "../../utils/Formatter";

const InvoiceItem = (props) => {

    const openInvoiceItem = () => {
        window.location.href = `/invoice/${props.invoice.invoiceNumber}`;
    }


    return (

        <tr onClick={openInvoiceItem} style={{ cursor: "pointer" }}>
            <td>{props.invoice.invoiceNumber}</td>
            <td>{props.invoice.client}</td>
            <td>{props.invoice.topic}</td>
            <td>{formatter.format(props.invoice.nettoSum)}</td>
        </tr>

    );

}

export default InvoiceItem;

