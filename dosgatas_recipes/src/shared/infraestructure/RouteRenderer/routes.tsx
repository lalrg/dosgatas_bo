import { JSX } from 'react';
import ProductsCreation from '../../../sections/products/create';
import ProductsList from '../../../sections/products/list';
import RecipesCreation from '../../../sections/recipes/create';
import RecipesList from '../../../sections/recipes/list';

export type RouteKeys = 'createProduct' | 'listProduct' | 'createRecipe' | 'listRecipe' | 'editRecipe' | 'editProduct';

type Routes = {
    [key in RouteKeys]: (id?: number) => JSX.Element;
};

const routes: Routes = {
    createProduct: () => renderComponent(ProductsCreation, {}),
    listProduct: () => renderComponent(ProductsList, {}),
    createRecipe: () => renderComponent(RecipesCreation, {}),
    listRecipe: () => renderComponent(RecipesList, {}),
    editProduct: (id) => renderComponent(ProductsCreation, { id }),
    editRecipe: (id) => renderComponent(RecipesCreation, { id }),
};

function renderComponent(Component: React.FC, props: object): JSX.Element {
    return <Component {...props} />;
}

export default routes;