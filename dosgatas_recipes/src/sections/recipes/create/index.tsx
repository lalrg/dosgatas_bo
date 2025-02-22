import React, { useEffect, useMemo, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Flex, Form, Grid, Input, InputNumber, Row, Select, Space, Statistic } from 'antd';
import { IngredientRow, ProductsList } from '../components/IngredientRow';
import { SelectedProduct, usePriceCalculation } from '../hooks/usePriceCalculation';
import { DataType } from '../../products/list/config';
import { invoke } from '@tauri-apps/api/core';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

const CreateRecipe: React.FC = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  useEffect(() => {
    invoke('get_products').then((message) => setProducts(message as DataType[]));
  });

  const productsList = useMemo<ProductsList[]>(
    () => products.map<ProductsList>(({name, key, cost}) => ({
          label: name,
          value: key,
          cost
        })
    ), [products]);

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
      onValuesChange={onValuesChange}
      initialValues={{
        margin: 60
      }}
    >
      <Row align={"middle"} justify={"center"}>
        <Col>
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
        </Col>
      </Row>
      <Flex style={{
          width: '100%'
        }} 
        justify={"center"} 
        align={"center"}
        vertical
      >
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
        <Divider />
        <Row style={{width:"100%"}} justify={"center"}  align={"middle"}>
          <Col span={6} offset={6}>
            <Statistic title="Precio actual" value={price} />
          </Col>
          <Col span={6}>
            <Statistic title="Costo" value={cost} />
          </Col>
          <Col span={6}>
            <Statistic title="Ganancia" value={price-cost} />
          </Col>
        </Row>
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Crear
          </Button>
        </Form.Item>
      </Flex>
    </Form>);
};

export default CreateRecipe;