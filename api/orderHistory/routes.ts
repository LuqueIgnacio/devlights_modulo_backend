import  express from "express";
import orderHistoryController from "./controller";
import isAdmin from "../middlewares/isAdmin"

const orderHistoryRouter = express.Router()
orderHistoryRouter.use(isAdmin)

orderHistoryRouter.get("/", ()=>{})
orderHistoryRouter.get("/user/:userId", orderHistoryController.getOrderHistoryByUserId)
orderHistoryRouter.post("/addOrder", orderHistoryController.addOrder)

export default orderHistoryRouter