import { ObjectId, Types } from "mongoose"

export interface ICartProduct{
    product_id: Types.ObjectId,
    quantity: number
}

export interface ICart{
    _id?: Types.ObjectId, 
    products: ICartProduct[],
    total_price: number,
    created_at?: Date,
    expires_at?: Date,
    user_id: Types.ObjectId,
}

export interface ISearchParams{
    user_id?: string,
    expires_at?: Date,
    created_at?: Date,
    page?: string
}