import { Table, Spin } from "antd";
import { columns, DataType } from "./config";
import { useEffect, useState } from "react";
import { getRecipes } from '../../../api/recipe';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data as DataType[]);
      setLoading(false);
    });
  }, []);

  return (
    <Spin spinning={loading}>
      <Table<DataType> columns={columns} dataSource={recipes} />
    </Spin>
  );
}

export default RecipesList;