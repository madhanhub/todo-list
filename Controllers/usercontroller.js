const User=require('../Schema/Todo_User')
class User_Controller{
        static async User_Register(
            {user_name,password,email,mobile_no}
        ){
            const user_reg=await new User({
                user_name,password,email,mobile_no
            })
            await user_reg.save()
            return user_reg
        }
        static async User_signin({
            email,password
        }){
            const user_signin=await User.findOne({
                email,password
            })
            return user_signin
        }

}
module.exports=User_Controller