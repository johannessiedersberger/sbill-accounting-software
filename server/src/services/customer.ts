import Joi from 'joi';
import { Types } from 'mongoose';
import Customer from '../models/Customer';

interface CustomerData {
    customerNumber: number,
    name: string,
    email: string,
    phone: string,
    address: string,
}

export const createCustomerDataValidation = (data: CustomerData) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .min(1)
            .required()
            .email(),
        phone: Joi.string()
            .min(1)
            .required(),
        address: Joi.string()
            .min(1)
            .required(),
    });
    return schema.validate(data);
}

export const updateCustomerDataValidation = (data: CustomerData) => {
    const schema = Joi.object({
        customerNumber: Joi.number()
            .min(1)
            .required(),
        name: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .min(1)
            .required()
            .email(),
        phone: Joi.string()
            .min(1)
            .required(),
        address: Joi.string()
            .min(1)
            .required(),
    });
    return schema.validate(data);
}

export const getAllCustomers = async () => {
    const allCustomers = await Customer.find({});
    return allCustomers;
}

export const getCustomerById = async (id: Types.ObjectId) => {
    const allCustomers = await Customer.findOne({ _id: id });
    return allCustomers;
}

export const createCustomer = async (customer: CustomerData) => {
    let clientData = customer;
    const newCustomer = new Customer(clientData);
    const response = newCustomer.save();
    return response;
}

export const getNextCustomerNumber = async () => {
    const numDocuments: number = await Customer.countDocuments({});
    let currentNumber = numDocuments + 1;
    while (await getNumDocumentsWithNumber(currentNumber) >= 1) {
        currentNumber++;
    }
    return currentNumber;
}

const getNumDocumentsWithNumber = async (customerNumber: number) => {
    return await Customer.countDocuments({ customerNumber: customerNumber });
}

export const updateCustomerById = async (id: number, customerData: CustomerData) => {
    const update = await Customer.findOneAndUpdate({ customerNumber: id }, customerData);
    return update;
}