import express, { Router } from 'express';
import multer from 'multer';
import * as receiptController from '../controllers/receipts';


const router: Router = express.Router();

//router.post('/', receiptController.readReceiptByOCR);

router.get('/', receiptController.getAllReceipts);

router.get('/id/:invoiceId', receiptController.getReceipt);

router.post('/', receiptController.uploadReceiptFile);

router.post('/data', receiptController.createNewReceipt)

router.put('/id/:invoiceId', receiptController.updateReceipt);

router.delete('/id/:invoiceId', receiptController.deleteReceipt);


export default router;
