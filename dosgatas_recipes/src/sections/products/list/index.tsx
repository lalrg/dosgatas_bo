import { Table, Spin } from "antd";
import { columns, DataType } from "./config";
import { useEffect, useState, useCallback } from "react";
import { getProducts } from '../../../api/product';

const ProductsList = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data as DataType[]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Spin spinning={loading}>
      <Table<DataType> 
        columns={columns(fetchProducts)} 
        dataSource={products} 
      />
    </Spin>
  );
}

export default ProductsList;