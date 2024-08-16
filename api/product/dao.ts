import Product from "./model";
import { IProduct, ISearchParamsDAO } from "./types";

class ProductDao{
    async getProductById(id: string){
        try {
            const product = await Product.findById(id)
            return product
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getProducts(limit: number, filters: ISearchParamsDAO){
        const {name, category, minimumPrice, maximumPrice, order, salerId} = filters
        let hasPriceFilter: boolean = false
        let page: number
        page = filters.page ? Number(filters.page) : 1
        if(minimumPrice || maximumPrice) hasPriceFilter = true
        try{
            const products = await Product.find({
                ...(name ? {"name": {$regex: name, $options: "i"}} : {}),
                ...(category ? {category} : {}),
                ...(hasPriceFilter ? {price: 
                    { 
                    ...(minimumPrice ? {$gte: minimumPrice}: {}), 
                    ...(maximumPrice ? {$lte: maximumPrice} : {} )
                    }} : {}),
                ...(salerId ? {salerId} : {})
            })
            .sort(order && {price: order})
            .limit(limit)
            .skip((page-1) * limit)
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