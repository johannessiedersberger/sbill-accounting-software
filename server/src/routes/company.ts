import express from 'express';
import * as companyController from '../controllers/companies';
import * as verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', verifyToken.verifyUser, companyController.getCompany);

router.post('/', verifyToken.verifyUser, companyController.setCompany);


export default router;