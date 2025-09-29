import { deleteProduct } from "../services/cart";
import type {Product} from "../types/"

interface DeleteButtonProps {
  id: string;
  dispatchProductList: React.ActionDispatch<[action: { type: string; product?: Product, productList?: Product[], deletedId?: string}]>;
}

const DeleteButton = ({id, dispatchProductList}: DeleteButtonProps) => {
  const handleClick = async () => {
    try {
      await deleteProduct(id);
      dispatchProductList({
        type: "delete product",
        deletedId: id
      });
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <button className="delete-button" onClick={handleClick}><span>X</span></button>
  )
}

export default DeleteButton;