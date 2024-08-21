import { ObjectId } from "mongoose";
import Cart from "./model";
import { ICart, ICartProduct, ISearchParams } from "./type";

class CartDao{
    async getCarts(limit: number, filters: ISearchParams){
        const {user_id, created_at, expires_at, page} = filters
        try {
            const carts = Cart.find({
                ...(user_id ? {user_id} : {}),
                ...(expires_at ? {} : {}),
            })
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getUserCart(user_id: string){
        try {
            const cart = await Cart.findOne({
                user_id: user_id,
            })
            return cart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async addCart(cart: ICart){
        try {
            const newCart = await Cart.create(cart)
            return newCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async updateCart(cart: ICart){
        try {
            const updatedCart = await Cart.findOneAndUpdate({user_id: cart.user_id}, cart, {new: true})
            return updatedCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async deleteCart(userId: string){
        try {
            const deletedCart = await Cart.findOneAndDelete({user_id: userId})
            return deletedCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const cartDao = new CartDao()
export default cartDao