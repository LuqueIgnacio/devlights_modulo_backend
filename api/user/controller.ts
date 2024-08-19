import { Request, Response } from "express";
import { userService } from "./service";
import User from "./model";
import orderHistoryService from "../orderHistory/service";
import decodeJWT from "../helpers/decodeJWT"
import { UserRole } from "./types";

const { getUser, getUsers, createUser, loginUser } = userService;

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: "Users not found" });
    }
  }
  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await getUser(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const user = await createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      const token = await loginUser(req.body);
      return res.header("authtoken", token).status(200).json("Login successful");
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }
  async editUser(req: Request, res: Response) {
    try {
      const {authtoken} = req.headers
      if(!authtoken) return res.status(401).json()
      const user = decodeJWT(authtoken)
      const editedUser = await userService.editUser(user.userId, req.body)
      return res.status(200).json(editedUser);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }

  async getOrdersHistory(req: Request, res: Response){
    const {authtoken} = req.headers
    if(!authtoken) return res.status(400).json()
    const user = decodeJWT(authtoken)
    try {
      const ordersHistory = await orderHistoryService.getOrdersHistory({user_id: user.userId})
      return res.status(200).json(ordersHistory);
    } catch (error) {
      return res.status(500).json();
    }
  }

  async editRole(req: Request, res: Response){
    try{
      const {id} = req.params
      if(!id) return res.status(404).json()
      const role = req.body.role as UserRole
      if(!role) return res.status(400)
      if(!["admin", "comprador", "vendedor"].includes(role)) return res.status(400).json()
      const editedUser = await userService.editUserRole(id, role)
      return res.status(200).json(editedUser)
    }catch(error){
      return res.status(500).json(error)
    }
  }
}

export const userController = new UserController();
