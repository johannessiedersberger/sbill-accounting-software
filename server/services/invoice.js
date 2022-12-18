import Invoice from '../models/Invoice.js';
import html_to_pdf from 'html-pdf-node';
import fs from 'fs';
import * as invoiceTemplate from '../utils/invoiceTemplate.js';

export const saveNewInvoice = async (invoiceData) => {

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

export const updateInvoice = async (invoiceData) => {
    const update = await Invoice.findOneAndUpdate({ invoiceNumber: invoiceData.invoiceNumber }, invoiceData);
    return update;
}

export const getAllInvoices = async () => {
    const invoices = await Invoice.find({});
    return invoices;
}

export const getInvoiceByInvoiceNumber = async (invoiceNumber) => {
    const invoice = await Invoice.find({ invoiceNumber: invoiceNumber });
    return invoice;
}

export const getNextInvoiceNumber = async () => {
    const numDocuments = await Invoice.countDocuments({});
    return numDocuments + 1;
}

export const createPDFForInvoice = async (invoiceId) => {
    const invoice = await Invoice.findOne({ invoiceNumber: invoiceId });

    let options = { format: 'A4' };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    const text = invoiceTemplate.getInvoiceText(
        invoice.client, invoice.address,
        invoice.invoiceNumber, invoice.topic,
        invoice.createdDate, invoice.dueDate,
        invoice.invoiceItems, invoice.nettoSum, invoice.valueTax, invoice.invoiceAmount
    );
    let file = { content: text };

    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
        fs.writeFileSync('some.pdf', pdfBuffer);
    });
}