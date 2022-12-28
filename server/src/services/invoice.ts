import Invoice from '../models/Invoice';
import html_to_pdf from 'html-pdf-node';
import { promises as fsPromises } from 'fs';
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

    const numberOfInvoices = await Invoice.count({ invoiceNumber: invoiceData.invoiceNumber });

    if (numberOfInvoices > 1) {
        throw "Invoice Exists more than once";
    }
    else if (numberOfInvoices == 0) {
        throw "Invoice does not Exist with that number";
    }
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

    const pdfPath = `./src/utils/invoices/${invoice.topic}_${invoice.invoiceNumber}.pdf`;

    const pdfBuffer = await CreatePDF(file, options);
    await fsPromises.writeFile(pdfPath, pdfBuffer);

    return pdfPath;


};

const CreatePDF = async (file: any, options: any) => {
    return new Promise<Buffer>(
        (announcePDFisReady: any) => {
            html_to_pdf.generatePdf(file, options, async (err: Error, buffer: Buffer) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Created PDF Successfully");
                    announcePDFisReady(buffer);
                }
            });
        }
    )
}
