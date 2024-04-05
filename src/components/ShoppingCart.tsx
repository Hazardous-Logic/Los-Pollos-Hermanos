import { RxCross2 } from "react-icons/rx";
import { useShoppingCart } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { GetMenuData } from "../hooks/GetMenuData";
import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function ShoppingCart() {
  const { cartItems , clearCart} = useShoppingCart();
  const menu = GetMenuData();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };
  return (
    <>
    <div className={`fixed right-0 top-5 bottom-5 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex flex-col justify-between rounded-xl border-red-700 h-full border shadow-lg bg-yellow-300 w-96 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={()=>setIsOpen(false)} className="p-1 rounded hover:bg-red-700">
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
       <Button className="mx-auto" pill color="success" onClick={handleCheckout} disabled={cartItems.length < 1}>Checkout</Button>
        </div>
      </div>
    </div>
    <div className="fixed bottom-8 right-8 z-10">
      <button onClick={() => setIsOpen(!isOpen)} className={`bg-red-700 text-white p-2 rounded-full shadow-lg  transition-transform transform ${isOpen ? "-translate-x-96 rotate-0": "translate-x-0 rotate-180 "}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

          </>
  );
}
