import express from 'express';
import * as companyController from '../controllers/companies';

const router = express.Router();

router.get('/', companyController.getCompany);

router.post('/', companyController.setCompany);


export default router;