import NavigationMenu from './shared/components/NavigationMenu';
import { ConfigProvider, Space, theme, Typography } from 'antd';
import RouteRenderer from './shared/infraestructure/RouteRenderer';
import { NavigationProvider } from './shared/context/NavigationContext';
import './shared/styles/app.css';

const { Title } = Typography;

function App() {
  return (
    <NavigationProvider>
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          algorithm: theme.darkAlgorithm,
    
          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}
      >
        <Title style={{textAlign: 'center'}}>Dos Gatas</Title>
        <NavigationMenu />
        <RouteRenderer />
      </ConfigProvider>
    </ NavigationProvider>
  );
}

export default App;
