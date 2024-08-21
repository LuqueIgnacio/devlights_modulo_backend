import { ObjectId, Types } from "mongoose"

export interface ICartProduct{
    product_id: Types.ObjectId,
    quantity: number
}

export interface ICart{
    products: ICartProduct[],
    total_price: number,
    user_id?: string
}

export interface ISearchParams{
    user_id?: string,
    expires_at?: Date,
    created_at?: Date,
    page?: string
}