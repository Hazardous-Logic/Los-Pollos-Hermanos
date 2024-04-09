import { db } from "../libs/firebase";
import { AuthContext } from "../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { Order } from "./Checkout";


const Orders = () =>{
    const { currentUser } = useContext(AuthContext);

    const [pastOrders, setPastOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Fetch past orders from Firestore
        const fetchPastOrders = async () => {
          try {
            const ordersSnapshot = await db.collection('users').doc(userCredential.user.uid).get();
            const userData = ordersSnapshot.data();
            if (userData && userData.orders) {
              setPastOrders(userData.orders);
            }
          } catch (error) {
            console.error('Error fetching past orders:', error);
          }
        };
    
        fetchPastOrders();
      }, []);


    return(
        <div>
          <h1>hello </h1>
        </div>
    );
}

export default Orders;