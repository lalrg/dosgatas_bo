import { createContext, ReactNode, useContext, useReducer } from "react";
import { RouteKeys } from '../../../shared/infraestructure/RouteRenderer/routes';

type NavigationProviderProps = {
    children: ReactNode;
}

type NavigationContextType = {
    route: RouteKeys;
    id?: number;
}

const defaultRoute: NavigationContextType = { route: 'listRecipe' }

const NavigationReducer = (_: NavigationContextType, value: NavigationContextType) => { 
    return { ...value };
}

const NavigationContext = createContext<NavigationContextType>(defaultRoute);
const NavigationDispatchContext = createContext<React.Dispatch<NavigationContextType>>(()=> {});

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => { 
    const [route, dispatch] = useReducer(
        NavigationReducer, 
        defaultRoute
    );

    return (
        <NavigationContext.Provider value={route}>
            <NavigationDispatchContext.Provider value={dispatch}>
                {children}
            </NavigationDispatchContext.Provider>
        </NavigationContext.Provider>  
    )
}

export const useNavigation = () => {
    return useContext(NavigationContext);
}

export const useNavigationDispatch = () => {
    return useContext(NavigationDispatchContext);
}
