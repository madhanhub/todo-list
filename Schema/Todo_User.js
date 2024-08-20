const mongoose=require('mongoose')
const validator=require('../validation');
const user=  mongoose.Schema({
    user_name:{
        type:String,
        // validate: {
        //   validator: validator.validateName,
        //   message: ' user name.',
        // },
    },
    password:{
        type:String,
        // validate: {
        //       validator: validator.validatePassword,
        //       message: 'Invalid password.',
        //     },
    },
    email:{
        type:String,
      //   validate: {
      //   validator: validator.validateEmail,
      //   message: 'Invalid email.',
      // },
    },
    mobile_no:{
        type:Number,
        // validate: {
        //   validator: validator.validateMobile,
        //   message: 'Invalid mobile.',
        // },
    },
  
})
module.exports=mongoose.model('Todo_User',user)