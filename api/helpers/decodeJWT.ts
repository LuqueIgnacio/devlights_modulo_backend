import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
import dotenv from "dotenv";

dotenv.config()

export default function decodeJWT(token: string | string[]){
    try{
        return verify(token as string, process.env.JWT_SECRET!)
    }catch(error){
        throw Error((error as Error).message)
    }
}