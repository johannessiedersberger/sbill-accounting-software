import Invoice from '../models/Invoice.js';

export const saveNewInvoice = async (invoiceData) => {
    const invoice = new Invoice(invoiceData);
    const savedInvoice = await invoice.save();
    return savedInvoice;
}

export const getAllInvoices = async () => {
    const invoices = await Invoice.find({});
    return invoices;
}