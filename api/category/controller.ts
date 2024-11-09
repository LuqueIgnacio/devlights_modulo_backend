import {Request, Response} from "express"
import Category from "./model"

class CategoriesController{
    async getCategories(req: Request, res: Response){
        const categories = await Category.find()
        return res.status(200).json(categories)
    }
}

const categoriesController = new CategoriesController()
export default categoriesController