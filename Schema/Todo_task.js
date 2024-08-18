const mongoose=require('mongoose')
const Task=new mongoose.Schema({
    uid:{
        type:String
    },
    label:{
        type:String
    },
    describtion:{
        type:String
    },
    start_date:{
        type:Date
    },
    end_date:{
        type:Date
    },
    create_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Todo_task',Task)