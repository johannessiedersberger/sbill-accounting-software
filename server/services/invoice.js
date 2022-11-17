import Invoice from '../models/Invoice.js';

export const saveNewInvoice = async (invoiceData) => {
    const invoice = new Invoice({
        invoiceNumber: invoiceData.invoiceNumber,
        createdDate: invoiceData.createdDate,
        dueDate: invoiceData.dueDate,
        client: invoiceData.client,
        invoiceItems: invoiceData.invoiceItems,
        invoiceAmount: invoiceData.invoiceAmount,
        vatTax: invoiceData.vatTax
    });
    const savedInvoice = await invoice.save();
    return savedInvoice;
}