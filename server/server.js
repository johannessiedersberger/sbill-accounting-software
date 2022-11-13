import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();

app.set('port', process.env.PORT || 5000);
console.log("++++++++++++++++" + app.get('port'));

app.use((express.json({ limit: "30mb", extended: true })));
app.use((express.urlencoded({ limit: "30mb", extended: true })));
app.use((cors()));

const dbConnection = process.env.DB_CONNECTION;
// Connect to DB
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, }).then(
    () => { console.log("Connected to MongoDB Successfully") },
    err => { console.log(err) }
);

import userRouter from './routes/users.js';

app.use('/api/users', userRouter);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});



