import React, { useState } from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";

const InvoicePage = (props) => {
    return (
        <div>
            <HeaderAfterLogin />
            <div class="container-fluid">


                <div class="row">

                    <div class="col-2" />


                    <div class="col-8 uk-margin-medium uk-card uk-card-default uk-card-body" style={{ paddingLeft: "10px" }}>
                        <h2 style={{ textAlign: "center" }}>Invoice</h2>
                        <hr class="uk-divider-icon"></hr>
                        <div class="row uk-padding">
                            <div class="col-6">

                                <div class="row">
                                    <p style={{ marginLeft: "-10px" }}>Client</p>
                                    <input class="uk-input" type="text" placeholder="Search / Create Customer" />
                                </div>
                                <div class="row ">
                                    <p style={{ marginLeft: "-10px" }}>Address</p>
                                    <textarea class="uk-textarea" rows="5" placeholder="Textarea"></textarea>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row">
                                    <div class="col-6 ">
                                        <p>Topic</p>
                                        <input class="uk-input col" type="text" placeholder="Input" />
                                    </div>
                                    <div class="col-6">
                                        <p>Invoice #</p>
                                        <input class="uk-input col" type="text" placeholder="Input" />
                                    </div>
                                </div>
                                <div class="row uk-margin">
                                    <div class="col-6">
                                        <div class="">

                                        </div>
                                        <p >Creation Date</p>
                                        <input class="uk-input col" type="text" placeholder="Input" />
                                    </div>
                                    <div class="col-6">
                                        <p class="">Due Date</p>
                                        <input class="uk-input col" type="text" placeholder="Input" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row uk-padding">

                            <div class="col-12">
                                <table class="uk-table uk-table-hover uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Price per Item</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input class="uk-input" type="text" placeholder="Description" /></td>
                                            <td><input class="uk-input" type="text" placeholder="Quantity" /></td>
                                            <td><input class="uk-input" type="text" placeholder="Price per Item" /></td>
                                            <td><input class="uk-input" type="text" placeholder="Total Price" /></td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div class="row uk-padding">

                            <div class="col-12">
                                <table class="uk-table uk-table-hover uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Total Price</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1000,00€</td>

                                        </tr>


                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>


                </div>

            </div>



        </div >


    )
}

export default InvoicePage;