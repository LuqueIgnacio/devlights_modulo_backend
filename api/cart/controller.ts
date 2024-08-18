import cartService from "./service";
import { Request, Response } from "express";

class CartController{
    async addProduct(req: Request, res: Response){
        //Obtener el id del usuario y pasarlo al service
        try {
            const {productId} = req.body
            if(!productId){
                return res.status(404).json({})
            }
            const cart = await cartService.addProducts("66bf6c199d95b5799fd5d6e0", productId)
            return res.status(200).json(cart)
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const cartController = new CartController()
export default cartController