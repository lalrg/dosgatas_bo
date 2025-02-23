import React from 'react';
import { TableProps, Space, Popconfirm, message } from "antd";
import { useNavigationDispatch } from "../../../shared/context/NavigationContext";
import { deleteRecipe } from '../../../api/recipe';

export type DataType = {
  key: number;
  name: string;
  description: string;
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
      await deleteRecipe(id);
      messageApi.success('Receta eliminada correctamente');
      navigationDispatch({ route: 'listRecipe' }); // Navigate to the list view again
    } catch (error) {
      messageApi.error('Error al eliminar la receta');
    }
  };

  return (
    <>
      {contextHolder}
      <Space size="middle">
        <a onClick={() => navigationDispatch({ route: 'editRecipe', id })}>Ver</a>
        <Popconfirm
          title="¿Estás seguro de eliminar esta receta?"
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