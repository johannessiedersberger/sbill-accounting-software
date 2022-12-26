import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail, randString } from '../utils/email';
import Joi from 'joi';
import { Mongoose, ObjectId, Types } from 'mongoose';

export const getUserByEmail = async (email: string) => {
    return await User.findOne({ email: email });
}

export const getUserByUniqueString = async (uniqueString: string) => {
    return await User.findOne({ uniqueString: uniqueString })
}

export const doPasswordsMatch = (password1: string, password2: string) => {
    return password1 === password2;
}

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Register Validation 
export const registerValidation = (data: any) => {
    const schema = Joi.object({
        firstname: Joi.string()
            .min(1)
            .required(),
        lastname: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .min(1)
            .required()
            .email(),
        password1: Joi.string()
            .min(1)
            .required(),
        password2: Joi.string()
            .min(1)
            .required(),
        acceptDataProctection: Joi.boolean()

    });
    return schema.validate(data);

}

export const loginValidation = (data: any) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(1)
            .required()
            .email(),
        password: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data);
}

interface NewUserParams {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    isValid: boolean,
    uniqueString: string
}

export const createNewUser = async (data: NewUserParams) => {
    // Create a new user

    const user = new User(data);

    const savedUser = await user.save();
    return savedUser;
}

export const sendConfirmationEmail = async (email: string, uniqueString: string) => {
    var mailOptions = {
        from: process.env.DEFAULT_MAIL_SENDER!,
        to: email,
        subject: 'Confirm your Email-Address',
        html: `Click <a href="${process.env.FRONTEND_URL}/account-activated/${uniqueString}">here</a> to activate your account.`
    };

    await sendEmail(mailOptions);
}

export const setUserValid = async (user: any) => {
    user.isValid = true;
    await user.save();
}

export const validatePasswordHash = (actualPassword: string, hasheduserPassword: string) => {
    const validPass = bcrypt.compare(actualPassword, hasheduserPassword);
    return validPass;
}

export const createJWToken = (userId: Types.ObjectId) => {
    return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET!)
}



