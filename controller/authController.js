const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const {verifyMail, forgotPasswordMail} = require('../utils/emailSender')
const bcrypt = require('bcrypt');


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

    // let existinguser = await User.findOne({email: email})

    //     if(existinguser){
    //         return res.json({
    //             success: false,
    //             message: 'User already exist'
    //         })
    //     }

    const hash = bcrypt.hashSync(password, 10);

    let user = await new User({
        email: email,
        password: hash,
        terms: terms
    })
    user.save()

    let token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET , {
        expiresIn: '1d'
    })

    verifyMail(email, token)

    res.json({
        success: true,
        message: 'Registration Successful. please check your email for verification',
        user
        
    })
    
}

const verifyEmailController = async (req, res)=>{
    const {token} = req.params

    jwt.verify(token, process.env.JWT_SECRET , async function(err, decoded) {
        if(err){
            return res.json({
                success: false,
                message: 'Invalid Token'
            })
        }

        userID = decoded.id
        let existingUser = await User.findOne({_id: userID})

        if(!existingUser){
            return res.json({
                success: false,
                message: 'Invalid Token'
            })
        }

        existingUser.isVerified = true
        existingUser.save()

        res.json({
            success: true,
            message: 'Email Verified'
        })
    });

}

const loginController = async (req,res)=>{
    const {email, password} = req.body

    if(!email || !password){
        return res.json({
            success: false,
            message: 'Please fill all the field'
        })
    }

    let existingUser = await User.findOne({email: email})

        if(!existingUser){
            return res.json({
                success: false,
                message: 'Invalid Credential'
            })
        }

        let pass = bcrypt.compareSync(password, existingUser.password);

        if(!pass){
            return res.json({
                success: false,
                message: 'Invalid Credential'
            })
        }
        
        res.json({
            success: true,
            message: 'Login Successfull'
        })

}

const forgotPasswordController = async (req,res)=>{
    const {email} = req.body

    if(!email){
        return res.json({
            success: false,
            message: 'Please fill email field'
        })
    }

    let existingUser = await User.findOne({email: email})

        if(!existingUser){
            return res.json({
                success: false,
                message: 'User Not Found'
            })
        }

    let token = jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role
    }, process.env.JWT_SECRET , {
        expiresIn: '1d'
    })
     
    forgotPasswordMail(email, token, existingUser.firstName ? existingUser.firstName : "user" )

    res.json({
        success: true,
        message: 'please check your email for reset password'
    })
}

const resetPasswordController = async (req,res)=>{
    const {newPassword, confirmPassword} = req.body
    const {token} = req.params

    jwt.verify(token, process.env.JWT_SECRET , async function(err, decoded) {
        if(err){
            return res.json({
                success: false,
                message: 'Invalid Token'
            })
        }

        userID = decoded.id
        let existingUser = await User.findOne({_id: userID})

        if(!existingUser){
            return res.json({
                success: false,
                message: 'Invalid Token'
            })
        }
        const hash = bcrypt.hashSync(newPassword, 10);
        existingUser.password = hash
        existingUser.save()

        res.json({
            success: true,
            message: 'Password Reset Successfull'
        })
    });
        
}

const reverificationController = async (req,res)=>{
    const {email} = req.body

    let existingUser = await User.findOne({email: email})

    if(!existingUser){
        return res.json({
            success: false,
            message: 'Invalid user'
        })
    }

    let token = jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role
    }, process.env.JWT_SECRET , {
        expiresIn: '1d'
    })

    verifyMail(email, token)

    res.json({
        success: true,
        message: 'Please check you email for verification'
    })
}

module.exports = {registrationController, verifyEmailController, loginController, forgotPasswordController, resetPasswordController, reverificationController}