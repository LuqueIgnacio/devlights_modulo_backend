import OrderHistory from "./model";
import { ISearchParams } from "./types";

class OrderHistoryDao{
    private limit = 10

    private async createOrderHistory(userId: string, cartId: string){
        try{
            const newOrderHistory = await OrderHistory.create({user_id: userId, carts: [{cart: cartId}]})
            return newOrderHistory
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async addNewOrder(userId: string, cartId: string){
        try{
            const orderHistory = await OrderHistory.findOne({user_id: userId})
            if(orderHistory){
                orderHistory.carts.push({cart: cartId})
                orderHistory.save()
                return orderHistory
            }
            return await this.createOrderHistory(userId, cartId)
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getOrdersHistory(filters: ISearchParams){
        const {user_id} = filters
        let page = Number(filters.page)
        if(!page) page = 1
        try{
            const orders = await OrderHistory.find({
                ...(user_id? {user_id} : {})
            })
            .limit(this.limit)
            .skip((page-1)*this.limit)
            
            return orders
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const orderHistoryDao = new OrderHistoryDao()
export default orderHistoryDao