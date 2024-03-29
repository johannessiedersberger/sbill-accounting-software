import React, { useEffect, useState } from "react";
import * as api from '../../api';
import UIkit from "uikit";
import ReactPortal from "../modal/ReactPortal";

interface CustomerModalProps {
    id: string,
    reloadCustomers: () => any,
}

const NewCustomerModal = (props: CustomerModalProps) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEMail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async () => {

        console.log("show");
        try {
            await api.createCustomer({
                name: name,
                address: address,
                email: email,
                phone: phone
            });
            UIkit.notification({
                message: 'Kunde Erfolgreich Erstellt',
                status: 'success',
                pos: 'top-right',
                timeout: 5000
            });

            deleteAllValues();
            props.reloadCustomers();
        } catch (err: any) {
            UIkit.notification({
                message: 'Fehler beim erstellen des Kunden: ' + err.response.data,
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }

    }

    const deleteAllValues = () => {
        setName('');
        setAddress('');
        setEMail('');
        setPhone('');
    }

    return (
        <ReactPortal wrapperId={props.id}>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-margin">Kunden erstellen</h2>
                <input id="name-input" type="text" name="name" className="uk-input" placeholder="Vor-und Nachname" value={name} onChange={(e) => setName(e.target.value)} />
                <input id="address-input" style={{ marginTop: "10px" }} type="text" name="address" className="uk-input" placeholder="Addresse" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input id="phone-input" style={{ marginTop: "10px" }} type="text" name="phone" className="uk-input" placeholder="Telefon-Nr" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input id="email-input" style={{ marginTop: "10px" }} type="text" name="address" className="uk-input" placeholder="E-Mail" value={email} onChange={(e) => setEMail(e.target.value)} />
                <button id="stop-button" style={{ marginTop: "10px" }} className="uk-button uk-button-default uk-modal-close " type="button" onClick={deleteAllValues}>Abbrechen</button>
                <button id="submit-button" style={{ marginTop: "10px", marginLeft: "10px" }} className="uk-button uk-button-primary uk-modal-close" type="button" onClick={handleSubmit}>Bestätigen</button>
            </div>
        </ReactPortal>
    );
}

export default NewCustomerModal;