import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface ICompany {
    name: string,
    address: string,
    email: string,
    phone: string,
    bankAccountNumber: string,
    valueTaxNumber: string
}

// Create Schema
var companySchema = new Schema<ICompany>({
    name: {
        type: String,
        require: true
    },
    address: {
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
    bankAccountNumber: {
        type: String,
        require: true
    },
    valueTaxNumber: {
        type: String,
        require: true
    }
});

const Company = mongoose.model<ICompany>("Company", companySchema);
export default Company;