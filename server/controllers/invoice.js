import Invoice from '../models/Invoice.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { saveNewInvoice } from '../services/invoice.js';

export const createNewInvoice = async (req, res) => {

    const invoiceData = req.body;
    console.log(invoiceData);

    // await createNewInvoice({
    //     invoiceNumber: invoiceData.invoiceNumber,
    //     createdDate: invoiceData.createdDate,
    //     dueDate: invoiceData.dueDate,
    //     client: invoiceData.client,
    //     invoiceItems: invoiceData.invoiceItems,
    //     invoiceAmount: invoiceData.invoiceAmount,
    //     vatTax: invoiceData.vatTax

    // })
}

export const getAllInvoices = (req, res) => {

}

export const getInvoice = (req, res) => {

}

export const updateInvoice = (req, res) => {

}

export const deleteInvoice = (req, res) => {

}