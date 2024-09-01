import Product from "./model";
import { IEditProduct, IProduct, ISearchParamsDAO } from "./types";
import { Types } from "mongoose";
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
                ...(salerId ? {salers_id: salerId} : {})
            })
            .sort(order && {price: order})
            .limit(limit)
            .skip((page-1) * limit)
            return products
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getProductsPrice(productsId: string[]){
        try {
            const prices = await Product.find({
                _id: {$in: productsId}
            },
                "price"
            )
            return prices
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

    async editProduct(id: string, product: IEditProduct){
        try {
            const {name, description, price, stock, category, image} = product
            const editedProduct = await Product.findByIdAndUpdate(id, {
                ...(name? {name} : {}),
                ...(description? {description} : {}),
                ...(price? {price} : {}),
                ...(stock? {stock} : {}),
                ...(category? {category} : {}),
                ...(image? {image} : {}),
            }, {new: true})
            return editedProduct
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async editProducts(ids: string[], products: IEditProduct[]){
        try {
            const updates = products.map((product, index) => {
                const {name, description, price, stock, category, image} = product
                return( 
                    {
                        updateOne:{
                            filter: { _id: ids[index] },
                            update: {
                                ...(name? {name} : {}),
                                ...(description? {description} : {}),
                                ...(price? {price} : {}),
                                ...(stock? {stock} : {}),
                                ...(category? {category} : {}),
                                ...(image? {image} : {}),
                            }
                        }
                    })
            })
           
            const response = await Product.bulkWrite(updates)
            return response
        }catch(error){
            throw Error((error as Error).message)
        }
    }
    

    async deleteProduct(id: string){
        try{
            const deletedProduct = await Product.findByIdAndDelete(id)
            return deletedProduct
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async getProductsByIds(ids: string[]){
        try{
            const products = await Product.find({_id: {$in: ids.map(id => new Types.ObjectId(id))}}).sort({_id: 1})
            return products
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const productDao = new ProductDao()
export default productDao