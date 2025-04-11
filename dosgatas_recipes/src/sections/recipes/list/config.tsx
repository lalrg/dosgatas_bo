import React, { useState } from 'react';
import { TableProps, Space, Popconfirm, message, Button, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useNavigationDispatch } from "../../../shared/context/NavigationContext";
import { deleteRecipe } from '../../../api/recipe';

export type DataType = {
  key: number;
  name: string;
  description: string;
}

export const columns = (onRefresh: () => Promise<void>): TableProps<DataType>['columns'] => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const getColumnSearchProps = (dataIndex: keyof DataType): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reiniciar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof DataType,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  return [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Options id={record.key} onRefresh={onRefresh} />
      ),
    }
  ];
};

const Options: React.FC<{ 
  id: number; 
  onRefresh: () => Promise<void>;
}> = ({ id, onRefresh }) => {
  const navigationDispatch = useNavigationDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      await messageApi.success('Receta eliminada correctamente');  // Wait for message
      await onRefresh();  // Then refresh
    } catch (error) {
      await messageApi.error('Error al eliminar la receta');
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