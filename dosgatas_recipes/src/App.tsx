import NavigationMenu from './shared/components/NavigationMenu';
import { ConfigProvider, Typography, App as AntdApp } from 'antd';
import RouteRenderer from './shared/infraestructure/RouteRenderer';
import { NavigationProvider } from './shared/context/NavigationContext';
import { themeConfig } from './shared/config/theme';
import './shared/styles/app.css';

const { Title } = Typography;

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <AntdApp>
        <NavigationProvider>
          <div className="app-container" style={{ background: '#141414', minHeight: '100vh' }}>
            <Title style={{textAlign: 'center'}}>Dos Gatas</Title>
            <NavigationMenu />
            <RouteRenderer />
          </div>
        </NavigationProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
