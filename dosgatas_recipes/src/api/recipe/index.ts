import { invoke } from '@tauri-apps/api/core';

export type Recipe = {
  key: number;
  name: string;
  description: string;
  margin?: number;
  products?: { key: number; quantity: number }[];
};

const getRecipe = async (id: number): Promise<Recipe> => {
  return invoke<Recipe>('get_single_recipe', { id });
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
  return invoke('delete_recipe', {id});
};

const getRecipes = async (): Promise<Recipe[]> => {
  return invoke<Recipe[]>('get_recipes');
};

export { getRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipes };