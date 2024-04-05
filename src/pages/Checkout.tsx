import React, { useContext, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { collection, doc, updateDoc, arrayUnion, addDoc } from "firebase/firestore"; 
import { db } from "../libs/firebase"; 
import { AuthContext } from "../context/AuthContext";
import { useShoppingCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface DeliveryDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

const Checkout = () => {

  const { currentUser } = useContext(AuthContext);
  const { cartItems , clearCart} = useShoppingCart();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Redirect to home page if cart is empty
  //   if (cartItems.length === 0) {
  //     navigate('/shop');
  //   }
  // }, [cartItems, navigate]);

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderRef = await addDoc(collection(db, "orders"), deliveryDetails);
      console.log(orderRef.id);
      alert("Order placed successfully");
      if (currentUser) {
        // Add the order to the user's document
        await updateDoc(doc(db, "users", currentUser.uid), {
          orders: arrayUnion(orderRef)
        });
      }

      setDeliveryDetails({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: ""
      });

     clearCart();

    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Error placing order: " + error);
    }
  };

  return (
    <div className="container mx-auto text-center my-10 rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium mt-10 text-black text-center">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="fullName" type="text" name="fullName" value={deliveryDetails.fullName} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" type="text" name="address" value={deliveryDetails.address} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
              City
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city" type="text" name="city" value={deliveryDetails.city} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="postalCode">
              Postal Code
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="postalCode" type="text" name="postalCode" value={deliveryDetails.postalCode} onChange={handleChange} />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phoneNumber" type="text" name="phoneNumber" value={deliveryDetails.phoneNumber} onChange={handleChange} />
          </div>
        </div>
        <Button disabled={cartItems.length===0} className="mx-auto" pill color="success" type="submit">
          {(cartItems.length===0)?("No Items in cart"):("Place Order")}
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
