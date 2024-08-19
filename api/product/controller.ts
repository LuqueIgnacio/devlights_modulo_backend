import { Request, Response } from "express";
import productService from "./service";
import decodeJWT from "../helpers/decodeJWT";

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

    async salersEditProduct(req: Request, res: Response){
        try{
            const {authtoken} = req.headers
            if(!authtoken) return res.status(401).json()
            const user = decodeJWT(authtoken)
            const {id} = req.params
            if(!id) return res.status(400).json()
            const editedProduct = await productService.salersEditProduct(id, user.userId, req.body)
            return res.status(200).json(editedProduct)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    async salersDeleteProduct(req: Request, res: Response){
        try{
            const {authtoken} = req.headers
            if(!authtoken) return res.status(401).json()
            const user = decodeJWT(authtoken)
            const {id} = req.params
            if(!id) return res.status(400).json()
            const editedProduct = await productService.salersEditProduct(id, user.userId, req.body)
            return res.status(200).json(editedProduct)
        }catch(error){
            return res.status(500).json(error)
        }
    }
}

const productController = new ProductController()
export default productController