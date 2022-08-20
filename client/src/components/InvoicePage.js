import React, { useState } from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "./Autocomplete";

const InvoicePage = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());

    return (
        <div>
            <HeaderAfterLogin />
            <div class="container-fluid uk-padding">
                <div class="row">
                    <div class="col-1" />
                    <div class="col-10 uk-padding uk-card uk-card-default uk-card-body">
                        <h2 style={{ textAlign: "center" }}>Invoice</h2>
                        <hr class="uk-divider-icon"></hr>
                        <div class="row uk-padding">
                            <div class="col-md-6">
                                <div class="row">
                                    <p style={{ marginLeft: "-10px" }}>Client</p>
                                    <div style={{ marginLeft: "-10px", marginRight: "10px" }}>
                                        <Autocomplete

                                            suggestions={[
                                                "Johannes Siedersberger",
                                                "Thomas Berger",
                                                "Harald Schmidt",
                                                "Peter Meier",
                                                "Karl Meier",
                                                "Markus Lutz",
                                                "Thomas Lutz",
                                                "Markus Meier",
                                                "Xi Ching Ping",
                                                "Vladimir Putin",
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div class="row uk-margin">
                                    <p style={{ marginLeft: "-10px" }}>Address</p>
                                    <textarea style={{ marginLeft: "0px", marginRight: "20px" }} class="uk-textarea col" rows="5" placeholder="Textarea"></textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
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
                                        <DatePicker
                                            className="uk-input col"
                                            placeholderText="Select a date"
                                            locale="es"
                                            selected={startDate} onChange={(date) => setStartDate(date)}
                                        />
                                    </div>
                                    <div class="col-6">
                                        <p class="">Due Date</p>
                                        <DatePicker
                                            className="uk-input col"
                                            placeholderText="Select a date"
                                            locale="es"
                                            selected={dueDate} onChange={(date) => setDueDate(date)}
                                        />
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
                                            <td><input class="uk-input" type="number" placeholder="Quantity" /></td>
                                            <td><input class="uk-input" type="number" min="1" step="any" placeholder="Price per Item" /></td>
                                            <td><div style={{ marginTop: "8px" }}>1.000,00€</div></td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div class="row uk-padding">
                            <div class="col-9" />
                            <div class="col-3">
                                <table class="uk-table uk-table-hover uk-table-divider uk-margin-left">
                                    <thead>
                                        <tr>
                                            <th>Tax</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input class="uk-input" type="number" placeholder="19%" /></td>
                                            <td><div style={{ marginTop: "8px" }}>1.000,00€</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div class="col-1" />
                </div>
            </div>
        </div >


    )
}

export default InvoicePage;