import { Request, Response } from "express"
import orderHistoryService from "./service"

class OrderHistoryController{
    async getOrderHistoryByUserId(req: Request, res: Response){
        try{
            const {userId} = req.params
            if(!userId) return res.status(404).json()
            const orderHistory = await orderHistoryService.getOrdersHistory({user_id: userId as string})
            return res.status(200).json(orderHistory)
        }catch(error){
            return res.status(500).json()
        }
    }
}

const orderHistoryController = new OrderHistoryController()
export default orderHistoryController