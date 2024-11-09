import Category from "./model";
import { ICategory, ISearchParams } from "./types";

class CategoryDao{
    private limit = 20
    async getAll(filters: ISearchParams){
        try{
            const {name, page} = filters
            const categories = await Category.find({
                ...(name? {name: {$regex: name, $options: "i"}} : {})
            })
            .skip(page ? (Number(page) - 1) * this.limit : 0)
            .limit(20)
            return categories
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async create(category: ICategory){
        try{
            const newCategory = await Category.create(category)
            return newCategory
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async update(id: string, category: ICategory){
        try{
            const updatedCategory = await Category.findByIdAndUpdate(id, category, {new: true})
            return updatedCategory
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const categoryDao = new CategoryDao()
export default categoryDao