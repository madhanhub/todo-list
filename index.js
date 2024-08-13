const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const http=require('http')
const cors=require('cors')
const bodyparser=require('body-parser')



app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))



const User=require('./Schema/Todo_User')
const Task=require('./Schema/Todo_task')

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
        const user_signin=await User.findOne({
            email:req.body.email,password:req.body.password
        })
        console.log(user_signin)
        res.status(200).json({message:'success',data:user_signin})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})


