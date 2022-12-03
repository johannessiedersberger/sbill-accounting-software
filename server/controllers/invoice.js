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

export const getInvoice = (req, res) => {
    try {

    } catch (err) {
        res.status(404).send(err);
    }
}

export const updateInvoice = (req, res) => {
    try {

    } catch (err) {
        res.status(404).send(err);
    }
}

export const deleteInvoice = (req, res) => {
    try {

    } catch (err) {
        res.status(404).send(err);
    }
}