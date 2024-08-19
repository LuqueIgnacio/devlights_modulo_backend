import express from "express";
import { userController } from "./controller";
import isAdmin from "../middlewares/isAdmin"

const userRouter = express.Router();

const { getUsers, getUser, createUser, loginUser, deleteUser, editUser, getOrdersHistory, editRole } = userController;

userRouter.get("/", isAdmin, getUsers);
userRouter.get("/ordersHistory", getOrdersHistory)
userRouter.get("/:id", getUser);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.put("/editUser", editUser);
userRouter.put("/editRole/:id", isAdmin, editRole);

export default userRouter;
