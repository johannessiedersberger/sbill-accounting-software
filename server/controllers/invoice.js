import Invoice from '../models/Invoice.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import * as invoiceService from '../services/invoice.js';

export const createNewInvoice = async (req, res) => {
    try {
        const invoiceData = req.body;
        console.log(invoiceData);

        const doc = await invoiceService.saveNewInvoice({
            invoiceNumber: invoiceData.invoiceNumber,
            createdDate: invoiceData.createdDate,
            dueDate: invoiceData.dueDate,
            client: invoiceData.client,
            topic: invoiceData.topic,
            address: invoiceData.address,
            invoiceItems: invoiceData.invoiceItems,
            nettoSum: invoiceData.nettoSum,
            valueTax: invoiceData.valueTax,
            invoiceAmount: invoiceData.invoiceAmount,
        });

        res.status(200).send(doc);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const getAllInvoices = async (req, res) => {
    try {
        const allInvoices = await invoiceService.getAllInvoices();
        console.log(allInvoices);
        res.status(200).send(allInvoices);

    } catch (err) {
        res.status(404).send(err);
    }
}

export const getInvoice = async (req, res) => {
    try {
        const invoice = await invoiceService.getInvoiceByInvoiceNumber(req.params.invoiceId);
        res.status(200).send(invoice);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const updateInvoice = async (req, res) => {
    try {
        const update = await invoiceService.updateInvoice(req.body);

        res.status(200).send(update);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const deleteInvoice = (req, res) => {
    try {

    } catch (err) {
        res.status(404).send(err);
    }
}

export const getNextInvoiceNumber = async (req, res) => {
    try {
        const newNumber = await invoiceService.getNextInvoiceNumber();
        console.log(newNumber);
        res.status(200).send({ newNumber: newNumber });
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const getPDFInvoice = async (req, res) => {
    try {
        const pdfBuffer = invoiceService.createPDFForInvoice(req.params.invoiceId);
        res.status(200).send({});
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}