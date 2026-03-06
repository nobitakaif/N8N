import express from "express"
import { UserModel } from "@repo/db"
import mongoose from "mongoose"
import { SignupSchema, SigninSchema } from "@repo/common/type"

mongoose.connect(process.env.MONGO_URL!).then(r =>{
    console.log("db is connected")
}).catch(e =>{
    console.log("db is not connected!!")
})

const app = express()

app.use(express.json())

app.post("/signup", async (req, res)=>{
    const {success, data, error} = SignupSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({
            msg : error.message
        })
        return 
    }
    
    try{
        const user = await UserModel.create({
            email : data.email,
            password : await Bun.password.hash(data.password,{algorithm : "bcrypt", cost : 6})
        })
        res.status(200).json({
            id : user._id
        })
        return 
    }catch(e){
        res.status(403).json({
            msg : "email is already taken"
        })
    }
})

app.post("/signin", async (req, res)=>{
    const {username , password} = req.body
})

app.get("/workflow/:workflowId", async (req, res)=>{
    const {username , password} = req.body
})

app.get("/workflow/executions/:workflowId", async (req, res)=>{
    const {username , password} = req.body
})

app.post("/credetials", (req,res)=>{

})

app.get("/credetials", (req,res)=>{

})

app.listen(8000, ()=>{
    console.log("server is running on port 8000")
})
