import express from "express";
import productController from "./controller";


const productRouter = express.Router();

productRouter.get("/", () => {});
productRouter.post("/", productController.createProduct);

export default productRouter;
