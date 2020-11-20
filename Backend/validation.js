const Joi = require('joi')

const registerValidation = ( data ) => {
    const schema = Joi.object({
        firstName : Joi.string().min(4).required(),
        lastName : Joi.string(),
        email : Joi.string().min(6).required().email(),
        phoneNumber : Joi.string().min(10).required(),
        password : Joi.string().min(5).required()
    })
    return schema.validate( data )
}

const LoginValidation  = ( data ) => {
    const schema = Joi.object({
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(5).required()
    })
    return schema.validate( data )
}

module.exports = { registerValidation , LoginValidation}