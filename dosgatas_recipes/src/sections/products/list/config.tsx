import { TableProps, Space } from "antd";

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
      <Space size="middle">
        <a>Ver</a>
        <a>Eliminar</a>
      </Space>
    ),
  }
];