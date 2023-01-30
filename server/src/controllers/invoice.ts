import Invoice from '../models/Invoice';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import * as invoiceService from '../services/invoice';
import { Request, Response } from 'express';

export const createNewInvoice = async (req: Request, res: Response) => {
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
            note: invoiceData.note
        });

        res.status(200).send(doc);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const getAllInvoices = async (req: Request, res: Response) => {
    try {
        const allInvoices = await invoiceService.getAllInvoices();
        console.log(allInvoices);
        res.status(200).send(allInvoices);

    } catch (err) {
        res.status(404).send(err);
    }
}

export const getInvoice = async (req: Request, res: Response) => {
    try {
        if (!req.params.invoiceId) {
            throw "Invoice ID Missing";
        }
        const invoice = await invoiceService.getInvoiceByInvoiceNumber(Number(req.params.invoiceId));
        res.status(200).send(invoice);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const updateInvoice = async (req: Request, res: Response) => {
    try {
        const update = await invoiceService.updateInvoice(req.body);

        res.status(200).send(update);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const deleteInvoice = async (req: Request, res: Response) => {
    try {
        const result = await invoiceService.delteInvoiceByNumber(Number(req.params.invoiceId));
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const getNextInvoiceNumber = async (req: Request, res: Response) => {
    try {
        const newNumber = await invoiceService.getNextInvoiceNumber();
        console.log(newNumber);
        res.status(200).send({ newNumber: newNumber });
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const getPDFInvoice = async (req: Request, res: Response) => {
    try {
        const pdfFilePath = await invoiceService.createPDFForInvoice(Number(req.params.invoiceId));
        res.download(pdfFilePath);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}