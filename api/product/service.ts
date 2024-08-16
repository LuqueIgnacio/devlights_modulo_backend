import productDao from "./dao"
import { IProduct } from "./types"
class ProductService{
    async createProduct(product: IProduct){
        try {
            const newProduct = await productDao.createProduct(product)
            return newProduct
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const productService = new ProductService()
export default productService