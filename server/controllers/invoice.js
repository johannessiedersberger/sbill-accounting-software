import Invoice from '../models/Invoice.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { saveNewInvoice } from '../services/invoice.js';

export const createNewInvoice = async (req, res) => {
    try {
        const invoiceData = req.body;
        console.log(invoiceData);

        await saveNewInvoice({
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
        res.status(200).send("Success");
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const getAllInvoices = (req, res) => {

}

export const getInvoice = (req, res) => {

}

export const updateInvoice = (req, res) => {

}

export const deleteInvoice = (req, res) => {

}