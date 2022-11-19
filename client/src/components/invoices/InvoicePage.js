import React, { useState } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "./Autocomplete";
import Position from "./Position";
import { es } from 'date-fns/esm/locale'

const InvoicePage = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const [positions, setPostions] = useState([{ key: 0 }]);
    const [invoiceNumber, setInvoiceNumber] = useState(0);
    const [topic, setTopic] = useState(0);
    const [client, setClient] = useState('');
    const [address, setAddress] = useState('');
    const [nettoSum, setNettoSum] = useState(0);
    const [valueTax, setValueTax] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    const addPosition = () => {
        setPostions([...positions, { key: positions.length, description: "", quantity: 0, princePerItem: 0 }]);
        console.log(positions);
    }


    const onDelete = (index) => {
        console.log("index" + index);
        let pos = [...positions];

        pos.splice(index, 1);
        setPostions(pos);
    }

    const saveInvoice = () => {
        // save stuff api
    }

    const setData = (data) => {
        let pos = [...positions]

        pos[data.index].description = data.description;
        pos[data.index].quantity = data.quantity;
        pos[data.index].princePerItem = data.princePerItem;

        setPostions(pos);
        console.log(pos);
    }

    return (
        <div>
            <HeaderAfterLogin />
            <div class="container-fluid uk-padding">
                <div class="row">
                    <div class="col-1" />
                    <div class="col-10" >
                        <div class="row">
                            <div class="col-2">
                                <button class="uk-button uk-button-danger uk-align-right" >Löschen</button>
                            </div>
                            <div class="col-6" />

                            <div class="col-2">
                                <button class="uk-button uk-align-right" onClick={saveInvoice}>Speichern</button>
                            </div>
                            <div class="col-2">
                                <button class="uk-button uk-button-primary uk-align-right">Download</button>
                            </div>
                        </div>

                    </div>
                    <div class="col-1" />
                </div>
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
                                    <textarea style={{ marginRight: "20px" }} class="uk-textarea col" rows="5" placeholder="Textarea"></textarea>
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
                                            locale={es}
                                            selected={startDate} onChange={(date) => setStartDate(date)}
                                        />
                                    </div>
                                    <div class="col-6">
                                        <p class="">Due Date</p>
                                        <DatePicker
                                            className="uk-input col"
                                            placeholderText="Select a date"
                                            locale={es}
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
                                        {positions.map((value, index) => {
                                            return <Position index={index} onDelete={onDelete} setData={setData} />
                                        })}
                                    </tbody>
                                    <button class="uk-button uk-button-primary" onClick={addPosition}>Add item</button>
                                </table>
                            </div>

                        </div>

                        <div class="row uk-padding">
                            <div class="col-12">
                                <table class="uk-table uk-table-hover uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Gesamtsumme Netto</td>
                                            <td><div style={{ marginTop: "8px" }}>1.000,00€</div></td>
                                        </tr>
                                        <tr>
                                            <td>Umsatzsteuer 19%</td>
                                            <td><div style={{ marginTop: "8px" }}>190,00€</div></td>
                                        </tr>
                                        <tr>
                                            <td><bold>Gesamt 19%</bold></td>
                                            <td><div style={{ marginTop: "8px" }}><bold>1.190,00€</bold></div></td>
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