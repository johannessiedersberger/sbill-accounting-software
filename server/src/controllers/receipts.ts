import { Request, Response } from 'express';
import * as receiptService from '../services/receipts';
import fs from 'fs/promises';



interface IFile {
    name: string,
    data: Buffer,
    size: number,
    encoding: string,
    tempFilePath: string,
    truncated: boolean,
    mimetype: string,
    md5: string,
}

export const getAllReceipts = async (req: Request, res: Response) => {

}

export const getReceipt = async (req: Request, res: Response) => {

}

export const createNewReceipt = async (req: Request, res: Response) => {
    //console.log(req);
    try {

        if (!req.files) {
            throw "No Files Uploaded"
        }


        const fileArray: any = req.files;
        const uploadFile: IFile = fileArray.file;

        const uploadedData = await fs.readFile(uploadFile.tempFilePath);

        await receiptService.uploadFileToS3Bucket(uploadedData, uploadFile.name);

        await fs.unlink(uploadFile.tempFilePath);






        const doc = "X";//await receiptService.createNewReceipt(receiptData);

        res.status(200).send(doc);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const updateReceipt = async (req: Request, res: Response) => {

}

export const deleteReceipt = async (req: Request, res: Response) => {

}

export const readReceiptByOCR = async (req: Request, res: Response) => {
    try {

        // const file = req.file as Express.Multer.File;


        // console.log(file);

        // if (!file) {
        //     throw "Invoice Buffer is Missing";
        // }
        // const buffer = Buffer.from(file.);

        // await receiptService.getReceiptData(buffer.toString('base64'));

        res.status(200).send("DONE");
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

