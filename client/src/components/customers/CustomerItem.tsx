import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatter } from "../../utils/Formatter";
import UIkit from "uikit";
import EditCustomerModal from "./EditCustomerModal";
import * as api from '../../api';

interface CustomerItemProps {
    customerNumber: number,
    name: string,
    address: string,
    phone: string,
    email: string,
    reloadCustomers: () => any,
}

const CustomerItem = (props: CustomerItemProps) => {

    const openCustomerItem = () => {
        UIkit.modal('#editcustomermodal' + props.customerNumber).show();
    }

    const deleteCustomerItem = async () => {
        try {
            await api.deleteCustomer(props.customerNumber);
            UIkit.notification({
                message: 'Kunde Erfolgreich Gelöscht',
                status: 'success',
                pos: 'top-right',
                timeout: 5000
            });
            props.reloadCustomers();
        } catch (err: any) {
            UIkit.notification({
                message: 'Fehler beim Löschen des Kunden: ' + err.response.data,
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }

    }

    return (
        <tr>
            <td>{props.customerNumber}</td>
            <td>{props.name}</td>
            <td>{props.address}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td><span uk-icon="pencil" onClick={openCustomerItem} style={{ cursor: "pointer" }}></span></td>
            <td>{<span uk-icon="trash" onClick={deleteCustomerItem} style={{ cursor: "pointer" }}></span>}</td>
            {
                <EditCustomerModal id={'editcustomermodal' + props.customerNumber}
                    customerNumber={props.customerNumber}
                    name={props.name}
                    address={props.address}
                    phone={props.phone}
                    email={props.email} />
            }
        </tr>
    );

}

export default CustomerItem;

