import productService from "../product/service";
import cartDao from "./dao";
import { ICart } from "./type";
import { Types } from "mongoose";
class CartService{
    async addProducts(userId: string, productId: string){
        try {
            // Solo se puede agregar un producto de uno en uno
            //Si se agrega un producto ya existente se incrementa la cantidad
            //Traemos de la bd el producto
            const product = await productService.getProductById(productId)
            //Verificamos si ya existe un carrito cuyo campo expire_at sea mayor a la fecha actual
            const currentCart = await this.getCurrentCart(userId)
            //Si existe, actualizar el documento aumentando la cantidad del producto
            if(currentCart){
                const productIndex = currentCart.products.findIndex(p => p.product_id.toString() === productId)
                if(productIndex === -1){
                    currentCart.products.push({
                        product_id: product!._id,
                        quantity: 1
                    })
                }else{
                    currentCart.products[productIndex].quantity++
                }
                currentCart.total_price+= product!.price

                return await cartDao.updateProducts(currentCart)
            }
            //Si no existe, crear el carrito
            const newCart: ICart = {
                products: [{product_id: product!._id, quantity: 1}],
                total_price: product!.price,
                user_id: new Types.ObjectId(userId)
            }
            return await this.createCart(newCart)

        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getCurrentCart(userId: string){
        //Buscar un carrito con la id del usuario y campo expires_at mayor a la fecha actual
        try{
            const currentCart = await cartDao.getCurrentCart(userId)
            return currentCart
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async createCart(cart: ICart){
        try {
            const newCart = await cartDao.createCart(cart)
            return cart
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const cartService = new CartService()
export default cartService