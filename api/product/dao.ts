import Product from "./model";
import { IProduct } from "./types";

class ProductDao{
    async getAllProducts(){
        try{
            const products = await Product.find()
            return products
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async createProduct(product: IProduct){
        try {
            const newProduct = await Product.create(product)
            return newProduct
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const productDao = new ProductDao()
export default productDao