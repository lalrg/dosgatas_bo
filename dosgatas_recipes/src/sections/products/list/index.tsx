import { Table, Spin } from "antd";
import { columns, DataType } from "./config";
import { useEffect, useState } from "react";
import { getProducts } from '../../../api/product';

const ProductsList = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data as DataType[]);
      setLoading(false);
    });
  }, []);

  return (
    <Spin spinning={loading}>
      <Table<DataType> columns={columns} dataSource={products} />
    </Spin>
  );
}

export default ProductsList;