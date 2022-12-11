import express from 'express';
import * as invoiceController from '../controllers/invoice.js';

const router = express.Router();

router.get('/', invoiceController.getAllInvoices);

router.get('/id/:invoiceId', invoiceController.getInvoice);

router.post('/', invoiceController.createNewInvoice);

router.put('/id/:invoiceId', invoiceController.updateInvoice);

router.delete('/id/:invoiceId', invoiceController.deleteInvoice);

export default router;