import React, { useEffect, useState } from "react";
import * as api from '../../api';
import UIkit from "uikit";
import ReactPortal from "../modal/ReactPortal";

interface EditCustomerModalProps {
    id: string,
    name: string,
    address: string,
    email: string,
    phone: string,
    customerNumber: number
}

const EditCustomerModal = (props: EditCustomerModalProps) => {

    const [name, setName] = useState(props.name);
    const [address, setAddress] = useState(props.address);
    const [email, setEMail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);

    const handleSubmit = async () => {

        console.log("show");
        try {
            await api.updateCustomer(props.customerNumber, {
                customerNumber: props.customerNumber,
                name: name,
                address: address,
                email: email,
                phone: phone
            });
            UIkit.notification({
                message: 'Kunde Erfolgreich Aktualisiert',
                status: 'success',
                pos: 'top-right',
                timeout: 5000
            });
        } catch (err: any) {
            UIkit.notification({
                message: 'Fehler beim updaten des Kunden: ' + err.response.data,
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }

    }

    const closeModal = () => {
        console.log('hide' + props.id);
        //UIkit.modal(props.id).hide();
    }

    return (
        <ReactPortal wrapperId={props.id}>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-margin">Kunden Bearbeiten</h2>
                <input id="name-input" type="text" name="name" className="uk-input" placeholder="Vor-und Nachname" value={name} onChange={(e) => setName(e.target.value)} />
                <input id="address-input" style={{ marginTop: "10px" }} type="text" name="address" className="uk-input" placeholder="Addresse" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input id="phone-input" style={{ marginTop: "10px" }} type="text" name="phone" className="uk-input" placeholder="Telefon-Nr" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input id="email-input" style={{ marginTop: "10px" }} type="text" name="email" className="uk-input" placeholder="E-Mail" value={email} onChange={(e) => setEMail(e.target.value)} />
                <button id="stop-button" style={{ marginTop: "10px" }} className="uk-button uk-button-default uk-modal-close" type="button" onClick={closeModal}>Abbrechen</button>
                <button id="submit-button" style={{ marginTop: "10px", marginLeft: "10px" }} className="uk-button uk-button-primary uk-modal-close" type="button" onClick={handleSubmit}>Bestätigen</button>
            </div>
        </ReactPortal>
    );
}

export default EditCustomerModal;