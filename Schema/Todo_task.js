const mongoose=require('mongoose')
const Task=new mongoose.Schema({
    u_id:{
        type:String
    },
    task:[{
        label:{type:String},
        describtion:{type:String},
        task_completion_date:{type:Date},
        create_date:{
            type:Date,
            default:Date.now},
        iscomplete:{
            type:String,
            default:'pending'
        }
    }]
})
module.exports=mongoose.model('Todo_task',Task)