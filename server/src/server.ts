import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';


dotenv.config();

const app: Application = express();

app.set('port', process.env.PORT || 5000);
console.log("++++++++++++++++" + app.get('port'));

app.use((express.json({ limit: "30mb" })));
app.use((express.urlencoded({ limit: "30mb", extended: true })));
app.use((cors()));

const dbConnection: string = process.env.DB_CONNECTION!;
// Connect to DB
mongoose.connect(dbConnection).then(
    () => { console.log("Connected to MongoDB Successfully") },
    err => { console.log(err) }
);

import userRouter from './routes/users';
import invoiceRouter from './routes/invoice';
import customerRouter from './routes/customer';
import companyRouter from './routes/company';

app.use('/api/users', userRouter);
app.use('/api/invoices', invoiceRouter);
app.use('/api/customers', customerRouter);
app.use('/api/company', companyRouter);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});



