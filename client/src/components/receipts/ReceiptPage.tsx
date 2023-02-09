import React, { useEffect, useRef, useState, createRef, ChangeEvent } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import * as api from '../../api';
import UIkit from "uikit";

interface IReceipt {
    receiptNumber: string,
    uuid: string,
    supplier: string,
    description: string,
    category: string,
    receiptAmount: number,
    fileName: string,
}

const ReceiptPage = () => {
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
    const [receiptNumber, setReceiptNumber] = useState<string>("");
    const [uuid, setUuid] = useState<string>("");
    const [supplier, setSupplier] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [receiptAmount, setReceiptAmount] = useState<number>(0);
    const [fileName, setFileName] = useState<string>("");

    const deleteFile = () => {
        setSelectedDocs([]);
    }

    const save = async () => {

        const formData = new FormData();
        formData.append(
            "file",
            selectedDocs[0],
            selectedDocs[0].name
        );



        try {

            if (true) {
                const response: any = await api.postReceiptFile(formData);
                const fileName = response.data.newFileName;
                const uuid = response.data.uuid;

                const receiptData: IReceipt = {
                    receiptNumber: receiptNumber,
                    uuid: uuid,
                    supplier: supplier,
                    category: category,
                    description: description,
                    receiptAmount: receiptAmount,
                    fileName: fileName
                }

                await api.postReceiptData(receiptData);



            } else {

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
                                        selectedDocs.length == 0 ? (
                                            <input
                                                type="file"
                                                accept=".pdf,.png,.jpeg"
                                                multiple
                                                onChange={(el) =>
                                                    el.target.files?.length &&
                                                    setSelectedDocs(Array.from(el.target.files))
                                                    //fileChange(Array.from(el.target.files))
                                                }
                                            />
                                        ) : (
                                            <div>
                                                <button className="uk-button uk-button-danger" onClick={deleteFile}>Delete File</button>
                                                <DocViewer
                                                    documents={selectedDocs.map((file) => ({
                                                        uri: window.URL.createObjectURL(file),
                                                        fileName: file.name,
                                                    }))}
                                                    pluginRenderers={DocViewerRenderers}
                                                />

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
                                    <input className="uk-input col" type="text" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} placeholder="z.B. Rechnungsnummer" />
                                </div>
                                <div className="col-6 ">
                                    <p>Lieferant</p>
                                    <input className="uk-input col" type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Lieferant" />
                                </div>

                            </div>
                            <div className="row uk-margin">
                                <div className="col-6">
                                    <p>Categorie</p>
                                    <input className="uk-input col" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategorie" />
                                </div>
                                <div className="col-6 ">
                                    <p>Beschreibung</p>
                                    <input className="uk-input col" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung" />
                                </div>

                            </div>
                            <div className="row uk-margin">
                                <div className="col-12">
                                    <p>Betrag</p>
                                    <input className="uk-input col" type="Number" value={receiptAmount} onChange={(e) => setReceiptAmount(Number(e.target.value))} placeholder="Betrag" />
                                </div>
                            </div>
                            <div className="">
                                <button className="uk-button uk-button-primary" onClick={save}>Speichern</button>
                            </div>
                        </div>
                        <div className="col-1" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ReceiptPage;