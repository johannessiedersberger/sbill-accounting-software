import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { registerValidation, loginValidation } from '../validation.js';
import { sendEmail, randString } from '../utils/email.js';

export const signup = async (req, res) => {
    console.log(req.body);
    // validate the request data before we create a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user already exists in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Check if the two new passwords match
    const passwordMatch = req.body.password1 === req.body.password2;
    if (!passwordMatch) return res.status(400).send('Passwords do not match');

    // Check if the data protection rule has been accepted
    const dataProtectionAccepted = req.body.acceptDataProctection;
    if (!dataProtectionAccepted) return res.status(400).send('You have to accept the data protection rule');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password1, salt);

    // Create a new user
    const isValid = false;
    const uniqueString = randString();

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        isValid: isValid,
        uniqueString: uniqueString
    });

    // Save user to database and send a confirmation email
    try {

        var mailOptions = {
            from: process.env.DEFAULT_MAIL_SENDER,
            to: req.body.email,
            subject: 'Confirm your Email-Address',
            html: `Click <a href="${process.env.FRONTEND_URL}/account-activated/${uniqueString}">here</a> to activate your account.`
        };

        await sendEmail(mailOptions);


        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
}

export const verifyEmail = async (req, res) => {
    // Check if uniqueString is included
    if (req.params.uniqueString == undefined || req.params.uniqueString == ''
        || req.params.uniqueString == null) return res.status(400).send('No ID given');

    // getting the string
    const uniqueString = req.params.uniqueString;
    console.log(req.params);
    // Checking if the user with the uniqueId exists
    const user = await User.findOne({ uniqueString: uniqueString });
    if (!user) return res.status(400).send('Wrong ID');

    user.isValid = true;
    await user.save();

    res.send('User Registered Successfully');
}

export const signin = async (req, res) => {
    // Lets Validate the Data before we authenticate a user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is wrong');

    // Checking if the user is valid and verified his email address
    const emailVerified = user.isValid;
    if (!emailVerified) return res.status(400).send('User Email is not verified');

    // Checking if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Wrong Password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);


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