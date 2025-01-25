import React, { useState } from 'react';
import { CoffeeOutlined, PieChartOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Productos',
    key: 'products',
    icon: <CoffeeOutlined />,
    children: [
      {
        label: 'Nuevo',
        key: 'newProduct',
        icon: <PlusOutlined />,
      },
      {
        label: 'Lista',
        key: 'productsList',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
  {
    label: 'Recetas',
    key: 'recipes',
    icon: <PieChartOutlined />,
    children: [
      {
        label: 'Nueva',
        key: 'newRecipe',
        icon: <PlusOutlined />,
      },
      {
        label: 'Lista',
        key: 'recipesList',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
];

const NavigationMenu: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default NavigationMenu;