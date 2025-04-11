import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, InputNumber, Form, Input, Row, Col, message, Spin, notification } from 'antd';
import { useNavigation, useNavigationDispatch } from '../../../shared/context/NavigationContext';
import { getProduct, createProduct, updateProduct, Product } from '../../../api/product';

type FieldType = {
  name?: string;
  description?: string;
  cost?: number;
};

const CreateProduct: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigationDispatch = useNavigationDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.id) {
      setIsLoading(true);
      getProduct(navigation.id)
        .then((product) => {
          form.setFieldsValue(product);
          setIsLoading(false);
        })
        .catch(() => {
          messageApi.error('Error al cargar el producto');
          setIsLoading(false);
        });
    } else {
      form.resetFields();
    }
  }, [navigation.id, form, messageApi]);

  useEffect(() => {
    if (isSubmitted) {
      if (isSuccess) {
        messageApi.success(navigation.id ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
        setTimeout(() => {
          navigationDispatch({ route: 'listProduct' });
        }, 1500);
      } else {
        messageApi.error(navigation.id ? 'Error al actualizar el producto' : 'Error al crear el producto');
      }
      setIsLoading(false);
      setIsSubmitted(false);
    }
  }, [isSuccess, isSubmitted, messageApi, navigationDispatch, navigation.id]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setIsLoading(true);
      if (navigation.id) {
        await updateProduct(navigation.id, values as Product);
      } else {
        await createProduct(values as Product);
      }
      
      notification.success({
        message: navigation.id ? 'Producto actualizado' : 'Producto creado',
        description: `El producto "${values.name}" ha sido ${navigation.id ? 'actualizado' : 'creado'} correctamente.`,
        placement: 'top',
        duration: 3,
      });
      navigationDispatch({ route: 'listProduct' });
    } catch (error) {
      notification.error({
        message: navigation.id ? 'Error al actualizar' : 'Error al crear',
        description: `Ha ocurrido un error al ${navigation.id ? 'actualizar' : 'crear'} el producto.`,
        placement: 'top',
        duration: 0,
        closeIcon: false,
        btn: (
          <Button type="primary" onClick={() => notification.destroy()}>
            Entendido
          </Button>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    setIsSuccess(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={isLoading}>
        <Form
          form={form}
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
                  {navigation.id ? 'Actualizar' : 'Crear'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </>
  )
};

export default CreateProduct;