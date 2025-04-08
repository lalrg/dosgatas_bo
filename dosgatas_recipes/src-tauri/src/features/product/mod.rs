use crate::entities::prelude::Product as ProductEntity;
use crate::entities::prelude::Recipe as RecipeEntity;
use crate::entities::recipe;
use crate::entities::recipe_product;
use crate::AppState;
use rust_decimal::prelude::*;
use sea_orm::prelude::Expr;
use sea_orm::Condition;
use sea_orm::EntityTrait;
use sea_orm::JoinType;
use sea_orm::QuerySelect;
use sea_orm::RelationTrait;
use serde::Serialize;
use tauri::State;

#[derive(Serialize)]
pub struct Product {
    key: u32,
    name: String,
    description: String,
    cost: f32,
}

#[tauri::command]
pub async fn get_products(state: State<'_, AppState>) -> Result<Vec<Product>, String> {
    let db = state.db.lock().await;

    let products = ProductEntity::find()
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

    let recipes = RecipeEntity::find()
        .join(
            JoinType::InnerJoin,
            recipe_product::Relation::Recipe.def()
                .rev()
                .on_condition(move |_left, right| {
                    Condition::all()
                        .add(Expr::col((recipe_product::Entity, recipe_product::Column::ProductId))
                            .eq(id))
                        .add(Expr::col((right, recipe::Column::Id)).eq(Expr::col((
                            recipe_product::Entity,
                            recipe_product::Column::RecipeId,
                        ))))
                }),
        )
        .all(&*db)
        .await
        .map_err(|err| err.to_string())?;

    Ok(ProductUsage {
        is_used: !recipes.is_empty(),
        recipe_names: recipes.into_iter().map(|r| r.name).collect(),
    })
}
