import React from "react";
import AddProductForm from "./AddProductForm";
import AddProductButton from "./AddProductButton";
import type { Product } from "../types"

interface ToggleableAddFormProductProps {
  dispatchProductList: React.ActionDispatch<[action: { type: string; product?: Product, productList?: Product[], deletedId?: string}]>;
}

const ToggleableAddProductForm = ({dispatchProductList}: ToggleableAddFormProductProps) => {
  const [isClickedAddForm, setIsClickedAddForm] = React.useState<boolean>(false);

  return (
    <>
      {isClickedAddForm 
      ? <AddProductForm setIsClickedAddForm={setIsClickedAddForm} dispatchProductList={dispatchProductList}/>
      : <AddProductButton setIsClickedAddForm={setIsClickedAddForm} />}
    </>
  )
}

export default ToggleableAddProductForm;