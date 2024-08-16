import { Request, Response } from "express";
import productService from "./service";

class ProductController{
    async getProduct(req: Request, res: Response){
        try{
            const {id} = req.params
            const product = await productService.getProductById(id)
            if(product){
                return res.status(200).json(product)
            }
            return res.status(404).json()
        }catch(error){
            return res.status(500).json({ error });
        }
    }
    async getProducts(req: Request, res: Response){
        try{
            const products = await productService.getProducts(req.query)
            return res.status(200).json(products)
        }catch(error){
            throw Error((error as Error).message)
        }
    }

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