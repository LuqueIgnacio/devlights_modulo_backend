import decodeJWT from "../helpers/decodeJWT";
import cartService from "./service";
import { Request, Response } from "express";

class CartController{
    async addProduct(req: Request, res: Response){
        const {authtoken} = req.headers
        if(!authtoken) return res.status(401)
        const {userId} = decodeJWT(authtoken) 
        try {
            const {productId} = req.body
            if(!productId){
                return res.status(404).json({})
            }
            const cart = await cartService.addProducts(userId, productId)
            return res.status(200).json(cart)
        }catch(error){
            return res.status(500).json()
        }
    }

    async buyCart(req: Request, res: Response){
        const {authtoken} = req.headers
        if(!authtoken) return res.status(401)
        const {userId} = decodeJWT(authtoken) 
        try{
            const orderHistory = await cartService.buyCart(userId)
            return res.status(200).json(orderHistory)
        }catch(error){
            return res.status(500).json()
        }
    }
}

const cartController = new CartController()
export default cartController