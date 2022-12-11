import Invoice from '../models/Invoice.js';

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