use serde::Serialize;

#[derive(Serialize)]
pub struct Recipe {
    pub key: u32,
    pub name: String,
    pub description: String,
}

#[tauri::command]
pub fn get_recipes() -> Vec<Recipe> {
    vec![
        Recipe {
            key: 1,
            name: String::from("Pan de Masa Madre"),
            description: String::from("Pan hecho con masa madre y harina integral."),
        },
        Recipe {
            key: 2,
            name: String::from("Croissants"),
            description: String::from("Bollos de hojaldre con mantequilla."),
        },
        Recipe {
            key: 3,
            name: String::from("Magdalenas"),
            description: String::from("Pequeños bizcochos esponjosos."),
        },
        Recipe {
            key: 4,
            name: String::from("Churros"),
            description: String::from("Masa frita con azúcar y canela."),
        },
        Recipe {
            key: 5,
            name: String::from("Ensaimadas"),
            description: String::from("Bollos en espiral con azúcar glas."),
        },
        Recipe {
            key: 6,
            name: String::from("Rosquillas"),
            description: String::from("Rosquillas fritas con azúcar."),
        },
        Recipe {
            key: 7,
            name: String::from("Bizcocho de Yogur"),
            description: String::from("Bizcocho esponjoso hecho con yogur."),
        },
        Recipe {
            key: 8,
            name: String::from("Tarta de Manzana"),
            description: String::from("Tarta con base de hojaldre y manzanas."),
        },
        Recipe {
            key: 9,
            name: String::from("Pan de Leche"),
            description: String::from("Panecillos suaves y esponjosos."),
        },
        Recipe {
            key: 10,
            name: String::from("Galletas de Mantequilla"),
            description: String::from("Galletas crujientes de mantequilla."),
        },
        Recipe {
            key: 11,
            name: String::from("Tarta de Santiago"),
            description: String::from("Tarta de almendra con azúcar glas."),
        },
        Recipe {
            key: 12,
            name: String::from("Brazo de Gitano"),
            description: String::from("Bizcocho enrollado relleno de crema."),
        },
        Recipe {
            key: 13,
            name: String::from("Panettone"),
            description: String::from("Pan dulce con frutas confitadas."),
        },
        Recipe {
            key: 14,
            name: String::from("Coca de San Juan"),
            description: String::from("Tarta plana con frutas confitadas."),
        },
        Recipe {
            key: 15,
            name: String::from("Mantecados"),
            description: String::from("Dulces de manteca y almendra."),
        },
        Recipe {
            key: 16,
            name: String::from("Polvorones"),
            description: String::from("Dulces de almendra y azúcar glas."),
        },
        Recipe {
            key: 17,
            name: String::from("Tarta de Queso"),
            description: String::from("Tarta cremosa de queso."),
        },
        Recipe {
            key: 18,
            name: String::from("Hojaldres"),
            description: String::from("Bollos de hojaldre crujiente."),
        },
        Recipe {
            key: 19,
            name: String::from("Tarta de Chocolate"),
            description: String::from("Tarta con varias capas de chocolate."),
        },
        Recipe {
            key: 20,
            name: String::from("Bollos de Canela"),
            description: String::from("Bollos enrollados con canela y azúcar."),
        },
    ]
}
