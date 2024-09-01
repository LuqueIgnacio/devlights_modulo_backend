import OrderHistory from "./model";
import { IOrder, ISearchParams } from "./types";

class OrderHistoryDao{
    private limit = 10

    async addNewOrder(order: IOrder, userId: string){
        try{
            const orderHistory = await OrderHistory.create({...order, user_id: userId})
            return orderHistory
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