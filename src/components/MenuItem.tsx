import { Button } from "flowbite-react";
import { useShoppingCart } from "../context/CartContext";

interface MenuItem {
  name: string;
  imgLink: string;
  description: string;
  price: number;
  prepTime: number;
}

export function MenuItem({
  name,
  imgLink,
  description,
  price,
  prepTime,
}: MenuItem) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useShoppingCart();
  const itemQuantity = getItemQuantity(name);

  return (
    <div className=" bg-yellow-300 rounded overflow-hidden hover:shadow-lg">
      <img className="w-full h-48 object-cover" src={imgLink} alt={name} />
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-700 text-base">Preparation Time: {prepTime} minutes</p>
      </div>
      {itemQuantity === 0 ? (
        <Button
          className="mx-auto mt-3 mb-5"
          pill
          color="failure"
          onClick={() => increaseItemQuantity(name)}
        >
          Add to cart Price: {price} ft
        </Button>
      ) : (
<div className="text-center">
  <div className="flex justify-center space-x-2">
    <Button
      className="mt-3 mb-5"
      pill
      color="success"
      onClick={() => increaseItemQuantity(name)}
    >
      Add more
    </Button>
    <Button
      className="mt-3 mb-5"
      pill
      color="failure"
      onClick={() => decreaseItemQuantity(name)}
    >
      Remove one
    </Button>
    <Button
      className="mt-3 mb-5"
      pill
      color="failure"
      onClick={() => removeItemFromCart(name)}
    >
      Clear Qty {itemQuantity}
    </Button>

  </div>
    {/* <p >Quantity: </p> */}
</div>
      )}
    </div>
  );
}
