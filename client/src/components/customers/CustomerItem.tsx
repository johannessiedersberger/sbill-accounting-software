import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatter } from "../../utils/Formatter";

interface CustomerItemProps {
    name: string,
    address: string,
    phone: string,
    email: string
}

const CustomerItem = (props: CustomerItemProps) => {

    const openCustomerItem = () => {
        //window.location.href = `/invoice/${props.invoice.invoiceNumber}`;
    }


    return (
        <tr onClick={openCustomerItem} style={{ cursor: "pointer" }}>
            <td>{props.name}</td>
            <td>{props.address}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
        </tr>
    );

}

export default CustomerItem;

