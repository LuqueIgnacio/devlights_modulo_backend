import OrderHistory from "./model";

class OrderHistoryDao{
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
}

const orderHistoryDao = new OrderHistoryDao()
export default orderHistoryDao