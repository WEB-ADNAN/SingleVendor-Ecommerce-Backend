const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    firstName:{
        type: String,
        trim: true
    },
    lastName:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true
    },
    password:{
        type: String
    },
    phoneNumber:{
        type: String
    },

    //billing address
    billingAddress:{
        firstName:{
            type: String,
            trim: true
        },
        lastName:{
            type: String,
            trim: true
        },
        email:{
            type: String,
            trim: true
        },
        companyName:{
            type: String,
        },
        street:{
            type: String,
            trim: true
        },
        country:{
            type: String,
            trim: true
        },
        state:{
            type: String,
            trim: true
        },
        zipCode:{
            type: String,
            trim: true
        },
    },

    rele:{
        type: String,
        enum: ['user', 'admin', 'editor'],
        default: 'user'
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        enum: ['approved', 'restricted', 'blocked'],
        default: 'approved'
    }
})

module.exports = mongoose.model('User', userSchema)