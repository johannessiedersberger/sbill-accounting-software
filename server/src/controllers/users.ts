import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import * as emailService from '../utils/email';
import * as userService from '../services/users';
import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
    // validate the request data before we create a user
    const { error } = userService.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user already exists in the database
    const emailExists = await userService.getUserByEmail(req.body.email);
    if (emailExists) return res.status(400).send('Email already exists');

    // Check if the two new passwords match
    const passwordMatch = userService.doPasswordsMatch(req.body.password1, req.body.password2);
    if (!passwordMatch) return res.status(400).send('Passwords do not match');

    // Check if the data protection rule has been accepted
    const dataProtectionAccepted = req.body.acceptDataProctection;
    if (!dataProtectionAccepted) return res.status(400).send('You have to accept the data protection rule');

    try {
        // hash password
        const hashedPassword = await userService.hashPassword(req.body.password1);
        const isValid = false;
        const uniqueString = emailService.randString();

        const savedUser = await userService.createNewUser({
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            isValid: isValid,
            uniqueString: uniqueString
        });

        await userService.sendConfirmationEmail(req.body.email, uniqueString);

        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    // Check if uniqueString is included
    if (req.params.uniqueString == undefined || req.params.uniqueString == ''
        || req.params.uniqueString == null) return res.status(400).send('No ID given');

    // getting the string
    const uniqueString = req.params.uniqueString;
    // Checking if the user with the uniqueId exists
    const user = await userService.getUserByUniqueString(uniqueString);
    if (!user) return res.status(400).send('Wrong ID');

    await userService.setUserValid(user);

    res.send('User Registered Successfully');
}

export const signin = async (req: Request, res: Response) => {
    // Lets Validate the Data before we authenticate a user
    const { error } = userService.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the email exists
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) return res.status(400).send('Email is wrong');

    // Checking if the user is valid and verified his email address
    const emailVerified = user.isValid;
    if (!emailVerified) return res.status(400).send('User Email is not verified');

    // Checking if the password is correct
    const validPass = userService.validatePasswordHash(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Wrong Password');

    // Create and assign a token
    const token = userService.createJWToken(user._id);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        token: token,
        user: {
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            isAdmin: user.admin
        }
    });
}