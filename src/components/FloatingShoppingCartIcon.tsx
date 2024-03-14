import { useState } from "react";
import { ShoppingCart } from "./ShoppingCart";

export function FloatingShoppingCartIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8 z-10">
      <button onClick={toggleCart} className="bg-red-700 text-white p-2 rounded-full shadow-lg">
        {/* You can replace the icon below with your preferred icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <ShoppingCart isOpen={isOpen} onClose={toggleCart} />
    </div>
  );
}
