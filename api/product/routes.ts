import express from "express";
import productController from "./controller";


const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/", productController.createProduct);

export default productRouter;
