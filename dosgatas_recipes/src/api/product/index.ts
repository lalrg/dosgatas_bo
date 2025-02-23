type Product = {
  name: string;
  description: string;
  cost: number;
};

const getProduct = async (id: number): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'product', description: 'description', cost: 100 });
    }, 500);
  });
};

export { getProduct };