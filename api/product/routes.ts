import express from "express";
import productController from "./controller";
import isSaler from "../middlewares/isSaler"

const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/", isSaler, productController.createProduct);
productRouter.put("/:id", isSaler, productController.salersEditProduct);
productRouter.delete("/:id", isSaler, productController.salersDeleteProduct);

export default productRouter;
