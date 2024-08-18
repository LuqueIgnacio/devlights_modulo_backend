import productDao from "./dao"
import { IProduct, ISearchParams, ISearchParamsDAO } from "./types"
class ProductService{
    async getProductById(id: string){
        try{
            const product = await productDao.getProductById(id)
            return product
        }catch(error){
            throw Error((error as Error).message) 
        }
    }
    async getProducts(filters: ISearchParams){
        try {
            const limit = 5
            const {order} = filters
            let orderBy : 1 | -1 | undefined
            if(order){
                orderBy = order === "lower" ? 1 : -1
            }
            const filtersDAO: ISearchParamsDAO = {
                page: filters.page,
                name: filters.name,
                category: filters.category,
                maximumPrice: filters.maximumPrice,
                minimumPrice: filters.minimumPrice,
                salerId: filters.salerId,
                order: orderBy
            }
            const products = await productDao.getProducts(limit, filtersDAO)
            return products
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getProductsPrice(productsId: string[]){
        try {
            const prices = await productDao.getProductsPrice(productsId)
            return prices
        }catch(error){
            throw Error((error as Error).message)
        }
    }

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