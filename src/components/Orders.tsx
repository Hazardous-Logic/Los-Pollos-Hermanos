import { GetUserOrders } from "../hooks/useUserOrders";

const Orders = () =>{

  const orders = GetUserOrders();
    return (
  <div className="container mx-auto my-10 rounded-xl py-5 md:w-2/3 lg:w-1/2 flex flex-col items-center bg-yellow-300">
        <h2 className="text-4xl font-medium mt-10 text-black text-center mb-5">Order History</h2>
        <ul className="list-none w-1/2 p-0">
          {orders.map((order, index) => (
            <li key={index} className="mb-6 p-7 shadow-xl bg-gray-200 text-gray-700 border border-gray-200 flex flex-col items-center rounded-xl">
              <h3 className="text-xl font-semibold">Order {index + 1}</h3>
              <p><strong>Full Name:</strong> {order.fullName}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>City:</strong> {order.city}</p>
              <p><strong>Postal Code:</strong> {order.postalCode}</p>
              <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
              <h4 className="text-xl font-semibold">Items:</h4>
              <ul className="list-none">
                {order.items.map((item, i) => (
                  <li key={i}>
                    Item: {item.id}, Quantity: {item.input}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Orders;