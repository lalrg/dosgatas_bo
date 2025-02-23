export type Product = {
  name: string;
  description: string;
  cost: number;
  id?: number;
};

const getProduct = async (id: number): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'product', description: 'description', cost: 100 });
    }, 500);
  });
};

const createProduct = async (product: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 500);
  });
};

const updateProduct = async (id: number, product: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...product, id });
    }, 500);
  });
};

const deleteProduct = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export { getProduct, createProduct, updateProduct, deleteProduct };