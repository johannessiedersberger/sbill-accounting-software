import React, { useEffect, useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import * as api from '../../api';
import CustomerItem from "./CustomerItem";
import UIkit from "uikit";
import NewCustomerModal from "./NewCustomerModal";

interface CustomerItemProps {
    customerNumber: number,
    name: string,
    address: string,
    phone: string,
    email: string
}

const CustomerList = () => {

    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        getAllCustomers()
    });

    const getAllCustomers = () => {
        api.getAllCustomers().then((res) => {
            setCustomerList(res.data);
        });
    }

    const newCustomer = async () => {
        UIkit.modal('#modalNewCustomer').show();
    }

    return (
        <div>
            <HeaderAfterLogin />

            <NewCustomerModal id={'modalNewCustomer'} />


            <div className="container-fluid uk-padding">
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <div className="row">
                            <div className="col-9" />
                            <div className="col-3">
                                <button id="new-customer-button" className="uk-button uk-button-primary uk-align-right" onClick={newCustomer}>Neuer Kunde</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-1" />
                </div>
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <h2 style={{ textAlign: "center" }}>Kunden</h2>
                        <table className="uk-table uk-table-hover uk-table-divider">
                            <thead>
                                <tr>
                                    <th>Nr. </th>
                                    <th>Name</th>
                                    <th>Addresse</th>
                                    <th>Telefon</th>
                                    <th>Email</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customerList?.map((value: CustomerItemProps, index) => {
                                        return (
                                            <CustomerItem key={index} customerNumber={value.customerNumber} name={value.name} email={value.email} address={value.address} phone={value.phone} />
                                        );
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

export default CustomerList;

