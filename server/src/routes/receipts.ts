import express, { Router } from 'express';
import multer from 'multer';
import * as receiptController from '../controllers/receipts';


const router: Router = express.Router();

//router.post('/', receiptController.readReceiptByOCR);

router.get('/', receiptController.getAllReceipts);

router.get('/id/:id', receiptController.getReceipt);

router.post('/file/:id', receiptController.uploadReceiptFile);

router.get('/file/:fileName', receiptController.getReceiptSignedUrl);

router.delete('/file/delete/:fileName', receiptController.deleteReceiptFile);

router.post('/data', receiptController.createNewReceipt)

router.put('/id/:id', receiptController.updateReceipt);

router.delete('/id/:id', receiptController.deleteReceipt);


export default router;
