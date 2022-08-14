import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';
dotenv.config();





export const sendEmail = (mailOptions) => {

    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
        SES: new AWS.SES({
            apiVersion: '2010-12-01'
        })
    });

    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });
    });
}

export const randString = () => {
    // considering a 8 length string
    const len = 30;
    let randStr = '';
    for (let i = 0; i < len; i++) {
        //ch= a number between 1 to 10
        const ch = Math.floor(Math.floor(Math.random() * 10) + 1);
        randStr += ch;
    }
    return randStr;
}
