import * as companyService from '../services/company';
import { Request, Response } from 'express';

export const getCompany = async (req: Request, res: Response) => {
    try {
        const company = await companyService.getCompany();

        res.status(200).send(company);

    } catch (err) {
        res.status(404).send(err);
    }
}

export const setCompany = async (req: Request, res: Response) => {
    try {
        const companyData = req.body;

        const { error } = companyService.createCompanyDataValidation(companyData);
        if (error) return res.status(400).send(error.details[0].message);

        console.log(companyData);

        const result = await companyService.setCompany(companyData);
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send(err);
    }
}