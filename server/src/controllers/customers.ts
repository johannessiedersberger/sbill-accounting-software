import * as clientService from '../services/customer';
import { Request, Response } from 'express';

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const allClients = await clientService.getAllCustomers();
        console.log(allClients);
        res.status(200).send(allClients);

    } catch (err) {
        res.status(404).send(err);
    }
}

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const client = await clientService.getCustomerById(Object(req.params.id));
        res.status(200).send(client);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const client = req.body;
        console.log(client);
        const response = await clientService.createCustomer(client);
        res.status(200).send(response);
    } catch (err) {
        res.status(404).send(err);
    }
}