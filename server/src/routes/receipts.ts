import express, { Router } from 'express';
import multer from 'multer';
import * as receiptController from '../controllers/receipts';


const router: Router = express.Router();

//router.post('/', receiptController.readReceiptByOCR);

router.get('/', receiptController.getAllReceipts);

router.get('/id/:uuid', receiptController.getReceipt);

router.post('/file', receiptController.uploadReceiptFile);

router.get('/file/:fileName', receiptController.getReceiptSignedUrl);

router.post('/data', receiptController.createNewReceipt)

router.put('/id/:uuid', receiptController.updateReceipt);

router.delete('/id/:uuid', receiptController.deleteReceipt);


export default router;
