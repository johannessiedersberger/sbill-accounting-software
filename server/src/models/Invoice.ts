import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IInvoice {
    invoiceNumber: number,
    createdDate: Date,
    dueDate: Date,
    client: string,
    topic: string,
    address: string,
    invoiceItems: IInvoiceItems[],
    note: string,
    nettoSum: number,
    valueTax: number,
    invoiceAmount: number
}

interface IInvoiceItems {
    key: number,
    description: string,
    quantity: number,
    princePerItem: number,
}

// Create Schema
var invoiceSchema = new Schema<IInvoice>({
    invoiceNumber: {
        type: Number,
        require: true
    },
    createdDate: {
        type: Date,
        require: true
    },
    dueDate: {
        type: Date,
        require: true
    },
    // client: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Client'
    // },
    client: {
        type: String,
        require: true
    },
    topic: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    invoiceItems: [
        {
            key: Number,
            description: String,
            quantity: Number,
            princePerItem: Number,
        }
    ],
    note: {
        type: String,
        require: true
    },
    nettoSum: {
        type: Number,
        require: true
    },
    valueTax: {
        type: Number,
        require: true
    },
    invoiceAmount: {
        type: Number,
        require: true
    },


});

const Invoice = mongoose.model<IInvoice>("Invoice", invoiceSchema);
export default Invoice;