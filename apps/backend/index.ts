import express from "express"

const app = express()

app.use(express.json())

app.post("/signup", async (req, res)=>{
    const {username , password} = req.body
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
