export interface IProduct {
    _id: string | undefined;
    name: string;
    description: string;
    stock: number;
    price: number;
    category: string;
    image: string;
}

export interface IEditProduct{
    name?: string;
    description?: string;
    stock?: number;
    price?: number;
    category?: string;
    image?: string;
}
type OrderPrice = "lower"|"higher"
export interface ISearchParams{
    page?: string
    name?: string,
    category?: string,
    minimumPrice?: number,
    maximumPrice?: number,
    order?: OrderPrice
    salerId?: string 
}

export interface ISearchParamsDAO{
    page?: string
    name?: string,
    category?: string,
    minimumPrice?: number,
    maximumPrice?: number,
    order?: 1 | -1,
    salerId?: string
}
  