import decodeJWT from "../helpers/decodeJWT";
import cartService from "./service";
import { Request, Response } from "express";

class CartController{

    async getCart(req: Request, res: Response){
        const {userId} = res.locals.user
        try {
            const cart = await cartService.getUserCart(userId)
            return res.status(200).json(cart)
        }catch(error){
            return res.status(500).json()
        }
    }

    async addCart(req: Request, res: Response){
        const {userId} = res.locals.user
        try {
            const cart = await cartService.addCart(userId, req.body)
            return res.status(200).json(cart)
        }catch(error){
            return res.status(500).json()
        }
    }

    async updateCart(req: Request, res: Response){
        const {userId} = res.locals.user
        try {
            const cart = await cartService.updateCart(userId, req.body)
            return res.status(200).json(cart)
        }catch(error){
            return res.status(500).json()
        }
    }

    async deleteCart(req: Request, res: Response){
        const {userId} = res.locals.user
        try {
            const cart = await cartService.deleteCart(userId)
            return res.status(200).json(cart)
        }catch(error){
            return res.status(500).json()
        }
    }

}

const cartController = new CartController()
export default cartController