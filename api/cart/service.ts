import productService from "../product/service";
import orderHistoryService from "../orderHistory/service";
import cartDao from "./dao";
import { ICart } from "./types";

class CartService{
    async addCart(userId: string, cart: ICart){
        try {
            cart.user_id = userId
            const newCart = await cartDao.addCart(cart)
            return newCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async updateCart(userId: string, cart: ICart){
        try {
            cart.user_id = userId
            const newCart = await cartDao.updateCart(cart)
            return newCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async deleteCart(userId: string){
        try {
            const deletedCart = await cartDao.deleteCart(userId)
            return deletedCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }
    async getUserCart(userId: string){
        //Buscar un carrito con la id del usuario y campo expires_at mayor a la fecha actual
        try{
            const currentCart = await cartDao.getUserCart(userId)
            return currentCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

}

const cartService = new CartService()
export default cartService