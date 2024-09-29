export interface IAProductFormData {
  photos: File[],
  name: string,
  category_name: string,
  description: string,
  tags: string[],
  variants: IVariant[]
}

export interface Category {
  id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
}


export interface IImage {
  id: number;
  name: string;
  source: string;
  created_at: string;
  updated_at: string;
  product_name: string;
}

export interface IProduct {
  id: number;
  name: string;
  discount: number;
  popular: boolean;
  description: string;
  category_name: string;
  rating: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  photos?: IImage[];
  variants?: IVariant[];
  category?: ICategory;
  ProductHaveTag?: {tag_name: string, tag: ITag}[]
}


export interface IPhoto {
  id: number;
  name?: string;
  source: string;
  created_at: string;
  updated_at: string;
  product_name: string;
}

export interface IVariant {
  id: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  price: number;
  product_name: string;
  size_label: string;
  created_at: string;
  updated_at: string;
}

export interface ITag {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface IColor {
  id: number;
  name: string;
  hex: string;
  created_at: string;
  updated_at: string;
}

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}


export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface IUser {
  id: number;
  name: string;
  first_surname: string;
  second_surname: string;
  email: string;
  login: string;
  activated: boolean;
  activation_link: string;
  avatar_src: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface IUserFavouriteProduct {
  id: number;
  product_name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface IProductHaveTag {
  id: number;
  product_name: string;
  tag_name: string;
  created_at: string;
  updated_at: string;
}

export interface IReview {
  id: number;
  product_name: string;
  user_id: number | null;
  name: string;
  surname: string;
  body: string;
  created_at: string;
  updated_at: string;
}


export interface IOrder {
  id: number;
  phone: string
  email: string
  name: string
  surname: string
  region: string
  locality: string
  comment: string | null

  EDRPOY_CODE: string
  legal_entity: string

  house: string
  street: string
  floor: string
  appartment: string

  delivery_type: string
  payment_type: string
  department_address: string

  total_price: number
  total_items: number

  status?: "PROCESSING" | "FULFILLED"

  created_at: string;
  updated_at: string;
}

export interface IOrderItem {
  id: number;
  order_id: number;
  product_name: string;
  color_name: string;
  variant_id: number;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface ICart {
  id: number;
  total_price: number;
  total_items: number;
  created_at: string;
  updated_at: string;
}

export interface ICartItem {
  id: number;
  cart_id: number;
  product_name: string;
  color_name: string;
  variant_id: number;
  created_at: string;
  updated_at: string;
}



