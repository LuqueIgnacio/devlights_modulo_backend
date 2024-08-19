import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
import dotenv from "dotenv";
import { IUserJWT } from "../../types";

dotenv.config()

export default function decodeJWT(token: string | string[]){
    try{
        const userJWT = (verify(token as string, process.env.JWT_SECRET!) as IUserJWT)
        return userJWT
    }catch(error){
        throw Error((error as Error).message)
    }
}