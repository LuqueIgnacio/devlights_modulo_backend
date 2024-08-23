import express from "express";

import categoryRouter from "../api/category/routes";
import userRouter from "../api/user/routes";
import productRouter from "../api/product/routes";
import cartRouter from "../api/cart/routes";
import orderHistoryRouter from "../api/orderHistory/routes";

const router = express.Router();

router.use("/categories", categoryRouter)
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/orderHistory", orderHistoryRouter)

export default router;
