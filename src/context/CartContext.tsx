import { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = {
  id: string;
  input: number;
};

type CartProviderProps = {
  children: ReactNode;
};

type CartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext({} as CartContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );


  const cartQuantity = cartItems.reduce((input, item) => item.input + input, 0);

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.input || 0;
  }

  function increaseItemQuantity(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, input: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, input: item.input + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.input === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, input: item.input - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItemFromCart(id: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
        clearCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
