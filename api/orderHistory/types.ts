export interface IOrder{
    products: [
        {
            product_id: string,
        quantity: number,
        sub_total: number
        }
    ],
    total_price: number
}

export interface ISearchParams{
    user_id?: string,
    page?: string
}