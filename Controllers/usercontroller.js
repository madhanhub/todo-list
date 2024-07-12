const User=require('../Schema/Todo_User')
const validation=require('../validation')
class UserController{
    static async User_register(
        user_name,password
    ){
        const user_register=await new User({
            user_name,password
        }).save()
        return user_register
    }
    
    static async User_signip({user_name,password})
    {
        const signup=await User.findOne({
        user_name,password
    })
    return signup
}
}
module.exports=UserController