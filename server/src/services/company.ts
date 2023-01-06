import Joi from 'joi';
import { Types } from 'mongoose';
import Company from '../models/Company';

interface CompanyData {
    name: string,
    address: string,
    email: string,
    phone: string,
    bankAccountNumber: string
}

export const getCompany = async () => {
    const company = await Company.findOne({});
    return company;
}

export const setCompany = async (companyData: CompanyData) => {
    const companies = await Company.count({});
    if (companies >= 1) {
        const result = await Company.updateOne({}, companyData);
        return result;
    } else {
        const result = await Company.create(companyData);
        return result;
    }
}

export const createCompanyDataValidation = (data: CompanyData) => {
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
        bankAccountNumber: Joi.string()
            .min(1)
            .required(),
        valueTaxNumber: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data);
}
