use sea_orm::Statement;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();

        // Check if the recipe_product table is empty
        let count: i64 = db
            .query_one(Statement::from_string(
                db.get_database_backend(),
                "SELECT COUNT(*) as count FROM recipe_product".to_owned(),
            ))
            .await?
            .unwrap()
            .try_get("", "count")?;

        if count == 0 {
            // Insert fixed set of data into recipe_product table
            db.execute_unprepared(
                r#"
                INSERT INTO recipe_product (recipe_id, product_id, quantity) VALUES
                (1, 1, 2),
                (1, 2, 3),
                (1, 3, 1),
                (1, 4, 4),
                (1, 5, 2),
                (2, 6, 1),
                (2, 7, 2),
                (2, 8, 3),
                (2, 9, 1),
                (2, 10, 2),
                (3, 11, 1),
                (3, 12, 2),
                (3, 13, 3),
                (3, 14, 1),
                (3, 15, 2),
                (4, 16, 1),
                (4, 17, 2),
                (4, 18, 3),
                (4, 19, 1),
                (4, 20, 2),
                (5, 21, 1),
                (5, 22, 2),
                (5, 23, 3),
                (5, 24, 1),
                (5, 25, 2),
                (6, 26, 1),
                (6, 1, 2),
                (6, 2, 3),
                (6, 3, 1),
                (6, 4, 2),
                (7, 5, 1),
                (7, 6, 2),
                (7, 7, 3),
                (7, 8, 1),
                (7, 9, 2),
                (8, 10, 1),
                (8, 11, 2),
                (8, 12, 3),
                (8, 13, 1),
                (8, 14, 2),
                (9, 15, 1),
                (9, 16, 2),
                (9, 17, 3),
                (9, 18, 1),
                (9, 19, 2),
                (10, 20, 1),
                (10, 21, 2),
                (10, 22, 3),
                (10, 23, 1),
                (10, 24, 2),
                (11, 25, 1),
                (11, 26, 2),
                (11, 1, 3),
                (11, 2, 1),
                (11, 3, 2),
                (12, 4, 1),
                (12, 5, 2),
                (12, 6, 3),
                (12, 7, 1),
                (12, 8, 2),
                (13, 9, 1),
                (13, 10, 2),
                (13, 11, 3),
                (13, 12, 1),
                (13, 13, 2),
                (14, 14, 1),
                (14, 15, 2),
                (14, 16, 3),
                (14, 17, 1),
                (14, 18, 2),
                (15, 19, 1),
                (15, 20, 2),
                (15, 21, 3),
                (15, 22, 1),
                (15, 23, 2),
                (16, 24, 1),
                (16, 25, 2),
                (16, 26, 3),
                (16, 1, 1),
                (16, 2, 2),
                (17, 3, 1),
                (17, 4, 2),
                (17, 5, 3),
                (17, 6, 1),
                (17, 7, 2),
                (18, 8, 1),
                (18, 9, 2),
                (18, 10, 3),
                (18, 11, 1),
                (18, 12, 2),
                (19, 13, 1),
                (19, 14, 2),
                (19, 15, 3),
                (19, 16, 1),
                (19, 17, 2),
                (20, 18, 1),
                (20, 19, 2),
                (20, 20, 3),
                (20, 21, 1),
                (20, 22, 2);
                "#
            ).await?;
        }

        Ok(())
    }

    async fn down(&self, _manager: &SchemaManager) -> Result<(), DbErr> {
        // Do nothing on down migration
        Ok(())
    }
}