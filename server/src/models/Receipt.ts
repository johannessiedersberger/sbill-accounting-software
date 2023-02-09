import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IReceipt {
    receiptNumber: string,
    uuid: string,
    supplier: string,
    description: string,
    category: string,
    receiptAmount: number,
    fileName: string,
}

// Create Schema
var receiptSchema = new Schema<IReceipt>({
    receiptNumber: {
        type: String,
        required: false
    },
    uuid: {
        type: String,
        required: false,
    },
    supplier: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    receiptAmount: {
        type: Number,
        required: false
    },
    fileName: {
        type: String,
        required: false
    }
});

const Invoice = mongoose.model<IReceipt>("Receipt", receiptSchema);
export default Invoice;