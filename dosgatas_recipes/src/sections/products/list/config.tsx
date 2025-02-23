import React, { useState } from 'react';
import { TableProps, Space, Popconfirm, message, Spin } from "antd";
import { useNavigationDispatch } from "../../../shared/context/NavigationContext";
import { deleteProduct } from '../../../api/product';

export type DataType = {
  key: number;
  name: string;
  description: string;
  cost: number;
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Descripción',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Costo',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Acciones',
    key: 'action',
    render: (_, record) => (
      <Options id={record.key} />
    ),
  }
];

const Options: React.FC<{ id: number }> = ({ id }) => {
  const navigationDispatch = useNavigationDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      messageApi.success('Producto eliminado correctamente');
      navigationDispatch({ route: 'listProduct' }); // Navigate to the list view again
    } catch (error) {
      messageApi.error('Error al eliminar el producto');
    }
  };

  return (
    <>
      {contextHolder}
      <Space size="middle">
        <a onClick={() => navigationDispatch({ route: 'editProduct', id })}>Ver</a>
        <Popconfirm
          title={ "¿Estás seguro de eliminar este producto?" }
          onConfirm={handleDelete}
          okText="Sí"
          cancelText="No"
        >
          <a>Eliminar</a>
        </Popconfirm>
      </Space>
    </>
  );
};