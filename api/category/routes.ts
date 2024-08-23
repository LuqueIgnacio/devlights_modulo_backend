import express from "express"
import categoryController from "./controller"

const categoryRouter = express.Router()
const {getAll, create, update} = categoryController

categoryRouter.get("/", getAll)
categoryRouter.post("/", create)
categoryRouter.put("/:id", update)

export default categoryRouter