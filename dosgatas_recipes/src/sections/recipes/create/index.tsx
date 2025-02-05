import React, { useMemo } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import { productsMock } from '../../../misc/mock/products';

const onFinish = (values: any) => {
  console.log('Received values of form:', values);
};

const CreateRecipe: React.FC = () => {
  const productsList = useMemo(
    () => productsMock.map(({name, key}) => ({
          label: name,
          value: key
        })
    ), [productsMock]);

  return(
    <Form
      name="dynamic_form_nest_item"
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
    >
      <Form.Item
        label="Nombre"
        name="name"
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
      <Form.List name="products">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'product']}
                  label="Producto"
                  rules={[{ required: true, message: 'Nombre del producto' }]}
                >
                  <Select
                    style={{ width: 120 }}
                    options={productsList}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="cantidad"
                  name={[name, 'quantity']}
                  rules={[{ required: true, message: 'Porcentaje del paquete' }]}
                >
                  <Input placeholder="Cantidad" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>)
};

export default CreateRecipe;