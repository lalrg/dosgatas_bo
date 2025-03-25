use crate::entities::prelude::Recipe as RecipeEntity;
use tauri::State;
use serde::Serialize;
use sea_orm::EntityTrait;

use crate::AppState;

#[derive(Serialize)]
pub struct Recipe {
    pub key: u32,
    pub name: String,
    pub description: String,
}

#[tauri::command]
pub async fn get_recipes(state: State<'_, AppState>) -> Result<Vec<Recipe>, String> {
    let db = state.db.lock().await;

    let recipes = RecipeEntity::find()
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
