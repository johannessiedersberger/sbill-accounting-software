import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatter } from "../../utils/Formatter";
import UIkit from "uikit";

interface CustomerItemProps {
    customerNumber: number,
    name: string,
    address: string,
    phone: string,
    email: string
}

const CustomerItem = (props: CustomerItemProps) => {

    const openCustomerItem = () => {

    }

    return (
        <tr onClick={openCustomerItem}>
            <td>{props.customerNumber}</td>
            <td>{props.name}</td>
            <td>{props.address}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td>{<span uk-icon="pencil"></span>}</td>
            <td>{<span uk-icon="trash"></span>}</td>

        </tr>
    );

}

export default CustomerItem;

