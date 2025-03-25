use serde::Serialize;
use sea_orm::EntityTrait;
use rust_decimal::prelude::*;
use tauri::State;
use crate::entities::prelude::Product as ProductEntity;
use crate::AppState;

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

    Ok(products.into_iter().map(|p| Product {
        key: p.id,
        name: p.name,
        description: p.description.unwrap_or_default(),
        cost: p.price.to_f32().unwrap_or_default(),
    }).collect())
}