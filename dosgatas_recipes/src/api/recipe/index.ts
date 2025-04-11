import { invoke } from '@tauri-apps/api/core';

export type Recipe = {
  key: number;
  name: string;
  description: string;
  margin?: number;
  products?: { key: number; quantity: number }[];
};

export type CreateRecipeInput = {
  name: string;
  description?: string;
  products: Array<{
    key: number;
    quantity: number;
  }>;
  margin?: number;
};

const getRecipe = async (id: number): Promise<Recipe> => {
  return invoke<Recipe>('get_single_recipe', { id });
};

const createRecipe = async (recipe: CreateRecipeInput): Promise<Recipe> => {
  return invoke<Recipe>('create_recipe', { input: recipe });
};

const updateRecipe = async (id: number, recipe: CreateRecipeInput): Promise<Recipe> => {
  return invoke<Recipe>('update_recipe', { id, input: recipe });
};

const deleteRecipe = async (id: number): Promise<void> => {
  return invoke('delete_recipe', {id});
};

const getRecipes = async (): Promise<Recipe[]> => {
  return invoke<Recipe[]>('get_recipes');
};

export { getRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipes };