import NavigationMenu from './shared/components/NavigationMenu';
import { Typography } from 'antd';

const { Title } = Typography;

function App() {
  return (
    <>
      <Title style={{textAlign: 'center'}}>Dos Gatas</Title>
      <NavigationMenu />
    </>
  );
}

export default App;
