import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {

    const token: string = req.headers.authorization!.split(' ')[1];
    console.log(token);
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("Invalid Token");
    }

}
