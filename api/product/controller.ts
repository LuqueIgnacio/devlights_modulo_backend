import { Request, Response } from "express";
import productService from "./service";

class ProductController{
    async createProduct(req: Request, res: Response){
        try{
            const newProduct = await productService.createProduct(req.body) 
            return res.status(200).json(newProduct)
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const productController = new ProductController()
export default productController