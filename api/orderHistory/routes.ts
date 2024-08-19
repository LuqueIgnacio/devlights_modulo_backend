import  express from "express";
import orderHistoryController from "./controller";

const orderHistoryRouter = express.Router()
//TODO: a estas rutas solo deben tener acceso los administradores
orderHistoryRouter.get("/", ()=>{})
orderHistoryRouter.get("/user/:userId", orderHistoryController.getOrderHistoryByUserId)

export default orderHistoryRouter