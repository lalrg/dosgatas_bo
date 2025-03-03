use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();
        
        db
            .execute_unprepared(
                r#"
                CREATE TABLE IF NOT EXISTS product (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    price DECIMAL NOT NULL
                );
                "#
            )
            .await?;

        db
            .execute_unprepared(
                r#"
                CREATE TABLE IF NOT EXISTS recipe (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT
                );
                "#
            )
            .await?;

        db
            .execute_unprepared(
                r#"
                CREATE TABLE IF NOT EXISTS recipe_product (
                    recipe_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL,
                    FOREIGN KEY (recipe_id) REFERENCES recipe(id),
                    FOREIGN KEY (product_id) REFERENCES product(id)
                );
                "#
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();
        
        db
            .execute_unprepared("DROP TABLE IF EXISTS recipe_product;")
            .await?;

        db
            .execute_unprepared("DROP TABLE IF EXISTS recipe;")
            .await?;

        db
            .execute_unprepared("DROP TABLE IF EXISTS product;")
            .await?;

        Ok(())
    }
}