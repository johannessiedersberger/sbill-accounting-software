import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IClient {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string
}

// Create Schema
var clientSchema = new Schema<IClient>({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
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

const Client = mongoose.model<IClient>("Client", clientSchema);
export default Client;