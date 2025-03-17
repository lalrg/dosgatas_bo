use sea_orm::Statement;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();

        // Check if the product table is empty
        let count: i64 = db
            .query_one(Statement::from_string(
                db.get_database_backend(),
                "SELECT COUNT(*) as count FROM product".to_owned(),
            ))
            .await?
            .unwrap()
            .try_get("", "count")?;

        if count == 0 {
            // Insert mock data if the table is empty
            db.execute_unprepared(
                r#"
                INSERT INTO product (id, name, description, price) VALUES
                (1, 'Harina Gold Mills 1kg', 'Harina de trigo para repostería', 1200.0),
                (2, 'Azúcar Doña María 2kg', 'Azúcar blanca granulada', 1800.0),
                (3, 'Mantequilla Dos Pinos 500g', 'Mantequilla sin sal', 2500.0),
                (4, 'Royal Polvo de Hornear 120g', 'Levadura en polvo para hornear', 850.0),
                (5, 'Huevos Criollos 30uni', 'Huevos frescos de gallina', 3500.0),
                (6, 'Leche Dos Pinos 1L', 'Leche entera', 1100.0),
                (7, 'Extracto Vainilla Coronado 120ml', 'Extracto de vainilla', 1950.0),
                (8, 'Sal Sabemas 500g', 'Sal fina de mesa', 450.0),
                (9, 'Chocolate Costa 350g', 'Chocolate negro para repostería', 2800.0),
                (10, 'Nueces Peladas 250g', 'Nueces importadas', 4500.0),
                (11, 'Canela Molida Badia 50g', 'Canela en polvo', 1250.0),
                (12, 'Miel de Abeja Don Jorge 750ml', 'Miel pura de abeja', 5500.0),
                (13, 'Coco Rallado Del Valle 200g', 'Coco rallado deshidratado', 1800.0),
                (14, 'Frutas Confitadas El Sabor 250g', 'Mezcla de frutas confitadas', 2200.0),
                (15, 'Almendras Fileteadas 200g', 'Almendras laminadas importadas', 4800.0),
                (16, 'Pasas Del Monte 250g', 'Pasas sin semillas', 1950.0),
                (17, 'Crema Dulce Dos Pinos 250ml', 'Crema de leche para montar', 1650.0),
                (18, 'Queso Crema Dos Pinos 250g', 'Queso crema para repostería', 2200.0),
                (19, 'Maicena Juana 500g', 'Fécula de maíz', 980.0),
                (20, 'Cacao en Polvo Cavalier 200g', 'Cacao puro sin azúcar', 3200.0),
                (21, 'Gelatina Sin Sabor Royal 20g', 'Gelatina neutra en polvo', 1500.0),
                (22, 'Leche Condensada Dos Pinos 397g', 'Leche condensada azucarada', 1850.0),
                (23, 'Sirope Kist 700ml', 'Sirope de maíz', 2100.0),
                (24, 'Leche Evaporada Nestle 315g', 'Leche evaporada sin azúcar', 1750.0),
                (25, 'Whip Topping Richs 907g', 'Crema vegetal para batir', 4500.0),
                (26, 'Crema Chantilly Dos Pinos 1L', 'Crema batida lista para usar', 5200.0);
                "#,
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

#[derive(DeriveIden)]
enum Post {
    Table,
    Id,
    Title,
    Text,
}
