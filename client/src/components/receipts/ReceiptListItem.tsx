import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatter } from "../../utils/Formatter";

interface ReceiptProps {
    receipt: {
        receiptNumber: number,
        supplier: string,
        description: string,
        category: string,
        invoiceAmount: number
    }
}

const ReceiptListItem = (props: ReceiptProps) => {

    const openInvoiceItem = () => {
        window.location.href = `/receipt/${props.receipt.receiptNumber}`;
    }


    return (

        <tr onClick={openInvoiceItem} style={{ cursor: "pointer" }}>
            <td>{props.receipt.receiptNumber}</td>
            <td>{props.receipt.supplier}</td>
            <td>{formatter.format(Number(props.receipt.invoiceAmount))}</td>
        </tr>

    );

}

export default ReceiptListItem;

