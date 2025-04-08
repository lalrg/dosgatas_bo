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
                "sqlite:../myapp_dev.db?mode=rwc"
            } else {
                "sqlite:./tasks.db?mode=rwc"
            };
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let db = Database::connect(db_url)
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

            recipeFeatures::get_recipes,
            recipeFeatures::get_single_recipe,
            recipeFeatures::delete_recipe

        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
