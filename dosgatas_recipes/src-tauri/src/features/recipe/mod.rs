use crate::entities::prelude::Recipe as RecipeEntity;
use crate::entities::prelude::RecipeProduct;
use crate::entities::recipe_product as recipe_product_entity;
use crate::entities::recipe_product;
use sea_orm::ColumnTrait;
use sea_orm::QueryFilter;
use sea_orm::QuerySelect;
use sea_orm::{EntityTrait, RelationTrait, JoinType, Set, QueryOrder};
use tauri::State;
use serde::Serialize;
use serde::Deserialize;

use crate::AppState;
use crate::entities::recipe;

#[derive(Serialize)]
pub struct Recipe {
    pub key: u32,
    pub name: String,
    pub description: String,
}

#[derive(Serialize)]
pub struct ProductRecipe {
    pub key: u32,
    pub quantity: f32
}

#[derive(Serialize)]
pub struct RecipeDetail {
    pub key: u32,
    pub name: String,
    pub description: String,
    pub products: Vec<ProductRecipe>
}

#[derive(Deserialize)]
pub struct CreateRecipeInput {
    pub name: String,
    pub description: Option<String>,
    pub products: Vec<ProductInput>,
    // pub margin: Option<f32>,
}

#[derive(Deserialize)]
pub struct ProductInput {
    pub key: u32,
    pub quantity: f32,
}

#[tauri::command]
pub async fn get_recipes(state: State<'_, AppState>) -> Result<Vec<Recipe>, String> {
    let db = state.db.lock().await;

    let recipes = RecipeEntity::find()
        .order_by_desc(recipe::Column::Id)
        .all(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(recipes
        .into_iter()
        .map(|r| Recipe {
            key: r.id,
            name: r.name,
            description: r.description.unwrap_or_default(),
        })
        .collect())
}

#[tauri::command]
pub async fn get_single_recipe(state: State<'_, AppState>, id: u32) -> Result<RecipeDetail, String> {
    let db = state.db.lock().await;

    let recipe = RecipeEntity::find_by_id(id)
        .one(&*db)
        .await
        .map_err(|err| err.to_string())?
        .ok_or_else(|| "Recipe not found".to_string())?;

    // Get products with their quantities through the junction table
    let products_with_quantities = RecipeProduct::find()
        .filter(recipe_product::Column::RecipeId.eq(id))
        .join(JoinType::InnerJoin, recipe_product::Relation::Product.def())
        .all(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(RecipeDetail {
        key: recipe.id,
        name: recipe.name,
        description: recipe.description.unwrap_or_default(),
        products: products_with_quantities
            .into_iter()
            .map(|rp| ProductRecipe {
                key: rp.product_id,
                quantity: rp.quantity as f32,
            })
            .collect(),
    })
}

#[tauri::command]
pub async fn delete_recipe(state: State<'_,AppState>, id: u32) -> Result<(), String> {
    let db = state.db.lock().await;

    RecipeProduct::delete_many()
        .filter(recipe_product_entity::Column::RecipeId.eq(id))
        .exec(&*db)
        .await
        .map_err(|err| err.to_string())?;

    // Delete the recipe
    RecipeEntity::delete_by_id(id)
        .exec(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn create_recipe(state: State<'_, AppState>, input: CreateRecipeInput) -> Result<Recipe, String> {
    let db = state.db.lock().await;

    // Create recipe
    let insert_result = RecipeEntity::insert(recipe::ActiveModel {
        name: Set(input.name.clone()),
        description: Set(input.description.clone()),
        ..Default::default()
    })
    .exec(&*db)
    .await
    .map_err(|err| err.to_string())?;

    // Create recipe products
    let recipe_products = input.products.into_iter().map(|p| recipe_product::ActiveModel {
        recipe_id: Set(insert_result.last_insert_id),
        product_id: Set(p.key),
        quantity: Set(p.quantity as u32),
    });

    RecipeProduct::insert_many(recipe_products)
        .exec(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(Recipe {
        key: insert_result.last_insert_id,
        name: input.name,
        description: input.description.unwrap_or_default(),
    })
}