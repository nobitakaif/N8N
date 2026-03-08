import express from "express"
import { ExecutionModel, NodeModel, UserModel, WorkflowModel } from "@repo/db"
import mongoose, { Types } from "mongoose"
import { SignupSchema, SigninSchema, CreateWorkflowSchema, UpdateWorkflowSchema } from "@repo/common/type"
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware"

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
    const {success, data, error} = SigninSchema.safeParse(req.body)
    if(!success){
        res.status(400).json({
            msg : "failed input validation!",
            error : error
        })
        return 
    }
    try{
        const isUser = await UserModel.findOne({
            email : data.email
        })
        if(!isUser?._id){
            res.status(400).json({
                msg : "incorrect email"
            })
            return 
        }
        const checkPassword = await Bun.password.verify(data.password, isUser.password)
        if(!checkPassword){
            res.status(400).json({
                msg : "incorrect password"
            })
            return 
        }
        
        const token = jwt.sign({
            id : isUser._id
        },process.env.JWT_SECRET!)
        
        res.status(200).json({
            id : isUser._id,
            token : token
        })
        return 
    }catch(e:any){
        res.status(500).json({
            msg : "something happen wrong",
            error : e.message
        })
        return 
    }
})

app.post("/workflow", authMiddleware, async(req,res)=>{
   const userId = req.userId!
   const {success, data, error} = CreateWorkflowSchema.safeParse(req.body)
   if(!success){
        res.status(401).json({
            msg : "failed input validation",
            error : error.message
        })
        return 
   }
   try{
        const workflow = await WorkflowModel.create({
            userId : new Types.ObjectId(userId),
            nodes : data.nodes,
            edges : data.edges
        })

        res.status(200).json({
            id : workflow._id
        })
        return 
        
   }catch(e:any){
        res.status(411).json({
            msg : "failed to create workflow",
            error : e.message
        })
        return 
   }
   
})

app.put("/workflow/:workflowId", authMiddleware, async (req, res)=>{
   const {success, data, error} = UpdateWorkflowSchema.safeParse(req.body) 

   if(!success){
        res.status(411).json({
            msg : "failed input validation ",
            error : error.message
        })
        return 
   }

   try{
        const updated = await WorkflowModel.findByIdAndUpdate(
            req.params.workflowId,
            data,
            {new: true}
        )

        console.log(updated)
        if(!updated){
            res.status(411).json({
                msg : "wrong workflowId, work not found"
            })
            return 
        }
        res.status(200).json({
            id : updated._id
        })
        return 
   }    
   catch(e){
        res.status(411).json({
            msg : "failed to updated workflow"
        })
   }
})

app.get("/workflow/:workflowId", authMiddleware, async(req,res)=>{
    const workflow = await WorkflowModel.findById(req.params.workflowId)
    if(!workflow || workflow.userId.toString()!==req.userId){
        res.status(411).json({
            msg : "workflow not found"
        })
        return 
    }
    res.status(200).json({
        workflow
    })
})

app.get("/workflow/executions/:workflowId", async (req, res)=>{
    const executions = await ExecutionModel.find({
        workflowId : req.params.workflowId
    })
    if(!executions){
        res.status(411).json({
            msg : "executions not found"
        })
        return 
    }
    res.status(200).json({
        exectutions : executions
    })
})

app.get("/workflows", authMiddleware,  async (req,res)=>{
    const workflows = await WorkflowModel.find({
        userId : req.userId
    })
    res.status(200).json(workflows)
})

app.get("/nodes", async (req,res)=>{
    const nodes = await NodeModel.find()
    res.json(nodes)
})

app.listen(8000, ()=>{
    console.log("server is running on port 8000")
})
