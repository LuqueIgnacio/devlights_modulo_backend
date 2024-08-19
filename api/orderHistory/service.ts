import orderHistoryDao from "./dao";
import { ISearchParams } from "./types";

class OrderHistoryService{
    async addNewOrder(userId: string, cartId: string){
        try{
            const newOrder = await orderHistoryDao.addNewOrder(userId, cartId)
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