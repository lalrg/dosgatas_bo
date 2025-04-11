import { invoke } from '@tauri-apps/api/core';

export type Product = {
  name: string;
  description: string;
  cost: number;
  id?: number;
};

export type ProductUsage = {
  is_used: boolean;
  recipe_names: string[];
};

const getProduct = async (id: number): Promise<Product> => {
  return invoke<Product>('get_single_product', { id }).then((message) => message);
};

const createProduct = async (product: Product): Promise<Product> => {
  return invoke<Product>('create_product', { 
    input: {
      name: product.name,
      description: product.description,
      cost: product.cost
    }
  });
};

const updateProduct = async (id: number, product: Product): Promise<Product> => {
  return invoke<Product>('update_product', { 
    id,
    input: {
      name: product.name,
      description: product.description,
      cost: product.cost
    }
  });
};

const deleteProduct = async (id: number): Promise<void> => {
  return invoke('delete_product', { id });
};

const getProducts = async (): Promise<Product[]> => {
  return invoke<Product[]>('get_products').then((message) => message);
};

const checkProductUsage = async (id: number): Promise<ProductUsage> => {
  return invoke<ProductUsage>('product_is_in_recipes', { id });
};

export { 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getProducts,
  checkProductUsage
};