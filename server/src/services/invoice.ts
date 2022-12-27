import Invoice from '../models/Invoice';
import html_to_pdf from 'html-pdf-node';
import fs from 'fs';
import * as invoiceTemplate from '../utils/invoiceTemplate';

interface IInvoice {
    invoiceNumber: number,
    createdDate: Date,
    dueDate: Date,
    client: string,
    topic: string,
    address: string,
    invoiceItems: IInvoiceItems[],
    note: string,
    nettoSum: number,
    valueTax: number,
    invoiceAmount: number
}

interface IInvoiceItems {
    key: number,
    description: string,
    quantity: number,
    princePerItem: number,
}

export const saveNewInvoice = async (invoiceData: IInvoice) => {

    const invoiceWithNum = await Invoice.findOne({ invoiceNumber: invoiceData.invoiceNumber });
    if (invoiceWithNum) {
        throw "Invoice Already Exists";
    }
    else {
        const invoice = new Invoice(invoiceData);
        const savedInvoice = await invoice.save();
        return savedInvoice;
    }

}

export const updateInvoice = async (invoiceData: IInvoice) => {
    const update = await Invoice.findOneAndUpdate({ invoiceNumber: invoiceData.invoiceNumber }, invoiceData);
    return update;
}

export const getAllInvoices = async () => {
    const invoices = await Invoice.find({});
    return invoices;
}

export const getInvoiceByInvoiceNumber = async (invoiceNumber: number) => {
    const invoice = await Invoice.find({ invoiceNumber: invoiceNumber });
    return invoice;
}

export const getNextInvoiceNumber = async () => {
    const numDocuments = await Invoice.countDocuments({});
    return numDocuments + 1;
}

export const createPDFForInvoice = async (invoiceId: number) => {
    const invoice: any = await Invoice.findOne({ invoiceNumber: invoiceId });

    let options = { format: 'A4' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    const text = await invoiceTemplate.getInvoiceText({
        client: invoice.client, address: invoice.address,
        invoiceNumber: invoice.invoiceNumber, topic: invoice.topic,
        createdDate: invoice.createdDate, dueDate: invoice.dueDate,
        positions: invoice.invoiceItems, nettoSum: invoice.nettoSum, valueTax: invoice.valueTax,
        invoiceAmount: invoice.invoiceAmount, note: invoice.note
    });

    let file = { content: text };

    const savePDF = (pdfBuffer: any) => {
        console.log("PDF Buffer:-", pdfBuffer);
        fs.writeFileSync(`./src/utils/invoices/${invoice.topic}_${invoice.invoiceNumber}.pdf`, pdfBuffer);
    }

    html_to_pdf.generatePdf(file, options, (err: Error, buffer: Buffer) => savePDF(buffer));

};
