import { useMemo } from "react";
import { productsMock } from "../../../../misc/mock/products";

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
  const productsList = useMemo<ProductsPrices>(
    () => productsMock.reduce<ProductsPrices>(
      (acc, { key, cost }) => {
        acc[key] = cost;
        return acc;
      },
      {} as ProductsPrices
    ),
    [productsMock]
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