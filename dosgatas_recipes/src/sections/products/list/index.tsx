import { Table } from "antd";
import { columns, DataType } from "./config";
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState<DataType[]>([]);
  useEffect(() =>{
    invoke('get_products').then((message) => setProducts(message as DataType[]));
  });

  return (
    <Table<DataType> columns={columns} dataSource={products}/>
  );
}

export default ProductsList;