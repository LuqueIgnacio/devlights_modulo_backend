import express from "express"
import categoryController from "./controller"

const categoryRouter = express.Router()
const {getAll, create, update, getCategories} = categoryController

categoryRouter.get("/", getCategories)
categoryRouter.post("/", create)
categoryRouter.put("/:id", update)

export default categoryRouter

