const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const http=require('http')
const dotenv=require('dotenv').config()
const jsonwebtoken=require('jsonwebtoken')
const bodyparser=require('body-parser')

const User=require('./Schema/Todo_User')
const Task=require('./Schema/Todo_task')

const authorization=require('./function/auth')
const cors=require('./function/cors')


app.use(express.json())
app.use(morgan('dev'))
app.use(cors)
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))

const user_task_controller=require('./Controllers/TaskController')
const user_controller=require('./Controllers/usercontroller')

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

app.get('/',async(req,res)=>{
    res.send('ok')
})

app.post('/user',async(req,res)=>{
    try{
        const{user_name,password,mobile_no,email}=req.body
        const existing_user=await User.findOne({email})
        if(existing_user){
               return res.status(409).json({message:'user already exist'})
        }
        const user_reg=new User({
            user_name,password,mobile_no,email
        }).save()
        res.status(200).json({message:'success',data:user_reg})
    }catch(error){
        res.status(500).json({message:'user registration failed'})
    }
})

app.post('/user/sign_in',async(req,res)=>{
        try{
            const{email,password}=req.body
            const user=await User.findOne({email,password})
            
            if(user){
                {
                    var token=await jsonwebtoken.sign({id:user.id,user_name:user.user_name},process.env.SECRET)
                    res.setHeader('token',token)
                    res.setHeader('id',user.id)
                    res.setHeader('user_name',user.user_name)
                    res.status(200).json({message:'success',data:token})   
                    console.log(token);
                        
                }
            }
            
        }catch(error){
            res.status(500).json({message:'failed'})
        }

})

app.post('/Task',async(req,res)=>{
    try{
        const{label,describtion,start_date,end_date}=req.body
        uid=req.id
        const task=new Task({uid,label,describtion,start_date,end_date}).save()
        res.status(200).json({message:'success',data:task})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/task/update',authorization,async(req,res)=>{
    try{
        const{label,describtion,start_date,end_date}=req.body
        uid=req.id
        const task_update=await Task.findOneAndUpdate({uid,label},
            {$set:{
                label,describtion,start_date,end_date
            }})
            res.status(200).json({message:'success',data:task_update})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/task/delete',authorization,async(req,res)=>{ 
    try{    
        
        uid=req.id
        const task_delete=await Task.findOneAndDelete({uid})
            res.status(200).json({message:'success',data:task_delete})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})


