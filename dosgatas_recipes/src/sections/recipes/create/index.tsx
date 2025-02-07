import React, { useMemo, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, InputNumber, Select, Space } from 'antd';
import { productsMock } from '../../../misc/mock/products';
import { IngredientRow, ProductsList } from '../components/IngredientRow';
import { SelectedProduct, usePriceCalculation } from '../hooks/usePriceCalculation';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

const CreateRecipe: React.FC = () => {
  const productsList = useMemo<ProductsList[]>(
    () => productsMock.map<ProductsList>(({name, key, cost}) => ({
          label: name,
          value: key,
          cost
        })
    ), [productsMock]);
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
    const [margin, setMargin] = useState<number>(0);
    const [price, cost] = usePriceCalculation(selectedProducts, margin);

    const onValuesChange = (changedFields: any, allFields: any) => {
      if(allFields.products && allFields.products.length > 0) {
        setSelectedProducts(allFields.products as SelectedProduct[]);
      }
      setMargin(allFields.margin);
      console.log(changedFields, allFields);
    };

  return(
    <Form
      name="recipe_create"
      onFinish={onFinish}
      autoComplete="off"
      labelCol= {{
        xs: { span: 24 },
        sm: { span: 6 },
      }}
      wrapperCol= {{
        xs: { span: 24 },
        sm: { span: 14 },
      }}
      onValuesChange={onValuesChange}
      initialValues={{
        margin: 60
      }}
    >
      <Form.Item
        label="Nombre"
        name={"name"}
        rules={[{ required: true, message: 'Nombre del producto!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Descripcion"
        name="description"
        rules={[{ required: true, message: 'Descripcion del producto!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Margen de ganancias"
        name="margin"
        rules={[{ required: true, message: 'Porcentaje de ganancias' }]}
      >
        <InputNumber />
      </Form.Item>
      <div>
        Precio actual:{price}
      </div>
      <div>
        Costo:{cost}
      </div>
      <div>
        Ganancia:{price-cost}
      </div>
      <Form.List name="products">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
                <IngredientRow key={key} name={name} productsList={productsList} restField={restField} remove={remove} />
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Agregar ingrediente
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Crear
        </Button>
      </Form.Item>
    </Form>)
};

export default CreateRecipe;