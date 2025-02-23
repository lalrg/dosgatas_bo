import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, InputNumber, Form, Input, Row, Col, message } from 'antd';
import { useNavigationDispatch } from '../../../shared/context/NavigationContext';

type FieldType = {
  name?: string;
  description?: string;
  cost?: number;
};

const CreateProduct: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigationDispatch = useNavigationDispatch();

  useEffect(() => {
    if (isSubmitted) {
      if (!isSuccess) {
        messageApi.success('Producto creado correctamente');
        setTimeout(() => {
          navigationDispatch({ route: 'listProduct' });
        }, 1000);
      } else {
        messageApi.error('Error al crear el producto');
      }
      setIsSubmitted(false);
    }
  }, [isSuccess, isSubmitted, messageApi, navigationDispatch]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // here goes the backend logic
    setIsSuccess(true);
    setIsSubmitted(true);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    setIsSuccess(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="createProduct"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row align={"middle"} justify={"center"}>
          <Col>
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
          </Col>
        </Row>
      </Form>
    </>
  )
};

export default CreateProduct;