const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')


app.use(express.json())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));

const User=require('./Schema/Todo_User')
const Task=require('./Schema/Todo_task')

app.listen(9876,()=>{
    console.log('server run');

    mongoose.connect('mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/')
    .then(()=>{
        conn=mongoose.connection
        console.log('db connected');
    })
    .catch((error)=>{
        console.log('db not connected',error);
    })
})

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/user',async(req,res)=>{
    try{
        const{user_name,password}=req.body
        const existing_user=await User.findOne({user_name})
        if(existing_user){
           return res.status(400).json({message:'user already exist'})
        }
        const User_register=new User({
            user_name,password
        }).save()
        res.status(200).json({message:'user register successfully',data:User_register})
    }catch(error){
        res.status(500).json({message:'user registration failed'})
    }
})

app.post('/sign/up',async(req,res)=>{
    try{
        var signUp=await User.findOne({
            user_name:req.body.user_name,
            password:req.body.password
        })
        res.status(200).json({message:'signup successfully',data:signUp})
    }catch(error){
        res.status(500).json({message:'sign up failed',error})
    }
})

app.post('/user/delete',async(req,res)=>{
    try{
        const user_delete=await User.findOneAndDelete({_id:req.body._id})
        res.status(200).json({message:'deleted successfully',data:user_delete})
    }catch(error){
        res.status(500).json({message:'delete failed'})
    }
})

app.post('/Task',async(req,res)=>{
    try{
        const{u_id,lable,describtion}=req.body
        const task=new Task({
            u_id,lable,describtion
        }).save()
        res.status(200).json({message:'Task ToDo',data:task})
    }catch(error){
        res.status(500).json({message:'Task not placed'})
    }
})

app.post('/task/add',async(req,res)=>{
    try{
        const{_id,label,describtion,task_completion_date}=req.body
        
        const task_added=await Task.findOneAndUpdate({_id},
            {$push:{task:{
                    label,describtion,task_completion_date
            }}})
            res.status(200).json({message:'task added',data:task_added})
    }catch(error){
        res.status(500).json({message:'task not added'})
    }
})

app.post('/task/complete',async(req,res)=>{
    try{
        const {_id,label}=req.body
        const task_complete=await Task.findOneAndUpdate({_id,'task.label':label},
            {$set:{'task.$.iscomplete':'complete'}},
            {new:true})
            res.status(200).json({message:'task completed',data:task_complete})
    }catch(error){
        res.sendStatus(500).json({message:'task incomplete'})
    }
})

app.post('/task/update',async(req,res)=>{
    try{
        const{_id,label,describtion,task_completion_date}=req.body
        const task_update=await Task.findOneAndUpdate({_id,'task.label':label},
        {$set:{
            'task.$.label':label,
            'task.$.describtion':describtion,
            'task.$.task_complete_date':task_completion_date,
        }},
        {new:true})
        res.status(200).json({message:'Task Updated',data:task_update})
    }catch(error){
        res.status(500).json({message:'updation failed'})
    }
})