import { Types } from 'mongoose';
import Client from '../models/Customer';

export const getAllCustomers = async () => {
    const allClients = await Client.find({});
    return allClients;
}

export const getCustomerById = async (id: Types.ObjectId) => {
    const client = await Client.findOne({ _id: id });
    return client;
}

export const createCustomer = async (client: {}) => {
    const newClient = new Client(client);
    const response = newClient.save();
    return response;

}