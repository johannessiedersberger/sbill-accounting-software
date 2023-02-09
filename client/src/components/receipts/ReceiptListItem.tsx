import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatter } from "../../utils/Formatter";

interface ReceiptProps {
    receipt: {
        receiptNumber: string,
        uuid: string,
        supplier: string,
        description: string,
        category: string,
        receiptAmount: number,
        fileName: string,
    }
}

const ReceiptListItem = (props: ReceiptProps) => {

    const openInvoiceItem = () => {
        window.location.href = `/receipt/${props.receipt.uuid}`;
    }


    return (

        <tr onClick={openInvoiceItem} style={{ cursor: "pointer" }}>
            <td>{props.receipt.receiptNumber}</td>
            <td>{props.receipt.supplier}</td>
            <td>{props.receipt.description}</td>
            <td>{formatter.format(Number(props.receipt.receiptAmount))}</td>
        </tr>

    );

}

export default ReceiptListItem;

