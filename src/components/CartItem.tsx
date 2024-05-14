import { useShoppingCart } from "../context/CartContext";
import { GetMenuData } from "../hooks/GetMenuData";


export interface Item {
  id: string;
  input: number;
};

export function CartItem({ id, input }: Item) {
  const { removeItemFromCart } = useShoppingCart();
  const menu = GetMenuData();
  const item = menu.find((item) => item.name === id);
  if (item == null) return null;
  return (
    <div className="divide-y p-2 my-2 border-red-700 shadow-lg border rounded-xl divide-gray-200 space-y-4">
      <div className="flex justify-between h-20 items-center">
        <img
          src={item.imgLink}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-xl"
        />
        <div className="flex flex-col items-end text-right">
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-700 font-semibold">
            Quantity: {input}
          </p>
          <p className="text-sm text-gray-700 font-semibold">
            {item.price * input}
          </p>
          <button
            onClick={() => removeItemFromCart(item.name)}
            className="m-0 px-2 py-0 bg-transparent hover:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
