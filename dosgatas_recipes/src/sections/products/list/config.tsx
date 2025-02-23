import { TableProps, Space } from "antd";
import { useNavigationDispatch } from "../../../shared/context/NavigationContext";

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
      Options(record.key)
    ),
  }
];

const Options = (id: number) => {
  const navigationDispatch = useNavigationDispatch();

  return (
    <Space size="middle">
      <a onClick={() => navigationDispatch({ route: 'editProduct', id })}>Ver</a>
      <a>Eliminar</a>
    </Space>
  );
}