import { useNavigation } from "../../context/NavigationContext";
import routes from "./routes";


const RouteRenderer: React.FC = () => {
    const navigation =  useNavigation();
    return routes[navigation]();
}


export default RouteRenderer;