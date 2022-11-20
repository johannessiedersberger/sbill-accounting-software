import Invoice from '../models/Invoice.js';

export const saveNewInvoice = async (invoiceData) => {
    const invoice = new Invoice({
        invoiceNumber: invoiceData.invoiceNumber,
        createdDate: invoiceData.createdDate,
        dueDate: invoiceData.dueDate,
        client: invoiceData.client,
        address: invoiceData.address,
        topic: invoiceData.topic,
        invoiceItems: invoiceData.invoiceItems,
        nettoSum: invoiceData.nettoSum,
        valueTax: invoiceData.vatTax,
        invoiceAmount: invoiceData.invoiceAmount,
    });
    const savedInvoice = await invoice.save();
    return savedInvoice;
}