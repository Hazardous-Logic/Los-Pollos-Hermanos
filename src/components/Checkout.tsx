import React, { useContext, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import {collection, addDoc } from "firebase/firestore";
import { db } from "../libs/firebase";
import { AuthContext } from "../context/AuthContext";
import { useShoppingCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Timer } from "./Timer";
import { Order } from "../hooks/useUserOrders";

export interface CheckoutProps{
  total: number;
  time: number;
}

const Checkout = () => {
  const { currentUser } = useContext(AuthContext);
  const { cartItems, clearCart } = useShoppingCart();
  const navigate = useNavigate();
  //passing props didnt work, this is a workaround
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      navigate('/shop');
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }
  const { total, time } = location.state;

  const [checkoutDone, SetCheckoutDone] = useState(false);
  const [orderId, setOrderId] = useState(""); // State to store the order ID
  const [order, setOrder] = useState<Order>({
    uId : currentUser ? currentUser.uid || "" : "",
    fullName: currentUser ? currentUser.displayName || "" : "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    items: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderData = { ...order, items: cartItems };
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      setOrderId(orderRef.id);
      alert("Order placed successfully");

      setOrder({
        uId: "",
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        items: [],
      });

      clearCart();
      SetCheckoutDone(true);
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Error placing order: " + error);
    }
  };

  return (
    <>
      {checkoutDone ? (
        <>
        <div data-testid="done" className="container mx-auto my-10 rounded-xl shadow-xl text-center items-center flex flex-col py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
          <p className="font-semibold text-xl mb-5">Your meal is on its way! 🙂</p>
          <p className="font-semibold">Order confirmation number:</p>
          <p className="font-bold text-2xl">{orderId}</p>
          <p className="font-semibold">{"Total Paid: " + total+ "ft"}! 🙂</p>
        </div>
        <Timer deliveryTime={time} />
        </>
      ) : (
        <div data-testid="form" className="container mx-auto text-center my-10 rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-4xl font-medium mt-10 text-black text-center">
            Checkout
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="fullName"
                  required
                  type="text"
                  name="fullName"
                  value={order.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  required
                  name="address"
                  value={order.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="city"
                  type="text"
                  required
                  name="city"
                  value={order.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <input
                  className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={order.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={order.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button
              disabled={cartItems.length === 0}
              className="mx-auto"
              pill
              color="success"
              type="submit"
            >
              {cartItems.length === 0 ? "No Items in cart" : "Place Order"}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Checkout;
