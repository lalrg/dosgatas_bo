import { invoke } from '@tauri-apps/api/core';

export type Recipe = {
  key: number;
  name: string;
  description: string;
  margin?: number;
  products?: { key: number; quantity: number }[];
};

const getRecipe = async (id: number): Promise<Recipe> => {
  console.log(id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        key: id,
        name: 'Mock Recipe', 
        description: 'This is a mock recipe', 
        margin: 20, 
        products: [
          { key: 1, quantity: 2 },
          { key: 2, quantity: 3 },
          { key: 3, quantity: 1 }
        ] 
      });
    }, 500);
  });
};

const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
  console.log(recipe);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...recipe, key: Math.floor(Math.random() * 1000) });
    }, 500);
  });
};

const updateRecipe = async (id: number, recipe: Recipe): Promise<Recipe> => {
  console.log(id);
  console.log(recipe);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...recipe, key: id });
    }, 500);
  });
};

const deleteRecipe = async (id: number): Promise<void> => {
  console.log(id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

const getRecipes = async (): Promise<Recipe[]> => {
  return invoke<Recipe[]>('get_recipes');
};

export { getRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipes };