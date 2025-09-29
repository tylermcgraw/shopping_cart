import React from "react";
import type {Product as ProductType} from "../types";
import EditProductForm from "./EditProductForm";
import EditProductButton from "./EditProductButton";

interface ProductProps {
  product: ProductType;
  dispatchProductList: React.ActionDispatch<[action: { type: string; product?: ProductType, productList?: ProductType[], deletedId?: string}]>;
}

const ToggleableEditForm = ({product, dispatchProductList}: ProductProps) => {
  const [isClickedEditForm, setIsClickedEditForm] = React.useState<boolean>(false);
  
  return (
    <>
      {isClickedEditForm
      ? <EditProductForm product={product} setIsClickedEditForm={setIsClickedEditForm} dispatchProductList={dispatchProductList}/>
      : <EditProductButton setIsClickedEditForm={setIsClickedEditForm} />
      }
    </>
  )
}

export default ToggleableEditForm;