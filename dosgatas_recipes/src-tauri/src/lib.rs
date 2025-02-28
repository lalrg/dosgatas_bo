use sea_orm::{Database, DatabaseConnection};
use std::sync::Mutex;
use tauri::Manager;

mod features;

use features::user as userFeatures;
use features::recipe as recipeFeatures;

pub struct AppState {
  pub db: Mutex<DatabaseConnection>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  
  tauri::Builder::default()
    .setup(|app| {
      let db_url = if cfg!(debug_assertions) {
        "sqlite:../myapp_dev.db?mode=rwc"
      } else {
        "sqlite:./tasks.db?mode=rwc"
      };
      let handle = app.handle().clone();
      tauri::async_runtime::spawn(async move {
        let db = Database::connect(db_url).await.expect("Database connection failed");
        handle.manage(AppState { db: Mutex::new(db) });
      });
      Ok(())
  })
  .plugin(tauri_plugin_opener::init())
  .invoke_handler(tauri::generate_handler![
    userFeatures::get_products,
    recipeFeatures::get_recipes,
    ])
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}