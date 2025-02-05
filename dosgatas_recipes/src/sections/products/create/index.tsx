import React from 'react';
import type { FormProps } from 'antd';
import { Button, InputNumber, Form, Input } from 'antd';

type FieldType = {
  name?: string;
  description?: string;
  cost?: number;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const CreateProduct: React.FC = () => (
  <Form
    name="createProduct"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
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
    <Form.Item<FieldType>
      label="Nombre"
      name="name"
      rules={[{ required: true, message: 'Nombre del producto!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Descripcion"
      name="description"
      rules={[{ required: true, message: 'Descripcion del producto!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Costo"
      name="cost"
      rules={[{ required: true, message: 'Costo del producto!' }]}
    >
      <InputNumber />
    </Form.Item>


    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Crear
      </Button>
    </Form.Item>
  </Form>
);

export default CreateProduct;