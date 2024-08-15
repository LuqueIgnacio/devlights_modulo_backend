import express from "express";

import userRouter from "../api/user/routes";
import productRouter from "../api/product/routes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
