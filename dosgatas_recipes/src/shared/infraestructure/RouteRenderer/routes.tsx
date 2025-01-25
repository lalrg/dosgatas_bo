import { JSX } from 'react';
import ProductsCreation from '../../../sections/products/create';
import ProductsList from '../../../sections/products/list';
import RecipesCreation from '../../../sections/recipes/create';
import RecipesList from '../../../sections/recipes/list';

type Routes = {
    [key: string]: JSX.Element | (() => JSX.Element);
};

const routes: Routes = {
    createProduct: () => renderComponent(ProductsCreation, {}),
    listProduct: () => renderComponent(ProductsList, {}),
    createRecipe: () => renderComponent(RecipesCreation, {}),
    listRecipe: () => renderComponent(RecipesList, {}),
};

function renderComponent(Component: React.FC, props: object): JSX.Element {
    return <Component {...props} />;
}

export default routes;