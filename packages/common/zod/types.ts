
import { z }  from "zod"


export const SignupSchema = z.object({
    email : z.email(),
    password : z.string().min(8, {message : "password is too short"}).max(40, {message : "password is too long"})
})

export const SigninSchema = z.object({
    email : z.email(),
    password : z.string().min(8, {message : "password is too short"}).max(40, {message : "password is too long"})
})

export const NodeWorkflowSchema = z.object({
    
})

