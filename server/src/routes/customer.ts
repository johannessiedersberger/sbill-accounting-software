import express from 'express';
import * as customerController from '../controllers/customers';
import * as verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', verifyToken.verifyUser, customerController.getAllCustomers);

router.get('/:id', verifyToken.verifyUser, customerController.getCustomerById);

router.post('/', verifyToken.verifyUser, customerController.createCustomer);

router.put('/:id', verifyToken.verifyUser, customerController.updateCustomerById);

router.delete('/delete/:id', verifyToken.verifyUser, customerController.deleteCustomerById);





export default router;