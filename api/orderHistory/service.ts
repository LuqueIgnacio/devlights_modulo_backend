import orderHistoryDao from "./dao";
import { IOrder, ISearchParams } from "./types";
import productService from "../product/service"

class OrderHistoryService{
    async addNewOrder(order: IOrder, userId: string){
        //De esta forma cada iteración del forEach se ejecuta de manera asíncrona, pasando directamente a la siguiente instrucción,
        //por eso obtenemos una respuesta más rápida
        /*order.products.forEach(async p => {
            const product = await productService.getProductById(p.product_id)
            await productService.editProduct(p.product_id, {stock: product!.stock - p.quantity})
            console.log(product)
        })
        console.log("editado")
        return "hola"
        */
       //De esta otra forma cada iteración se ejecuta de manera sincronica, por lo que hasta no terminar el for no pasamos a la siguiente instrucción,
       //lo que hace que este método tarde más
        /*for(const p of order.products){
            const product = await productService.getProductById(p.product_id)
            await productService.editProduct(p.product_id, {stock: product!.stock - p.quantity})
            console.log(product)
        }
        console.log("editado")
        return "hola"
        */
        //Este fue el metodo que elegi, solo hace dos peticiones a la bd, los demás hacen dos peticiones por cada producto en la orden,
        //uno para traer el producto y otro para actualizar el stock.
        //Este método trae todos los productos juntos utilizando el operador $in en la consulta.
        //Luego actualiza los productos utilizando bulkWrite.
        //Un paso extra en este método fue ordenar los productos provenientes de la orden según su id, esto se hace para que los productos
        //de la orden y los productos que traemos de la bd se encuentren en los mismos indices, haciendo más fácil su manipulacion
        try{
            order.products = order.products.sort( (a, b) => {
                return a.product_id.localeCompare(b.product_id)
            })
            const productsIds = order.products.map(p => p.product_id)
            const products = await productService.getProductsByIds(productsIds)
            const productsToEdit = order.products.map((p, index) => {
                return({
                    stock: products[index].stock - p.quantity 
                })
            })
            await productService.editProducts(productsIds, productsToEdit)
            const newOrder = await orderHistoryDao.addNewOrder(order, userId)
            return newOrder
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getOrdersHistory(filters: ISearchParams){
        try{
            const orders = await orderHistoryDao.getOrdersHistory(filters)
            return orders
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const orderHistoryService = new OrderHistoryService()
export default orderHistoryService