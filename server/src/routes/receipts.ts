import express, { Router } from 'express';
import multer from 'multer';
import * as receiptController from '../controllers/receipts';
import * as verifyToken from '../middleware/verifyToken';


const router: Router = express.Router();

//router.post('/', receiptController.readReceiptByOCR);

router.get('/', verifyToken.verifyUser, receiptController.getAllReceipts);

router.get('/id/:id', verifyToken.verifyUser, receiptController.getReceipt);

router.post('/file/:id', verifyToken.verifyUser, receiptController.uploadReceiptFile);

router.get('/file/:fileName', verifyToken.verifyUser, receiptController.getReceiptSignedUrl);

router.delete('/file/delete/:fileName', verifyToken.verifyUser, receiptController.deleteReceiptFile);

router.post('/data', verifyToken.verifyUser, receiptController.createNewReceipt)

router.put('/id/:id', verifyToken.verifyUser, receiptController.updateReceipt);

router.delete('/id/:id', verifyToken.verifyUser, receiptController.deleteReceipt);


export default router;
