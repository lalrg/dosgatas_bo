use serde::Serialize;
mod features;

use features::user as userFeatures;
use features::recipe as recipeFeatures;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            userFeatures::get_products,
            recipeFeatures::get_recipes,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
