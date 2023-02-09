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

interface IReceipt {
    receiptNumber: string,
    uuid: string,
    supplier: string,
    description: string,
    category: string,
    receiptAmount: number,
    fileName: string,
}

export const getAllReceipts = async (req: Request, res: Response) => {
    try {

        const allReceipts = await receiptService.getAllReceipts();

        res.status(200).send(allReceipts);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const getReceipt = async (req: Request, res: Response) => {

}

export const uploadReceiptFile = async (req: Request, res: Response) => {

    try {

        console.log(req.files)

        if (!req.files) {
            throw "No Files Uploaded"
        }

        const fileArray: any = req.files;
        const uploadFile: IFile = fileArray.file;

        const uploadedData = await fs.readFile(uploadFile.tempFilePath);

        const uuid = receiptService.createUUIDForReceiptFile();

        const fileExtension = uploadFile.name.split('.').slice(1).join('.');

        const newFileName = uuid + "." + fileExtension;

        await receiptService.uploadFileToS3Bucket(uploadedData, newFileName);

        await fs.unlink(uploadFile.tempFilePath);

        res.status(200).send({ newFileName: newFileName, uuid: uuid });
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const createNewReceipt = async (req: Request, res: Response) => {
    try {

        const receiptData: IReceipt = req.body;

        // Check if file already exists
        const receiptsWithFileName = await receiptService.getReceiptByFileName(receiptData.fileName);
        if (!receiptsWithFileName) {
            throw "Filename already exists";
        }

        const response = await receiptService.createNewReceipt(receiptData);

        res.status(200).send(response);
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

