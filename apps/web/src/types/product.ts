export interface Product {

  id:string;

  name:string;

  description?:string;

  price:number;

  cost?:number;

  categoryId?:number;

  category?:{
    id:number;
    name:string;
  };

}