import AWS from 'aws-sdk';
import _ from 'lodash';
import { AnalyzeExpenseCommand } from "@aws-sdk/client-textract";
import { TextractClient } from "@aws-sdk/client-textract";
import dotenv from 'dotenv';
import Receipt from '../models/Receipt';
import Crypto from 'crypto';
dotenv.config();

interface IReceipt {
    receiptNumber: string,
    supplier: string,
    description: string,
    category: string,
    receiptAmount: number,
    fileName: string,
}

export const getAllReceipts = async () => {
    const allReceipts = await Receipt.find({});
    return allReceipts;
}

export const getReceiptByID = async (id: any) => {
    const receipt = await Receipt.findOne({ _id: id });
    return receipt;
}

export const getReceiptByFileName = async (fileName: string) => {
    const receipts = await Receipt.find({ fileName: fileName });
    return receipts;
}

export const createNewReceipt = async (receiptData: any) => {
    const newReceipt = new Receipt(receiptData);
    const newReceiptSaved = await newReceipt.save();
    return newReceiptSaved;

}

export const createUUIDForReceiptFile = () => {
    return Crypto.randomBytes(16).toString("hex");
}

export const deleteFileFromReceipt = async (fileName: string) => {
    const result = await Receipt.updateOne({ fileName: fileName }, { $set: { fileName: "" } });
    return result;
}

export const updateReceipt = async (id: string, data: IReceipt) => {
    const result = await Receipt.updateOne({ _id: id }, { $set: data });
    return result;
}

export const deleteFileFromS3Bucket = async (fileName: string) => {

    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    var s3 = new AWS.S3();

    var params = {
        Bucket: 'sbill-accounting-bucket',
        Key: fileName,
    };

    const result = await s3.deleteObject(params).promise();
    return result;
}

export const uploadFileToS3Bucket = async (data: any, name: string) => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    var s3 = new AWS.S3();


    var params = {
        Bucket: 'sbill-accounting-bucket',
        Key: name,
        Body: data,
        ContentType: "application/pdf"
    };

    s3.putObject(params, function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log("Successfully uploaded data to sbill-accounting-bucket " + data);
        }
    });
}

export const updateFileNameInReceipt = async (fileName: string, id: string) => {
    const result = await Receipt.updateOne({ _id: id }, { $set: { fileName: fileName } });
    return result;
}

export const getSignedUrlFromFileS3 = async (fileName: string) => {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    var s3 = new AWS.S3();

    var params = {
        Bucket: 'sbill-accounting-bucket',
        Key: fileName,
    };

    const result = await s3.getSignedUrlPromise('getObject', params);
    return result;


}

export const extractReceiptDataOCR = async (awsBuketFileName: string) => {

    console.log(awsBuketFileName);

    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    const textract = new AWS.Textract();
    const params = {

        Document: {
            S3Object: {
                Bucket: 'sbill-accounting-bucket',
                Name: awsBuketFileName //'file (29).pdf'
            },
        },

        FeatureTypes: ["FORMS"]
    };

    const textractClient = new TextractClient({ region: process.env.AWS_REGION });


    try {
        const aExpense: any = new AnalyzeExpenseCommand(params);
        const response: any = await textractClient.send(aExpense);
        //console.log(response)
        response.ExpenseDocuments.forEach((doc: any) => {
            doc.LineItemGroups.forEach((items: any) => {
                items.LineItems.forEach((fields: any) => {
                    fields.LineItemExpenseFields.forEach((expenseFields: any) => {
                        console.log(expenseFields)
                    });
                })
            })
        })
        return response; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }

};




