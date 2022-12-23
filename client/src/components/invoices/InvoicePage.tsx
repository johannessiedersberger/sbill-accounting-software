import React, { useEffect, useRef, useState, createRef } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "./Autocomplete";
import Position from "./Position";
import { de } from 'date-fns/esm/locale'
import { postInvoice } from "../../api";
import * as api from '../../api';
import { useParams } from "react-router-dom";
import UIkit from "uikit";
import { formatter } from "../../utils/Formatter";

interface PositionProps {
    key: number,
    description: string,
    princePerItem: number,
    quantity: number
}

export interface PositionData {
    description: string,
    quantity: number,
    princePerItem: number,
    index: number
}

interface AutoCompleteProps {
    setClient: (client: String) => void
}

const InvoicePage = () => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [positions, setPostions] = useState<PositionProps[]>([{ key: 0, description: "", princePerItem: 0, quantity: 0 }]);
    const [invoiceNumber, setInvoiceNumber] = useState(0);
    const [topic, setTopic] = useState('');
    const [client, setClient] = useState<String>('');
    const [address, setAddress] = useState('');

    const [textField, setTextField] = useState('');

    const [nettoSum, setNettoSum] = useState(0);
    const [valueTax, setValueTax] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    let { id } = useParams();

    const childRefAutocomplete = useRef<Autocomplete>(null);

    const referencesPositions = useRef([]);
    referencesPositions.current = [];

    useEffect(() => {
        loadInvoice();
    }, []);

    const loadInvoice = () => {

        api.getInvoiceByInvoiceNumber(Number(id)).then((resp) => {

            console.log(resp.data);
            setInvoiceNumber(resp.data[0].invoiceNumber);
            setTopic(resp.data[0].topic);
            setAddress(resp.data[0].address);
            setNettoSum(resp.data[0].nettoSum);
            setValueTax(resp.data[0].valueTax);
            setTotalValue(resp.data[0].invoiceAmount);
            setStartDate(new Date(resp.data[0].createdDate));
            setDueDate(new Date(resp.data[0].dueDate));
            onUpdateClientToAutocomplete(resp.data[0].client);
            onUpdatePositionsToAutocomplete(resp.data[0].invoiceItems);
            setTextField(resp.data[0].note);

        });


    }

    const addPosition = () => {
        setPostions([...positions, { key: positions.length, description: "", quantity: 0, princePerItem: 0 }]);
        console.log(positions);
    }


    const onDelete = (index: number) => {
        console.log("index" + index);
        let pos: PositionProps[] = [...positions];

        pos.splice(index, 1);
        setPostions(pos);
    }

    const onUpdateClientFromAutocomplete = (client: String) => {
        setClient(client);
    }

    const onUpdateClientToAutocomplete = (client: string) => {
        childRefAutocomplete?.current?.setClient(client);

    }

    const onUpdatePositionsToAutocomplete = (position: PositionProps[]) => {
        setPostions(position);
    }


    const updateInvoice = async () => {
        try {
            await api.updateInvoice(invoiceNumber, {
                invoiceNumber: invoiceNumber,
                createdDate: startDate,
                dueDate: dueDate,
                client: client,
                address: address,
                topic: topic,
                invoiceItems: positions,
                note: textField,
                nettoSum: nettoSum,
                valueTax: valueTax,
                invoiceAmount: totalValue,
            });

            UIkit.notification({
                message: 'Invoice Update Erfolgreich',
                status: 'success',
                pos: 'top-right',
                timeout: 5000
            });
        } catch (error) {
            UIkit.notification({
                message: 'Fehler beim Speichern der Rechnung',
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }

    }



    const setData = (data: PositionData) => {
        let pos = [...positions]

        pos[data.index].description = data.description;
        pos[data.index].quantity = data.quantity;
        pos[data.index].princePerItem = data.princePerItem;

        setPostions(pos);
        console.log(pos);

        // Recalulate
        let nettoSumCurrent = 0;
        for (var i = 0; i < pos.length; i++) {
            nettoSumCurrent += pos[i].quantity * pos[i].princePerItem;
        }
        const valueTaxLocal = (nettoSumCurrent) * 0.19;
        setNettoSum(nettoSumCurrent);
        setValueTax(valueTaxLocal);
        setTotalValue(nettoSumCurrent + valueTaxLocal);
    }

    const getPDF = async () => {
        await api.getPDFInvoice(invoiceNumber);
    }

    return (
        <div>
            <HeaderAfterLogin />
            <div className="container-fluid uk-padding">
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <div className="row">
                            <div className="col-4">
                                <button className="uk-button uk-button-danger uk-align-center" >Löschen</button>
                            </div>
                            <div className="col-4">
                                <button className="uk-button uk-button-primary uk-align-center" onClick={getPDF}>Download</button>
                            </div>
                            <div className="col-4">
                                <button className="uk-button uk-align-center" onClick={updateInvoice}>Speichern</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-1" />
                </div>
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10 uk-padding uk-card uk-card-default uk-card-body">
                        <h2 style={{ textAlign: "center" }}>Rechnung</h2>
                        <hr className="uk-divider-icon"></hr>
                        <div className="row uk-padding">
                            <div className="col-md-6">
                                <div className="row">
                                    <p style={{ marginLeft: "-10px" }}>Kunde</p>
                                    <div style={{ marginLeft: "-10px", marginRight: "10px" }}>
                                        <Autocomplete
                                            onUpdateClient={onUpdateClientFromAutocomplete}
                                            ref={childRefAutocomplete}

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
                                <div className="row uk-margin">
                                    <p style={{ marginLeft: "-10px" }}>Addresse</p>
                                    <textarea style={{ marginRight: "20px" }} value={address} onChange={(e) => setAddress(e.target.value)} className="uk-textarea col" rows={5} placeholder="Textarea"  ></textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-6">
                                        <p>Invoice #</p>
                                        <input className="uk-input col" type="number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(Number(e.target.value))} placeholder="Input" />
                                    </div>
                                    <div className="col-6 ">
                                        <p>Topic</p>
                                        <input className="uk-input col" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Input" />
                                    </div>

                                </div>
                                <div className="row uk-margin">
                                    <div className="col-6">
                                        <div className="">

                                        </div>
                                        <p >Erstellungsdatum</p>
                                        <DatePicker
                                            className="uk-input col"
                                            placeholderText="Select a date"
                                            locale={de}
                                            selected={startDate} onChange={(date) => setStartDate(date)}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <p className="">Fällig bis</p>
                                        <DatePicker
                                            className="uk-input col"
                                            placeholderText="Select a date"
                                            locale={de}
                                            selected={dueDate} onChange={(date) => setDueDate(date)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row uk-padding">
                            <div className="col-12">
                                <table className="uk-table uk-table-hover uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Beschreibung</th>
                                            <th>Anzahl</th>
                                            <th>Preis pro Stück</th>
                                            <th>Gesamtpreis (Netto)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {positions.map((value: PositionProps, index: number) => {
                                            return <Position key={index} index={index}
                                                description={value.description} quantity={value.quantity}
                                                princePerItem={value.princePerItem}
                                                onDelete={onDelete} setData={setData} />
                                        })}
                                    </tbody>

                                </table>
                                <button className="uk-button uk-button-primary" onClick={addPosition}>Add item</button>
                            </div>

                        </div>

                        <div className="row uk-padding">
                            <div className="col-12">
                                <textarea className="uk-textarea" rows={5} placeholder="Beschreibung" value={textField} onChange={(e) => setTextField(e.target.value)} aria-label="Textarea"></textarea>
                            </div>

                        </div>

                        <div className="row uk-padding">
                            <div className="col-12">
                                <table className="uk-table uk-table-hover uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Gesamtsumme Netto</td>
                                            <td><div style={{ marginTop: "8px" }}>{formatter.format(nettoSum)}</div></td>
                                        </tr>
                                        <tr>
                                            <td>Umsatzsteuer 19%</td>
                                            <td><div style={{ marginTop: "8px" }}>{formatter.format(valueTax)}</div></td>
                                        </tr>
                                        <tr>
                                            <td>Gesamt</td>
                                            <td><div style={{ marginTop: "8px" }}>{formatter.format(totalValue)}</div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="col-1" />
                </div>
            </div>
        </div >


    )
}

export default InvoicePage;