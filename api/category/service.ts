import categoryDao from "./dao";
import { ICategory, ISearchParams } from "./types";

class CategoryService{
    async getAll(filters: ISearchParams){
        try{
            const categories = await categoryDao.getAll(filters)
            return categories
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async create(category: ICategory){
        try{
            const newCategory = await categoryDao.create(category)
            return newCategory
        }catch(error){
            throw Error((error as Error).message)
        }
    }

    async update(id: string, category: ICategory){
        try{
            const updatedCategory = await categoryDao.update(id, category)
            return updatedCategory
        }catch(error){
            throw Error((error as Error).message)
        }
    }
}

const categoryService = new CategoryService()
export default categoryService