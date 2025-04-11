use crate::entities::prelude::Product as ProductEntity;
use crate::entities::prelude::Recipe as RecipeEntity;
use crate::entities::product;
use crate::entities::recipe_product;
use crate::AppState;
use rust_decimal::prelude::*;
use sea_orm::ActiveValue::Set;
use sea_orm::ColumnTrait;
use sea_orm::EntityTrait;
use sea_orm::QueryFilter;
use sea_orm::QueryOrder;
use serde::Serialize;
use serde::Deserialize;
use tauri::State;

#[derive(Serialize)]
pub struct Product {
    key: u32,
    name: String,
    description: String,
    cost: f32,
}

#[derive(Deserialize)]
pub struct CreateProductInput {
    pub name: String,
    pub description: Option<String>,
    pub cost: f32,
}

#[tauri::command]
pub async fn get_products(state: State<'_, AppState>) -> Result<Vec<Product>, String> {
    let db = state.db.lock().await;

    let products = ProductEntity::find()
        .order_by_desc(product::Column::Id)
        .all(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(products
        .into_iter()
        .map(|p| Product {
            key: p.id,
            name: p.name,
            description: p.description.unwrap_or_default(),
            cost: p.price.to_f32().unwrap_or_default(),
        })
        .collect())
}

#[tauri::command]
pub async fn get_single_product(state: State<'_, AppState>, id: u32) -> Result<Product, String> {
    let db = state.db.lock().await;

    let product = ProductEntity::find_by_id(id)
        .one(&*db)
        .await
        .map_err(|err| err.to_string())?
        .ok_or_else(|| "Product not found".to_string())?;

    Ok(Product {
        key: product.id,
        name: product.name,
        description: product.description.unwrap_or_default(),
        cost: product.price.to_f32().unwrap_or_default(),
    })
}

#[tauri::command]
pub async fn delete_product(state: State<'_,AppState>, id: u32) -> Result<(), String> {
    let db = state.db.lock().await;
    // Delete the recipe
    ProductEntity::delete_by_id(id)
        .exec(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(())
}

// Add this struct to your existing structs
#[derive(Serialize)]
pub struct ProductUsage {
    pub is_used: bool,
    pub recipe_names: Vec<String>,
}

#[tauri::command]
pub async fn product_is_in_recipes(state: State<'_, AppState>, id: u32) -> Result<ProductUsage, String> {
    let db = state.db.lock().await;

    // Simpler query using find_with_related
    let recipes = recipe_product::Entity::find()
        .filter(recipe_product::Column::ProductId.eq(id))
        .find_with_related(RecipeEntity)
        .all(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(ProductUsage {
        is_used: !recipes.is_empty(),
        recipe_names: recipes
            .into_iter()
            .map(|(_, recipe)| recipe[0].name.clone())
            .collect(),
    })
}

#[tauri::command]
pub async fn create_product(state: State<'_, AppState>, input: CreateProductInput) -> Result<Product, String> {
    let db = state.db.lock().await;
    
    let product = ProductEntity::insert(product::ActiveModel {
        name: Set(input.name.clone()),
        description: Set(input.description.clone()),
        price: Set(Decimal::from_f32(input.cost).unwrap_or_default()),
        ..Default::default()
    })
    .exec(&*db)
    .await
    .map_err(|err| err.to_string())?;

    Ok(Product {
        key: product.last_insert_id,
        name: input.name.clone(),
        description: input.description.unwrap_or_default(),
        cost: input.cost,
    })
}
