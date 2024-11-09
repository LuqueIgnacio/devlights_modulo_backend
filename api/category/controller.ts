import { Request, Response } from "express";
import categoryService from "./service";

class CategoryController{
  
    async getCategories(req: Request, res: Response){
        const categories = await Category.find()
        return res.status(200).json(categories)
    }
    async getAll(req: Request, res: Response){
        try{
            const categories = await categoryService.getAll(req.body)
            return res.status(200).json(categories)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    async create(req: Request, res: Response){
        try{
            const newCategory = await categoryService.create(req.body)
            return res.status(200).json(newCategory)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    async update(req: Request, res: Response){
        try{
            const {id} = req.params
            if(!id) return res.status(400).json()
            const updatedCategory = await categoryService.update(id, req.body)
            return res.status(200).json(updatedCategory)
        }catch(error){
            return res.status(500).json(error)
        }
    }
}

const categoryController = new CategoryController()
export default categoryController

