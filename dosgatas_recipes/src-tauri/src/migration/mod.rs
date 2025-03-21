pub use sea_orm_migration::prelude::*;

mod m20220101_000001_create_table;
mod m20250304_115144_seed;
mod m20250317_121322_seed_recipes;
mod m20250318_234235_seed_recipe_products;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_create_table::Migration),
            Box::new(m20250304_115144_seed::Migration),
            Box::new(m20250317_121322_seed_recipes::Migration),
            Box::new(m20250318_234235_seed_recipe_products::Migration),
        ]
    }
}
