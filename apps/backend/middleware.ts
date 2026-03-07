import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function authMiddleware(req:Request, res:Response, next : NextFunction){
    const token = req.headers["authorization"]

    console.log(token)
    
    if(!token){
        res.status(403).json({
            msg : "token is not present"
        })
        return 
    }

    try{
        const isAuthorized = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        console.log(isAuthorized)
        if(!isAuthorized){
            res.status(402).json({
                msg : "token incorrect"
            })
            return
        }
        
        req.userId = isAuthorized.id 
        next()
    }catch(e){
        res.status(403).json({
            msg : "token is incorrect"
        })
    }
}