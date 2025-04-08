import { Table, Spin } from "antd";
import { columns, DataType } from "./config";
import { useEffect, useState, useCallback } from "react";
import { getRecipes } from '../../../api/recipe';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRecipes();
      setRecipes(data as DataType[]);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <Spin spinning={loading}>
      <Table<DataType> 
        columns={columns(fetchRecipes)} 
        dataSource={recipes} 
      />
    </Spin>
  );
}

export default RecipesList;