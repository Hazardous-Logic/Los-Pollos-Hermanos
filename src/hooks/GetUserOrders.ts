import { useContext, useEffect, useState } from "react";
import { db } from "../libs/firebase";
import { AuthContext } from "../context/AuthContext";
import { Order } from "../components/Checkout";
import { collection, getDocs, query, where } from "firebase/firestore";


export function GetUserOrders() {
    const { currentUser } = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);


    useEffect(() => {
        const getOrders = async () => {
          if (currentUser) {
            //had to change the structure of linking the user to the order for this to work
            //this actually is a more efficient way
            const ordersRef = await getDocs(query(collection(db, "orders"), where("uId", "==", currentUser.uid)));
            const ordersData = ordersRef.docs.map(
              (doc) => doc.data() as Order
            );
            setOrders(ordersData);        
          }
        };
        getOrders();
        // console.log(orders);
        return 
      }, [currentUser]);
      return orders;
}