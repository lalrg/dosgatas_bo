import React, { useEffect, useMemo, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, InputNumber, Row, Space, Statistic, message, Spin } from 'antd';
import { IngredientRow, ProductsList } from '../components/IngredientRow';
import { SelectedProduct, usePriceCalculation } from '../hooks/usePriceCalculation';
import { DataType } from '../../products/list/config';
import { getProducts } from '../../../api/product';
import { getRecipe, createRecipe, updateRecipe } from '../../../api/recipe';
import { useNavigation, useNavigationDispatch } from '../../../shared/context/NavigationContext';

const CreateRecipe: React.FC = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  const [recipe, setRecipe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigationDispatch = useNavigationDispatch();
  const navigation = useNavigation();
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    getProducts().then((data) => {
      setProducts(data as DataType[]);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (navigation.id) {
      setIsLoading(true);
      getRecipe(navigation.id)
        .then((recipe) => {
          setRecipe(recipe);
          form.setFieldsValue({
            ...recipe,
            products: recipe.products?.map((product: { key: number; quantity: number }) => ({
              key: product.key,
              quantity: product.quantity
            })),
            margin: recipe.margin || 3 // Set the margin value from the recipe or default to 3
          });
          setSelectedProducts(recipe.products || []);
          setMargin(recipe.margin || 3); // Set the margin value from the recipe or default to 3
          setIsLoading(false);
        })
        .catch(() => {
          messageApi.error('Error al cargar la receta');
          setIsLoading(false);
        });
    } else {
      form.resetFields();
      setSelectedProducts([]); // Reset the selected products
      setMargin(3); // Reset the margin to the default value
    }
  }, [navigation.id, form, messageApi]);

  const productsList = useMemo<ProductsList[]>(
    () => products.map<ProductsList>(({ name, key, cost }) => ({
      label: name,
      value: key,
      cost
    })), [products]);

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [margin, setMargin] = useState<number>(3);
  const [price, cost] = usePriceCalculation(selectedProducts, margin);

  const onValuesChange = (changedFields: any, allFields: any) => {
    if (allFields.products && allFields.products.length > 0) {
      setSelectedProducts(allFields.products as SelectedProduct[]);
    }
    setMargin(allFields.margin);
  };

  useEffect(() => {
    if (isSubmitted) {
      if (isSuccess) {
        messageApi.success(navigation.id ? 'Receta actualizada correctamente' : 'Receta creada correctamente');
        setTimeout(() => {
          navigationDispatch({ route: 'listRecipe' });
        }, 1500);
      } else {
        messageApi.error(navigation.id ? 'Error al actualizar la receta' : 'Error al crear la receta');
      }
      setIsLoading(false);
      setIsSubmitted(false);
    }
  }, [isSuccess, isSubmitted, messageApi, navigationDispatch, navigation.id]);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      if (navigation.id) {
        await updateRecipe(navigation.id, values);
      } else {
        await createRecipe(values);
      }
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
    }
    setIsSubmitted(true);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={isLoading}>
        <Form
          form={form}
          name="recipe_create"
          onFinish={onFinish}
          autoComplete="off"
          onValuesChange={onValuesChange}
          initialValues={{
            margin: 3
          }}
        >
          <Row align={"middle"} justify={"center"}>
            <Col>
              <Form.Item
                label="Nombre"
                name={"name"}
                rules={[{ required: true, message: 'Nombre de la receta!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Descripción"
                name="description"
                rules={[{ required: true, message: 'Descripción de la receta!' }]}
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
          <Space direction="vertical" style={{ width: '100%' }} align="center">
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
            <Row style={{ width: "100%" }} justify={"center"} align={"middle"} gutter={[16, 16]}>
              <Col>
                <Statistic title="Precio actual" value={price} />
              </Col>
              <Col>
                <Statistic title="Costo" value={cost} />
              </Col>
              <Col>
                <Statistic title="Ganancia" value={price - cost} />
              </Col>
            </Row>
            <Divider />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {navigation.id ? 'Actualizar' : 'Crear'}
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Spin>
    </>
  );
};

export default CreateRecipe;