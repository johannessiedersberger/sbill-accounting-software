import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IReceipt {
    receiptNumber: number,
    supplier: string,
    description: string,
    category: string,
    invoiceAmount: number
}

// Create Schema
var receiptSchema = new Schema<IReceipt>({
    receiptNumber: {
        type: Number,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    invoiceAmount: {
        type: Number,
        required: true
    },
});

const Invoice = mongoose.model<IReceipt>("Receipt", receiptSchema);
export default Invoice;