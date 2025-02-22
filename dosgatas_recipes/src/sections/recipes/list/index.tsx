import { Table } from "antd";
import { columns, DataType } from "./config";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<DataType[]>([]);
  useEffect(() => {
    invoke('get_recipes').then((message) => setRecipes(message as DataType[]));    
  });

  return (
    <Table<DataType> columns={columns} dataSource={recipes}/>
  );
}

export default RecipesList;