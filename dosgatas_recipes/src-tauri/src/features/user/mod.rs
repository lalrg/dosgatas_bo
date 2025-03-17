use serde::Serialize;

#[derive(Serialize)]
pub struct Product {
    key: u32,
    name: String,
    description: String,
    cost: f32,
}

#[tauri::command]
pub fn get_products() -> Vec<Product> {
    vec![
        Product {
            key: 1,
            name: String::from("Harina Gold Mills 1kg"),
            description: String::from("Harina de trigo para repostería"),
            cost: 1200.0,
        },
        Product {
            key: 2,
            name: String::from("Azúcar Doña María 2kg"),
            description: String::from("Azúcar blanca granulada"),
            cost: 1800.0,
        },
        Product {
            key: 3,
            name: String::from("Mantequilla Dos Pinos 500g"),
            description: String::from("Mantequilla sin sal"),
            cost: 2500.0,
        },
        Product {
            key: 4,
            name: String::from("Royal Polvo de Hornear 120g"),
            description: String::from("Levadura en polvo para hornear"),
            cost: 850.0,
        },
        Product {
            key: 5,
            name: String::from("Huevos Criollos 30uni"),
            description: String::from("Huevos frescos de gallina"),
            cost: 3500.0,
        },
        Product {
            key: 6,
            name: String::from("Leche Dos Pinos 1L"),
            description: String::from("Leche entera"),
            cost: 1100.0,
        },
        Product {
            key: 7,
            name: String::from("Extracto Vainilla Coronado 120ml"),
            description: String::from("Extracto de vainilla"),
            cost: 1950.0,
        },
        Product {
            key: 8,
            name: String::from("Sal Sabemas 500g"),
            description: String::from("Sal fina de mesa"),
            cost: 450.0,
        },
        Product {
            key: 9,
            name: String::from("Chocolate Costa 350g"),
            description: String::from("Chocolate negro para repostería"),
            cost: 2800.0,
        },
        Product {
            key: 10,
            name: String::from("Nueces Peladas 250g"),
            description: String::from("Nueces importadas"),
            cost: 4500.0,
        },
        Product {
            key: 11,
            name: String::from("Canela Molida Badia 50g"),
            description: String::from("Canela en polvo"),
            cost: 1250.0,
        },
        Product {
            key: 12,
            name: String::from("Miel de Abeja Don Jorge 750ml"),
            description: String::from("Miel pura de abeja"),
            cost: 5500.0,
        },
        Product {
            key: 13,
            name: String::from("Coco Rallado Del Valle 200g"),
            description: String::from("Coco rallado deshidratado"),
            cost: 1800.0,
        },
        Product {
            key: 14,
            name: String::from("Frutas Confitadas El Sabor 250g"),
            description: String::from("Mezcla de frutas confitadas"),
            cost: 2200.0,
        },
        Product {
            key: 15,
            name: String::from("Almendras Fileteadas 200g"),
            description: String::from("Almendras laminadas importadas"),
            cost: 4800.0,
        },
        Product {
            key: 16,
            name: String::from("Pasas Del Monte 250g"),
            description: String::from("Pasas sin semillas"),
            cost: 1950.0,
        },
        Product {
            key: 17,
            name: String::from("Crema Dulce Dos Pinos 250ml"),
            description: String::from("Crema de leche para montar"),
            cost: 1650.0,
        },
        Product {
            key: 18,
            name: String::from("Queso Crema Dos Pinos 250g"),
            description: String::from("Queso crema para repostería"),
            cost: 2200.0,
        },
        Product {
            key: 19,
            name: String::from("Maicena Juana 500g"),
            description: String::from("Fécula de maíz"),
            cost: 980.0,
        },
        Product {
            key: 20,
            name: String::from("Cacao en Polvo Cavalier 200g"),
            description: String::from("Cacao puro sin azúcar"),
            cost: 3200.0,
        },
        Product {
            key: 21,
            name: String::from("Gelatina Sin Sabor Royal 20g"),
            description: String::from("Gelatina neutra en polvo"),
            cost: 1500.0,
        },
        Product {
            key: 22,
            name: String::from("Leche Condensada Dos Pinos 397g"),
            description: String::from("Leche condensada azucarada"),
            cost: 1850.0,
        },
        Product {
            key: 23,
            name: String::from("Sirope Kist 700ml"),
            description: String::from("Sirope de maíz"),
            cost: 2100.0,
        },
        Product {
            key: 24,
            name: String::from("Leche Evaporada Nestle 315g"),
            description: String::from("Leche evaporada sin azúcar"),
            cost: 1750.0,
        },
        Product {
            key: 25,
            name: String::from("Whip Topping Richs 907g"),
            description: String::from("Crema vegetal para batir"),
            cost: 4500.0,
        },
        Product {
            key: 26,
            name: String::from("Crema Chantilly Dos Pinos 1L"),
            description: String::from("Crema batida lista para usar"),
            cost: 5200.0,
        },
    ]
}
