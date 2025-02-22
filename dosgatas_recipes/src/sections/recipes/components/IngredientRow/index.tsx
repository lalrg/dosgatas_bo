import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, InputNumber, Select, Space } from "antd"

export type IngredientRowProps = {
  name: number;
  restField: any;
  productsList: ProductsList[];
  remove: (index: number | number[]) => void;
}
export type ProductsList = {
  label: string,
  value: number,
  cost: number
}


export const IngredientRow: React.FC<IngredientRowProps> = ({
    name, restField, productsList, remove}) => {
  return (
    <Space key={name} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
      <Form.Item
        {...restField}
        name={[name, 'product']}
        label="Producto"
        rules={[{ required: true, message: 'Nombre del producto' }]}
      >
        <Select
          showSearch
          optionFilterProp="label"
          style={{ width: 250 }}
          options={productsList}
        />
      </Form.Item>
      <Form.Item
        {...restField}
        label="cantidad"
        name={[name, 'quantity']}
        rules={[{ required: true, message: 'Porcentaje del paquete' }]}
      >
        <InputNumber placeholder="Cantidad" />
      </Form.Item>
      <MinusCircleOutlined onClick={() => remove(name)} />
    </Space>
  );
}