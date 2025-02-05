import { Table } from "antd";
import { columns, DataType } from "./config";
import { productsMock } from "../../../misc/mock/products";

const ProductsList = () => {

  return (
    <Table<DataType> columns={columns} dataSource={productsMock}/>
  );
}

export default ProductsList;