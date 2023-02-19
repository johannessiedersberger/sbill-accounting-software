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
    try {

        if (!req.params.id) {
            throw "UUID is missing";
        }

        const receipt = await receiptService.getReceiptByID(req.params.id);

        res.status(200).send(receipt);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const uploadReceiptFile = async (req: Request, res: Response) => {

    try {

        console.log(req.files)

        if (!req.files) {
            throw "No Files Uploaded"
        }


        if (!req.params.id) {
            throw "No Id given"
        }

        const fileArray: any = req.files;
        const uploadFile: IFile = fileArray.file;

        const uploadedData = await fs.readFile(uploadFile.tempFilePath);

        const id = req.params.id;

        const fileExtension = uploadFile.name.split('.').slice(1).join('.');

        const newFileName = id + "." + fileExtension;

        await receiptService.uploadFileToS3Bucket(uploadedData, newFileName);

        await receiptService.updateFileNameInReceipt(newFileName, id);

        await fs.unlink(uploadFile.tempFilePath);

        res.status(200).send({ newFileName: newFileName });
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const getReceiptSignedUrl = async (req: Request, res: Response) => {
    try {

        if (!req.params.fileName) {
            throw "No Filename Given"
        }

        const signedUrl = await receiptService.getSignedUrlFromFileS3(req.params.fileName);
        console.log(signedUrl);

        res.status(200).send({ signedUrl: signedUrl });

    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const createNewReceipt = async (req: Request, res: Response) => {
    try {

        const receiptData: IReceipt = req.body;

        // TODO: Validate Receipt Data

        const response = await receiptService.createNewReceipt(receiptData);
        console.log(response);

        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const updateReceipt = async (req: Request, res: Response) => {

    try {

        if (!req.params.id) {
            throw "No id given to update!";
        }

        const receiptData: IReceipt = req.body;

        const response = await receiptService.updateReceipt(req.params.id, receiptData);

        res.status(200).send(response);

    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }

}

export const deleteReceipt = async (req: Request, res: Response) => {
    try {

        if (!req.params.id) {
            throw "No file-Id given to Delete!";
        }

        const receipt: any = await receiptService.getReceiptByID(req.params.id);

        if (!receipt) {
            throw "Receipt with given Id does not exist"
        }


        const response = await receiptService.deleteFileFromReceipt(receipt.fileName);
        const response2 = await receiptService.deleteReceipt(req.params.id);


        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const deleteReceiptFile = async (req: Request, res: Response) => {
    try {

        if (!req.params.fileName) {
            throw "No file given to Delete!";
        }

        const response = await receiptService.deleteFileFromReceipt(req.params.fileName);
        const response2 = await receiptService.deleteFileFromS3Bucket(req.params.fileName);

        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
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

