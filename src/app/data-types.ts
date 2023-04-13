export interface SignUp{
    name: string,
    email: string,
    mobileno: Float32Array,
    password: string,
    role : string
}

export interface logIn{
    email: string,
    password: string,
    role: string
}

export interface Product {
    id: number;
    ProductName: string;
    Description: string;
    Category: string;
    Price: number;
    image?: File;
  }