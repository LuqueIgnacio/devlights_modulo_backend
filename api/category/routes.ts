import express from "express";
import categoriesController from "./controller";

const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesController.getCategories);

export default categoriesRouter;