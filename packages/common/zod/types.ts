
import { z }  from "zod"


export const SignupSchema = z.object({
    email : z.email(),
    password : z.string().min(8, {message : "password is too short"}).max(40, {message : "password is too long"})
})

export const SigninSchema = z.object({
    email : z.email(),
    password : z.string().min(8, {message : "password is too short"}).max(40, {message : "password is too long"})
})

export const CreateWorkflowSchema = z.object({
    nodes : z.array(z.object({
        nodeId : z.string(),
        data : z.object({
            kind : z.enum(["ACTION","TRIGGER"]),
            metadata : z.any()
        }),

        id : z.string(),
        position : z.object({
            x : z.number(),
            y : z.number()
        })
    })),
    edges : z.array(z.object({
        id : z.string(),
        source : z.string(),
        target : z.string()
    }))
})


export const UpdateWorkflowSchema = z.object({
    nodes : z.array(z.object({
        id : z.string(),
        position : z.object({
            x : z.number(),
            y : z.number()
        })
    })),
    edges : z.array(z.object({
        id : z.string(),
        source : z.object(),
        target : z.string()
    }))
})
