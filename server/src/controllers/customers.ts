import * as customerService from '../services/customer';
import { Request, Response } from 'express';

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const allCustomers = await customerService.getAllCustomers();
        console.log(allCustomers);
        res.status(200).send(allCustomers);

    } catch (err) {
        res.status(404).send(err);
    }
}

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).send('No Customer Id Provided');

        const customer = await customerService.getCustomerById(Object(req.params.id));
        res.status(200).send(customer);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = req.body;

        const { error } = customerService.createCustomerDataValidation(customer);
        if (error) return res.status(400).send(error.details[0].message);

        customer.customerNumber = await customerService.getNextCustomerNumber();
        console.log(customer);
        const response = await customerService.createCustomer(customer);
        res.status(200).send(response);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const updateCustomerById = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).send('No Customer Id Provided');

        const customer = req.body;

        const { error } = customerService.updateCustomerDataValidation(customer);
        if (error) return res.status(400).send(error.details[0].message);

        const response = await customerService.updateCustomerById(Number(req.params.id), customer);
        res.status(200).send(response);

    } catch (err) {
        res.status(500).send(err);
    }
}

export const deleteCustomerById = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).send('No Customer Id Provided');

        const response = await customerService.deleteCustomerById(Number(req.params.id));
        res.status(200).send(response);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}