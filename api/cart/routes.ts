import express from "express";
import cartController from "./controller";
import isAuthenticated from "../middlewares/isAuthenticated"

const cartRouter = express.Router()

cartRouter.get("/getCart", isAuthenticated, cartController.getCart)
cartRouter.post("/addCart", isAuthenticated, cartController.addCart)
cartRouter.put("/updateCart", isAuthenticated, cartController.updateCart)
cartRouter.delete("/deleteCart", isAuthenticated, cartController.deleteCart)

export default cartRouter