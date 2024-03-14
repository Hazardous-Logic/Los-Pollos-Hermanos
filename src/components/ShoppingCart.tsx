import { RxCross2 } from "react-icons/rx";
import { useShoppingCart } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { GetMenuData } from "../hooks/GetMenuData";
import { Button } from "flowbite-react";

type ShoppingCartProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { cartItems , clearCart } = useShoppingCart();
  const menu = GetMenuData();
  return (
    <div className={`fixed right-0 top-5 bottom-5 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex flex-col justify-between rounded border-red-700 h-full border shadow-lg bg-yellow-300 w-72 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-red-700">
            <RxCross2 className="text-xl" />
          </button>
        </div>
        <div className="mt-4 flex-1 overflow-y-auto">
          {cartItems.map((item , index) => (
            <CartItem key={index} {...item} />
          ))}
        </div>
        <div className="border-t border-gray-300 py-2 flex justify-between">
        <div className="flex space-x-5 items-center">
        <p className="font-semibold text-xl">Total</p>
          <p className="text-xl">            {
              cartItems.reduce((total, cartItem) => {
                const item = menu.find((item) => item.name === cartItem.id);
                return total + (item?.price || 0) * cartItem.input;
              }, 0)
            } ft
             </p>
             <Button color="failure" pill onClick={() =>clearCart()}>Clear Cart</Button>
        </div>

        </div>
      </div>
    </div>
  );
}
