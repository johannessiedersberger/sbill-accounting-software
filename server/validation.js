// Validation
import Joi from 'joi';

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

// Register Validation 
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
