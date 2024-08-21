import express from "express";
import cartController from "./controller";
import isAuthenticated from "../middlewares/isAuthenticated"

const cartRouter = express.Router()

cartRouter.post("/addProduct", isAuthenticated, cartController.addProduct)
cartRouter.post("/buy", isAuthenticated, cartController.buyCart)

export default cartRouter