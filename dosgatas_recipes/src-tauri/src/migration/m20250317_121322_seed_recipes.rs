use sea_orm::Statement;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();

        // Check if the recipe table is empty
        let count: i64 = db
            .query_one(Statement::from_string(
                db.get_database_backend(),
                "SELECT COUNT(*) as count FROM recipe".to_owned(),
            ))
            .await?
            .unwrap()
            .try_get("", "count")?;

        if count == 0 {
            // Insert mock data if the table is empty
            db.execute_unprepared(
                r#"
                INSERT INTO recipe (id, name, description) VALUES
                (1, 'Pan de Masa Madre', 'Pan hecho con masa madre y harina integral.'),
                (2, 'Croissants', 'Bollos de hojaldre con mantequilla.'),
                (3, 'Magdalenas', 'Pequeños bizcochos esponjosos.'),
                (4, 'Churros', 'Masa frita con azúcar y canela.'),
                (5, 'Ensaimadas', 'Bollos en espiral con azúcar glas.'),
                (6, 'Rosquillas', 'Rosquillas fritas con azúcar.'),
                (7, 'Bizcocho de Yogur', 'Bizcocho esponjoso hecho con yogur.'),
                (8, 'Tarta de Manzana', 'Tarta con base de hojaldre y manzanas.'),
                (9, 'Pan de Leche', 'Panecillos suaves y esponjosos.'),
                (10, 'Galletas de Mantequilla', 'Galletas crujientes de mantequilla.'),
                (11, 'Tarta de Santiago', 'Tarta de almendra con azúcar glas.'),
                (12, 'Brazo de Gitano', 'Bizcocho enrollado relleno de crema.'),
                (13, 'Panettone', 'Pan dulce con frutas confitadas.'),
                (14, 'Coca de San Juan', 'Tarta plana con frutas confitadas.'),
                (15, 'Mantecados', 'Dulces de manteca y almendra.'),
                (16, 'Polvorones', 'Dulces de almendra y azúcar glas.'),
                (17, 'Tarta de Queso', 'Tarta cremosa de queso.'),
                (18, 'Hojaldres', 'Bollos de hojaldre crujiente.'),
                (19, 'Tarta de Chocolate', 'Tarta con varias capas de chocolate.'),
                (20, 'Bollos de Canela', 'Bollos enrollados con canela y azúcar.');
                "#
            )
            .await?;
        }

        Ok(())
    }

    async fn down(&self, _manager: &SchemaManager) -> Result<(), DbErr> {
        // Do nothing on down migration
        Ok(())
    }
}