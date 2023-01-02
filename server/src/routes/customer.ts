import express from 'express';
import * as customerController from '../controllers/customers';

const router = express.Router();

router.get('/', customerController.getAllCustomers);

router.get('/:id', customerController.getCustomerById);

router.post('/', customerController.createCustomer);





export default router;