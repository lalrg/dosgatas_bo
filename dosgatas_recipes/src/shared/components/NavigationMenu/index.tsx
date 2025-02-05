import React, { JSX, useState } from 'react';
import { CoffeeOutlined, PieChartOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { RouteKeys } from '../../infraestructure/RouteRenderer/routes';
import { useNavigation, useNavigationDispatch } from '../../context/NavigationContext';

type MenuItem = {
  label: string;
  key: RouteKeys | string;
  icon: JSX.Element;
  children?: MenuItem[];
}

const items: MenuItem[] = [
  {
    label: 'Recetas',
    key: 'mainRecipe',
    icon: <PieChartOutlined />,
    children: [
      {
        label: 'Nueva',
        key: 'createRecipe',
        icon: <PlusOutlined />,
      },
      {
        label: 'Lista',
        key: 'listRecipe',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
  {
    label: 'Productos',
    key: 'mainProduct',
    icon: <CoffeeOutlined />,
    children: [
      {
        label: 'Nuevo',
        key: 'createProduct',
        icon: <PlusOutlined />,
      },
      {
        label: 'Lista',
        key: 'listProduct',
        icon: <UnorderedListOutlined />,
      },
    ],
  },
];

const NavigationMenu: React.FC = () => {
  const navigation = useNavigation();
  const navigationDispatch = useNavigationDispatch();

  const onClick: MenuProps['onClick'] = (e) => {
    navigationDispatch(e.key as RouteKeys);
  };

  return <Menu onClick={onClick} selectedKeys={[navigation]} mode="horizontal" items={items} />;
};

export default NavigationMenu;