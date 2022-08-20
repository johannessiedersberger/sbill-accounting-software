import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
var invoiceSchema = new Schema({
    invoiceNumber: {
        type: Number,
        require: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        require: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    invoiceItems: [
        {
            description: String,
            quantity: Number,
            unitPrice: Number,
        }
    ],
    invoiceAmount: {
        type: Number,
        require: true
    },
    vatTax: {
        type: Number,
        require: true
    },

});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;