import { Table } from "antd";
import { columns, DataType } from "./config";
import { recipesMock } from "../../../misc/mock/recipes";

const RecipesList = () => {

  return (
    <Table<DataType> columns={columns} dataSource={recipesMock}/>
  );
}

export default RecipesList;