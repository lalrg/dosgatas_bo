import { createContext, ReactNode, useContext, useReducer } from "react";
import { RouteKeys } from '../../../shared/infraestructure/RouteRenderer/routes';

interface NavigationProviderProps {
    children: ReactNode;
}


const NavigationReducer = (_: RouteKeys, value: RouteKeys) => { 
    return value;
}

const NavigationContext = createContext<RouteKeys>('listRecipe');
const NavigationDispatchContext = createContext<React.Dispatch<RouteKeys>>(()=> {});

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => { 
    const [route, dispatch] = useReducer(
        NavigationReducer, 
        'listRecipe'
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
