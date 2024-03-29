export interface RegistrationPayload {
    register: boolean;
    email: string;
    password: string;
    user_name: string;
}

export interface RegistrationResponse {
    status: string;
    message: string;
}

export interface LoginPayload {
    login: boolean;
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    message: string;
    data: {
        user_id: number;
        email: string;
        user_name: string
    }
}

export interface AddProductPayload {
    add_product: boolean;
    product_name: string;
    image: string;
    description: string;
    price: string;
}

export interface AddProductResponse {
    status: string;
    message: string;
}

export interface ListProductPayload {
    list_products: boolean;
}

export interface ListProductResponse {
    status: string;
    products: ListProduct[];
}

export interface ListProduct {
    product_id: string;
    product_name: string;
    image: string;
    description: string;
    price: string;
    del_status: string
}

export interface UpdateProductPayload {
    update_product: boolean;
    product_id: string;
    product_name: string;
    image: string;
    description: string;
    price: string;
}

export interface UpdateProductResponse {
    status: string;
    message: string;
}

export interface UploadImageResponse {
    status: string;
    error: boolean;
    message: string;
    url: string;
}