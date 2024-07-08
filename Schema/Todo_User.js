const mongoose=require('mongoose')
const validator=require('../validation')
const user=  mongoose.Schema({
    user_name:{
        type:String
    },
    password:{
        type:String,
        validate: {
              validator: validator.validatePassword,
              message: 'Password alteast have one uppercase',
            },
    },
})
module.exports=mongoose.model('Todo_User',user)