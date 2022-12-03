import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail, randString } from '../utils/email.js';
import Joi from 'joi';

export const getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

export const getUserByUniqueString = async (uniqueString) => {
    return await User.findOne({ uniqueString: uniqueString })
}

export const doPasswordsMatch = (password1, password2) => {
    return password1 === password2;
}

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Register Validation 
export const registerValidation = (data) => {
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

export const loginValidation = (data) => {
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

export const createNewUser = async (data) => {
    // Create a new user

    const user = new User(data);

    const savedUser = await user.save();
    return savedUser;
}

export const sendConfirmationEmail = async (email, uniqueString) => {
    var mailOptions = {
        from: process.env.DEFAULT_MAIL_SENDER,
        to: email,
        subject: 'Confirm your Email-Address',
        html: `Click <a href="${process.env.FRONTEND_URL}/account-activated/${uniqueString}">here</a> to activate your account.`
    };

    await sendEmail(mailOptions);
}

export const setUserValid = async (user) => {
    user.isValid = true;
    await user.save();
}

export const validatePasswordHash = (actualPassword, hasheduserPassword) => {
    const validPass = bcrypt.compare(actualPassword, hasheduserPassword);
    return validPass;
}

export const createJWToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET)
}



