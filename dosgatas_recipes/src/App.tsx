import NavigationMenu from './shared/components/NavigationMenu';
import { Typography } from 'antd';
import RouteRenderer from './shared/infraestructure/RouteRenderer';
import { NavigationProvider } from './shared/context/NavigationContext';

const { Title } = Typography;

function App() {
  return (
    <NavigationProvider>
      <Title style={{textAlign: 'center'}}>Dos Gatas</Title>
      <NavigationMenu />
      <RouteRenderer />
    </ NavigationProvider>
  );
}

export default App;
