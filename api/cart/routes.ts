import express from "express";
import cartController from "./controller";

const cartRouter = express.Router()

cartRouter.post("/addProduct", cartController.addProduct)

export default cartRouter