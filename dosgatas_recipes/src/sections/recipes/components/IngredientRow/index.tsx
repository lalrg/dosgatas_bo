import React from 'react';
import { Form, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

export interface IngredientRow {
  name: number;
  productsList: ProductsList[];
  restField: any;
  remove: (name: number) => void;
  add?: () => void;  // New prop
}

export type ProductsList = {
  label: string;
  value: number;
  cost: number;
};

export const IngredientRow: React.FC<IngredientRow> = ({ 
  name, 
  productsList, 
  restField, 
  remove,
  add 
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      add?.();
    }
  };

  return (
    <Space key={name} style={{ display: "flex", marginBottom: 8 }} align="baseline">
      <Form.Item
        {...restField}
        name={[name, "key"]}
        label="Producto"
        rules={[{ required: true, message: 'Falta el producto' }]}
      >
        <Select
          showSearch
          placeholder="Seleccionar producto"
          style={{ width: 250 }}
          options={productsList}
          onKeyDown={handleKeyPress}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      <Form.Item
        {...restField}
        label="Cantidad"
        name={[name, 'quantity']}
        rules={[{ required: true, message: 'Falta la cantidad' }]}
      >
        <InputNumber 
          min={1} 
          placeholder="Cantidad"
          onKeyDown={handleKeyPress}
        />
      </Form.Item>
      <MinusCircleOutlined onClick={() => remove(name)} />
    </Space>
  );
};