import { useNavigation } from "../../context/NavigationContext";
import routes from "./routes";
import './styles.css';

const RouteRenderer: React.FC = () => {
    const navigation =  useNavigation();
    return <div className="renderer">{routes[navigation.route](navigation.id)}</div>
}

export default RouteRenderer;
