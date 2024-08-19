import orderHistoryDao from "./dao";

class OrderHistoryService{
    async addNewOrder(userId: string, cartId: string){
        try{
            const newOrder = await orderHistoryDao.addNewOrder(userId, cartId)
            return newOrder
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const orderHistoryService = new OrderHistoryService()
export default orderHistoryService