import { Request, Response, NextFunction } from "express";
import decodeJWT from "../helpers/decodeJWT";
import { IUserJWT } from "../../types";

export default function isAuthenticated(req: Request, res: Response, next: NextFunction){
    try{
        const {authtoken} = req.headers
        if(!authtoken) return res.status(401).json()
        const user = decodeJWT(authtoken) as IUserJWT
        res.locals.user = user
        next()
    }catch(error){
        return res.status(500).json(error)
    }
}