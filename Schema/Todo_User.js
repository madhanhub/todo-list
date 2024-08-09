const mongoose=require('mongoose')
const validator=require('../validation')
const user=  mongoose.Schema({
    user_name:{
        type:String
    },
    password:{
        type:String,
        // validate: {
        //       validator: validator.validatePassword,
        //       message: 'Password alteast have one uppercase',
        //     },
    },
    email:{
        type:String,
        // validate:{
        //     validator:validator.validateEmail,
        //     message:'email not validate'
        // }
    },
    mobile_no:{
        type:Number,
        // validate:{
        //     validator:validator.validaeMobile_no,
        //     message:'mobile number not valid'
        // }
    }
})
module.exports=mongoose.model('Todo_User',user)