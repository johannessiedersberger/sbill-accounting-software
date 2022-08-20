import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
var clientSchema = new Schema({
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

const Client = mongoose.model("Client", clientSchema);
export default Client;