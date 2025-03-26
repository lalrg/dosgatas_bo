use crate::entities::prelude::Product as ProductEntity;
use crate::AppState;
use rust_decimal::prelude::*;
use sea_orm::EntityTrait;
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
