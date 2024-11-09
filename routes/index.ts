import express from "express";

import userRouter from "../api/user/routes";
import productRouter from "../api/product/routes";
import cartRouter from "../api/cart/routes";
import orderHistoryRouter from "../api/orderHistory/routes";
import categoriesRouter from "../api/category/routes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/orderHistory", orderHistoryRouter)
router.use("/categories", categoriesRouter)

export default router;
