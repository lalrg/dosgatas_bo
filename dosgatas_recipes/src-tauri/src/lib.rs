use std::os::unix::fs::PermissionsExt;

use tokio::sync::Mutex;

use sea_orm::{Database, DatabaseConnection};
use sea_orm_migration::MigratorTrait;
use tauri::Manager;

mod entities;
mod features;
mod migration;

use features::product as productFeatures;
use features::recipe as recipeFeatures;
use migration::Migrator;

pub struct AppState {
    pub db: Mutex<DatabaseConnection>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let db_url = if cfg!(debug_assertions) {
                // Development: Use local path
                "sqlite:../myapp_dev.db?mode=rwc".to_string()
            } else {
                // Production: Use Documents directory
                let docs_dir = dirs::document_dir()
                    .expect("Failed to get Documents directory");
                
                println!("Documents directory: {}", docs_dir.display());
                
                let app_dir = docs_dir.join("dosgatas_bo_data");
                println!("App directory: {}", app_dir.display());
                
                std::fs::create_dir_all(&app_dir)
                    .expect("Failed to create app data directory");
                
                let db_path = app_dir.join("db.sqlite");
                println!("Database path: {}", db_path.display());
                
                // Ensure directory permissions are correct
                #[cfg(unix)]
                std::fs::set_permissions(&app_dir, std::fs::Permissions::from_mode(0o755))
                    .expect("Failed to set directory permissions");
                
                format!("sqlite:{}?mode=rwc", db_path.to_str().unwrap())
            };

            println!("Using database URL: {}", db_url); // Debug logging

            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let db = Database::connect(&db_url)
                    .await
                    .expect("Database connection failed");

                // Run migrations
                Migrator::up(&db, None).await.expect("Migration failed");

                handle.manage(AppState { db: Mutex::new(db) });
            });
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![

            productFeatures::get_products,
            productFeatures::get_single_product,
            productFeatures::delete_product,
            productFeatures::product_is_in_recipes,
            productFeatures::create_product,
            productFeatures::update_product,

            recipeFeatures::get_recipes,
            recipeFeatures::get_single_recipe,
            recipeFeatures::delete_recipe,
            recipeFeatures::create_recipe,
            recipeFeatures::update_recipe,

        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
