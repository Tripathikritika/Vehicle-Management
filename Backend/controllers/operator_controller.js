const bcrypt = require('bcryptjs')
const Operators = require('../models/Operators')
const jwt = require('jsonwebtoken')
const { registerValidation , LoginValidation} = require("../validation")

const Registration = async( req, res) => {
    // console.log(req.body)
    const { error } = registerValidation(req.body)
    if(error) {
         return res.status(400).send(error.details[0].message)
    }
    const email = await Operators.findOne( {email : req.body.email })
    if( email ) {
        return res.status(400).send("The Email Id is already registered.")
    }
    
    const phoneNumber = await Operators.findOne({phoneNumber:req.body.phoneNumber})
    if( phoneNumber ) {
        return res.status(400).send("The mobile number is already registered")
    }

    const hashedPassword = await bcrypt.hash(
        req.body.password ,
        await bcrypt.genSalt(10)
    )
    const new_operators = new Operators({
        firstName : req.body.fName,
        lastName : req.body.lName,
        phoneNumber : req.body.mobile,
        email : req.body.email,
        password : hashedPassword
    })
    
    try { 
        await new_operators.save()
        res.send("Registration Successfull!")
    }
    catch(err) {
        res.status(400).send(err)
    }
}

const Login = async( req, res ) => {
    const { error } = LoginValidation(req.body)
    
    if( error ) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await Operators.findOne ( {email : req.body.email})
    if( !user ) {
        return res.status(400).send("Email is wrong!!")
    }

    const validPassword = await bcrypt.compare(req.body.password , user.password)
    if( !validPassword){
        return res.status(400).send('Invalid Password!!')
    }
    res.send('Logged In')

}
module.exports = { Registration , Login }