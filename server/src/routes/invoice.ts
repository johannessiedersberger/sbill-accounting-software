import express from 'express';
import * as invoiceController from '../controllers/invoice';
import * as verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.get('/', verifyToken.verifyUser, invoiceController.getAllInvoices);

router.get('/id/:invoiceId', verifyToken.verifyUser, invoiceController.getInvoice);

router.get('/number', verifyToken.verifyUser, invoiceController.getNextInvoiceNumber);

router.get('/pdf/:invoiceId', verifyToken.verifyUser, invoiceController.getPDFInvoice);

router.post('/', verifyToken.verifyUser, invoiceController.createNewInvoice);

router.put('/id/:invoiceId', verifyToken.verifyUser, invoiceController.updateInvoice);

router.delete('/id/:invoiceId', verifyToken.verifyUser, invoiceController.deleteInvoice);

export default router;