import React, { useState, ChangeEvent, useEffect } from 'react';
import HeaderAfterLogin from '../dashboard/HeaderAfterLogin';
import * as api from '../../api';
import UIkit from 'uikit';

interface CompanyData {
    name: string,
    address: string,
    email: string,
    phone: string,
    bankAccountNumber: string,
    valueTaxNumber: string
}

const CompanySettings = () => {

    const [name, SetName] = useState('');
    const [address, SetAddress] = useState('');
    const [companyEmail, SetCompanyEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [IBAN, setIBAN] = useState('');
    const [valueTaxNumber, SetValueTaxNumber] = useState('');

    useEffect(() => {
        getCompanyData();
    }, []);

    const getCompanyData = () => {
        api.getCompany().then((response) => {
            const companyData: CompanyData = response.data;
            SetCompanyEmail(companyData.email);
            SetName(companyData.name);
            SetAddress(companyData.address);
            setPhone(companyData.phone);
            setIBAN(companyData.bankAccountNumber);
            SetValueTaxNumber(companyData.valueTaxNumber);
        });
    }

    const updateCompanyData = async () => {
        const companyData: CompanyData = {
            name: name,
            address: address,
            email: companyEmail,
            phone: phone,
            bankAccountNumber: IBAN,
            valueTaxNumber: valueTaxNumber
        }
        try {
            await api.setCompany(companyData);
            UIkit.notification({
                message: 'Firmen-Einstellungen Aktualisert',
                status: 'success',
                pos: 'top-right',
                timeout: 5000
            });

        } catch (error) {
            UIkit.notification({
                message: 'Fehler beim aktualisieren der Firmen-Einstellungen ',
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });

        }
    }

    return (
        <div>
            <HeaderAfterLogin />
            <div className="container-fluid uk-padding">
                <div className="row">
                    <div className="col-1" />
                    <div className="col-10" >
                        <div className='uk-margin'>
                            <h2 style={{ textAlign: "center" }}>Firmen-Einstellungen</h2>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Firmen-Name" aria-label="Input" value={name} onChange={(e) => SetName(e.target.value)} />
                        </div>
                        <div className="uk-margin">
                            <textarea className="uk-textarea" rows={5} placeholder="Anschrift" aria-label="Textarea" value={address} onChange={(e) => SetAddress(e.target.value)}></textarea>
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Firmen-Email" aria-label="Input" value={companyEmail} onChange={(e) => SetCompanyEmail(e.target.value)} />
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Telefon-Nr." aria-label="Input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="IBAN" aria-label="Input" value={IBAN} onChange={(e) => setIBAN(e.target.value)} />
                        </div>
                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Ust.-Id" aria-label="Input" value={valueTaxNumber} onChange={(e) => SetValueTaxNumber(e.target.value)} />
                        </div>
                        <div className="uk-margin">
                            <button className="uk-button uk-align-center" onClick={updateCompanyData}>Speichern</button>
                        </div>
                    </div>
                    <div className="col-1" />
                </div>
            </div>
        </div>
    );
}

export default CompanySettings;