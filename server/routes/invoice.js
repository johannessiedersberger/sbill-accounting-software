import express from 'express';
import { getAllInvoices, createNewInvoice, getInvoice, updateInvoice, deleteInvoice } from '../controllers/invoice.js';

const router = express.Router();

router.get('/', getAllInvoices);

router.get('/id/:invoiceId', getInvoice);

router.post('/', createNewInvoice);

router.put('/id/:invoiceId', updateInvoice);

router.delete('/id/:invoiceId', deleteInvoice);

export default router;