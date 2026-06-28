const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const {verifyMail} = require('../utils/emailSender')


const registrationController = async (req,res)=>{
    const {email, password, confirmPassword, terms} = req.body

    if(!email || !password || !confirmPassword){
        return res.json({
            success: false,
            message: 'Please fill all the field'
        })
    }
    if(!terms){
        return res.json({
            success: false,
            message: 'please accept terms and conditions'
        })
    }

    if(password !== confirmPassword){
        return res.json({
            success: false,
            message: 'Password Not Matched'
        })
    }

    let existingUser = await new User({
        email: email,
        password: password,
        terms: terms
    })
    existingUser.save()

    let token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, 'abcdefg', {
        expiresIn: '1d'
    })

    verifyMail(email, token)

    res.json({
        success: true,
        message: 'Registration Successful. please check your email for verification'
    })
    
}
module.exports = registrationController