import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface ICustomer {
    customerNumber: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    //customerNumber: number
}

// Create Schema
var customerSchema = new Schema<ICustomer>({
    customerNumber: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
});

const Client = mongoose.model<ICustomer>("Customer", customerSchema);
export default Client;