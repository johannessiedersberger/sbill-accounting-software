import React, { useEffect, useRef, useState, createRef, ChangeEvent } from "react";
import HeaderAfterLogin from "../dashboard/HeaderAfterLogin";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const ReceiptPage = () => {
    const [selectedDocs, setSelectedDocs] = useState<File[]>([]);
    const [receiptNumber, setReceiptNumber] = useState<string>("");
    const [supplier, setSupplier] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    const deleteFile = () => {
        setSelectedDocs([]);
    }

    const saveReceiptChanges = () => {

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
                                    <input className="uk-input col" type="Number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Betrag" />
                                </div>
                            </div>
                            <div className="">
                                <button className="uk-button uk-button-primary" onClick={deleteFile}>Speichern</button>
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