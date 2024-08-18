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

    async getCurrentCart(user_id: string){
        try {
            const cart = Cart.findOne({
                user_id: user_id,
                expires_at: {$gt: new Date()}
            })
            return cart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async createCart(cart: ICart){
        try {
            const newCart = await Cart.create(cart)
            return newCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async updateProducts(cart: ICart){
        try {
            const updatedCart = await Cart.findOneAndUpdate({_id: cart._id}, {products: cart.products, total_price: cart.total_price}, {new: true})
            return updatedCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const cartDao = new CartDao()
export default cartDao