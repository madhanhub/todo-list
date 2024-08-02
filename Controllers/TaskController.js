const todoTask=require('../Schema/Todo_task')
class TaskController{
        static async User_Task(
            u_id
        ){
            const user_task=await new todoTask({
                u_id
            }).save()
            return user_task
        }
}   
module.exports=TaskController