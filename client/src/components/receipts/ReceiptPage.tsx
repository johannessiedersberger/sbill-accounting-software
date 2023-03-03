import React, { useEffect, useRef, useReducer, useState, createRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import * as api from '../../api';
import UIkit from "uikit";
import { read, readFileSync } from 'fs';
import path from 'path';
import axios from "axios";
import useForceUpdate from 'use-force-update';

interface IReceipt {
    receiptNumber: string,
    supplier: string,
    description: string,
    category: string,
    receiptAmount: number,
    fileName: string,
}

interface IUriInterface {
    uri: string
}

const ReceiptPage = () => {
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
    const [receiptNumber, setReceiptNumber] = useState<string>("");
    const [supplier, setSupplier] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [receiptAmount, setReceiptAmount] = useState<number>(0);
    const [fileName, setFileName] = useState<string>("");
    const [signedFileUrl, setSignedFileUrl] = useState<string>("");
    const [docs, setDocs] = useState<IUriInterface[]>([]);

    const [filesChanged, setFilesChanged] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        if (id) loadReceipt();
    }, []);

    const loadReceipt = () => {
        api.getReceipt(id!.toString()).then((response) => {
            const receipt: IReceipt = response.data;

            setReceiptNumber(receipt.receiptNumber);
            setSupplier(receipt.supplier);
            setCategory(receipt.category);
            setDescription(receipt.description);
            setReceiptAmount(receipt.receiptAmount);

            if (receipt.fileName) {
                setNewFile(receipt.fileName);
            }

        });
    }


    const deleteFile = () => {
        api.deleteFileFromReceipt(fileName);
        setSelectedDocs([]);
        setDocs([]);
        setSignedFileUrl("");
        setFileName("");
    }

    const save = async () => {
        const receiptData: IReceipt = {
            receiptNumber: receiptNumber,
            supplier: supplier,
            category: category,
            description: description,
            receiptAmount: receiptAmount,
            fileName: fileName
        }

        try {

            // Create new Receipt
            if (!id) {
                const result = await api.postReceipt(receiptData);
                const resultId = result.data._id;

                if (selectedDocs.length >= 1) {
                    const formData = buildFormData();
                    const postFileResponse: any = await api.postReceiptFile(formData, resultId);
                    const fileName = postFileResponse.data.newFileName;
                    setNewFile(fileName);
                }

                window.history.replaceState(null, "New Page Title", `/receipt/${resultId}`);
                window.location.reload();


            } else {
                await api.updateReceipt(id, receiptData);
                if (filesChanged) {
                    const formData = buildFormData();
                    const postFileResponse: any = await api.postReceiptFile(formData, id);
                    const fileName = postFileResponse.data.newFileName;
                    setNewFile(fileName);
                    setFilesChanged(false);
                    window.location.reload();
                }
            }



            UIkit.notification({
                message: 'Beleg Erfolgreich Gespeichert',
                status: 'success',
                pos: 'top-right',
                timeout: 5000
            });

        } catch (err) {
            UIkit.notification({
                message: 'Fehler beim Speichern des Belegs: ' + err,
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }
    }

    const setNewFile = async (newFileName: string) => {
        const responseFileSignedUrl = await api.getReceiptFileSignedUrl(newFileName);
        setFileName(newFileName);
        const signedUrl = responseFileSignedUrl.data.signedUrl;
        setSignedFileUrl(signedUrl);
        const arr = [];
        arr.push({ uri: signedUrl, fileType: "application/pdf" });
        setDocs(arr);
    }

    const buildFormData = () => {
        const formData = new FormData();
        formData.append(
            "file",
            selectedDocs[0],
            selectedDocs[0].name
        );
        return formData;
    }

    const openFileUrl = () => {
        window.open(signedFileUrl);
    }

    const fileChange = (files: any) => {
        setSelectedDocs(Array.from(files));
        setFilesChanged(true);
    }

    const deleteReceipt = async () => {
        try {
            if (id) {
                await api.deleteReceipt(id);
                window.location.href = `/receipts/`;

                UIkit.notification({
                    message: 'Rechnung Erfolgreich Gelöscht',
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });
            }


        } catch (error) {
            UIkit.notification({
                message: 'Fehler beim Löschen des Belegs',
                status: 'warning',
                pos: 'top-right',
                timeout: 5000
            });
        }
    }

    return (
        <div>
            <HeaderAfterLogin />
            <div>
                <div className="container-fluid uk-padding">
                    <div className="row">
                        <div className="col-1" />
                        <div className="col-5" >
                            <div>
                                <div className="uk-margin">
                                    {
                                        docs.length == 0 ? (
                                            <input
                                                type="file"
                                                accept=".pdf,.png,.jpeg"
                                                id="input-file-upload"
                                                onChange={(el) =>
                                                    el.target.files?.length &&

                                                    fileChange(Array.from(el.target.files))
                                                }
                                            />
                                        ) : (
                                            <div>
                                                <button id="button-delete-file" className="uk-button uk-button-danger" onClick={deleteFile}>Delete File</button>

                                                <DocViewer

                                                    key={Math.random()}
                                                    documents={docs}
                                                    pluginRenderers={DocViewerRenderers}

                                                />


                                                <button className="uk-button uk-button-primary" onClick={openFileUrl}>{fileName}</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-5" >
                            <div className="row">
                                <div className="col-6">
                                    <p>Beleg #</p>
                                    <input id="input-receipt-number" className="uk-input col" type="text" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} placeholder="z.B. Rechnungsnummer" />
                                </div>
                                <div className="col-6 ">
                                    <p>Lieferant</p>
                                    <input id="input-receipt-seller" className="uk-input col" type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Lieferant" />
                                </div>

                            </div>
                            <div className="row uk-margin">
                                <div className="col-6">
                                    <p>Categorie</p>
                                    <input id="input-receipt-category" className="uk-input col" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategorie" />
                                </div>
                                <div className="col-6 ">
                                    <p>Beschreibung</p>
                                    <input id="input-receipt-description" className="uk-input col" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung" />
                                </div>

                            </div>
                            <div className="row uk-margin">
                                <div className="col-12">
                                    <p>Betrag</p>
                                    <input id="input-receipt-amount" className="uk-input col" type="Number" value={receiptAmount} onChange={(e) => setReceiptAmount(Number(e.target.value))} placeholder="Betrag" />
                                </div>
                            </div>
                            <div className="uk-margin">
                                <button id="save-button" className="uk-button uk-button-primary" onClick={save}>Speichern</button>
                            </div>
                            {
                                id ? (<button id="delte-button" className="uk-button uk-button-danger" onClick={deleteReceipt}>Löschen</button>) : (<div></div>)
                            }
                        </div>
                        <div className="col-1" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ReceiptPage;