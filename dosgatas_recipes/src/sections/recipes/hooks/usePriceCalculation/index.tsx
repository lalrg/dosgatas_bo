import { useEffect, useMemo, useState } from "react";
import { DataType } from "../../../products/list/config";
import { invoke } from "@tauri-apps/api/core";

export type SelectedProduct = {
  product: number | null;
  quantity: number | null;
}

type ProductsPrices = {
  [product: number]: number;
}

export const usePriceCalculation = (
  selectedProducts: SelectedProduct[],
  margin: number
) => {
  const [products, setProducts] = useState<DataType[]>([]);
  useEffect(() => {
    invoke('get_products').then((message) => setProducts(message as DataType[]));
  });
  
  const productsList = useMemo<ProductsPrices>(
    () => products.reduce<ProductsPrices>(
      (acc, { key, cost }) => {
        acc[key] = cost;
        return acc;
      },
      {} as ProductsPrices
    ),
    [products]
  );

  const totalCost = useMemo(
    () => {
      if (!selectedProducts?.length || !selectedProducts[0]) {
        return 0;
      }
  
      return selectedProducts.reduce((acc, current) => {
        if (!current?.product || !current?.quantity) {
          return acc;
        }
        return acc + (productsList[current.product] * current.quantity);
      }, 0);
    },
    [selectedProducts, productsList]
  );

  return [totalCost * margin, totalCost];
  
}