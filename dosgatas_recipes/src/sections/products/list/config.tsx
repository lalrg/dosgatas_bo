import React from 'react';
import { TableProps, Space, Popconfirm, message, notification, Button } from "antd";
import { WarningOutlined } from '@ant-design/icons';
import { useNavigationDispatch } from "../../../shared/context/NavigationContext";
import { checkProductUsage, deleteProduct } from '../../../api/product';

export type DataType = {
  key: number;
  name: string;
  description: string;
  cost: number;
}

export const columns = (onRefresh: () => Promise<void>): TableProps<DataType>['columns'] => [
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
      <Options id={record.key} onRefresh={onRefresh} />
    ),
  }
];

const Options: React.FC<{ 
  id: number;
  onRefresh: () => Promise<void>;
}> = ({ id, onRefresh }) => {
  const navigationDispatch = useNavigationDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    try {
      const usage = await checkProductUsage(id);
      
      if (usage.is_used) {
        const key = `product-usage-${id}`;
        notification.warning({
          key,
          message: 'No se puede eliminar el producto',
          description: (
            <div>
              <p>Este producto está siendo usado en las siguientes recetas:</p>
              <ul>
                {usage.recipe_names.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
              <p>Por favor, elimine el producto de estas recetas antes de continuar.</p>
              <Button 
                type="primary" 
                onClick={() => notification.destroy(key)}
                style={{ marginTop: '16px' }}
              >
                Entendido
              </Button>
            </div>
          ),
          icon: <WarningOutlined style={{ color: '#faad14' }} />,
          placement: 'top',
          duration: 0,
          closeIcon: false,
        });
        return;
      }

      await deleteProduct(id);
      await messageApi.success('Producto eliminado correctamente');
      await onRefresh();
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
          title="¿Estás seguro de eliminar este producto?"
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