// File: src/components/AddMenuItem.test.tsx
// AddMenuItem.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import AddMenuItem from './AddMenuItem';
import '@testing-library/jest-dom/vitest';


describe('AddMenuItem Component', () => {
  it('renders without crashing', () => {
    render(<AddMenuItem />);
    expect(screen.getByText(/Add New Menu Item/i)).toBeInTheDocument();
  });
});

// File: src/components/AddMenuItem.tsx
import { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore"; 
import { db } from "../libs/firebase"; 
import { Button } from "flowbite-react";
import { MenuItemData } from "../hooks/GetMenuData";

const AddMenuItem = () => {
  const [newMenuItem, setNewMenuItem] = useState<MenuItemData>({name: "", imgLink: "", description: "", price: 0, prepTime: 0});

  //to make sure that the fields are converted to number type correctly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: name === "price" || name === "prepTime" ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setDoc(doc(collection(db, "menu"), newMenuItem.name), newMenuItem);
      alert("Menu Item added successfully");
      setNewMenuItem({ name: "", imgLink: "", description: "", price: 0, prepTime: 0 });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding document: " + error);
    }
  };

  return (
    <div className="container mx-auto text-center my-10 rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">Add New Menu Item</h2>
      <form onSubmit={handleSubmit} >
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prepTime">
              Name
            </label>
            <input required className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" name="name" value={newMenuItem.name} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="imgLink">
              Image Link
            </label>
            <input required className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="imgLink" type="text" name="imgLink" value={newMenuItem.imgLink} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
            Preparation Time (minutes)
            </label>
            <input required className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="prepTime" type="number" name="prepTime" value={newMenuItem.prepTime} onChange={handleChange} />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
              Price (HUF)
            </label>
            <input required className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="price" type="number" name="price" value={newMenuItem.price} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea required className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" name="description" rows={3} value={newMenuItem.description} onChange={handleChange}></textarea>
          </div>
        </div>
        <Button data-testid="submit-button" className="mx-auto" pill color="failure" type="submit">
          Add Menu Item
        </Button>
      </form>
    </div>
  );
}

export default AddMenuItem;
// File: src/components/Admin.test.tsx
// Admin.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, } from 'react-router-dom';
import Admin from './Admin';
import '@testing-library/jest-dom/vitest';

  
describe('Admin Component', () => {  
    it('should show not allowed message when user is not an admin', () => {
        
      vi.mock('../hooks/UseCheckAdmin', () => ({
        UseCheckAdmin: () => [false, vi.fn()]
      }));
  
      render(
        <MemoryRouter>
          <Admin />
        </MemoryRouter>
      );

      expect(screen.getByTestId('non-admin')).toBeInTheDocument();
      screen.debug();
      });
  
    // it('should show admin features for admin user', () => {
    //   vi.mock('../hooks/UseCheckAdmin', () => ({
    //     UseCheckAdmin: () => [true, vi.fn()]
    //   }));
  
    //   render(
    //     <MemoryRouter>
    //       <Admin />
    //     </MemoryRouter>
    //   );
  
    //  expect(screen.getByTestId('admin')).toBeInTheDocument();
    // });
  });
// File: src/components/Admin.tsx
import { Button } from "flowbite-react";
import AddMenuItem from "./AddMenuItem";
import DeleteMenuItem from "./DeleteMenuItem";
import { UseCheckAdmin } from "../hooks/UseCheckAdmin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAdmin] = UseCheckAdmin();
  const navigate = useNavigate();

  return (
    <>
      {isAdmin ? (
        <div data-testid="admin">
          <AddMenuItem />
          <DeleteMenuItem />
        </div>
      ) : (
        <div data-testid="non-admin" className="container mx-auto my-10 rounded-xl text-center items-center flex flex-col py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
          <p className="font-semibold">You lack the privileges to access this page. 🙂</p>
          <Button
            className="mt-3 mb-3"
            pill
            color="failure"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </div>
      )}
    </>
  );
};

export default Admin;
// File: src/components/AuthPages.test.tsx
import { it, expect, describe,vi } from 'vitest'
import { render, waitFor, screen } from "@testing-library/react";
import AuthPages from "./AuthPages"; // Adjust the import path as necessary
import { Navigate } from "react-router-dom";
import '@testing-library/jest-dom/vitest';

vi.mock("react-router-dom", () => ({
  Navigate: vi.fn(() => null),
}));

describe("AuthPages", () => {
  it("displays a loading spinner initially", async () => {
    render(<AuthPages><></></AuthPages>);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("navigates to login if no user is authenticated", async () => {
    render(<AuthPages><></></AuthPages>);
    await waitFor(() => expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {}));
  });
});

// File: src/components/AuthPages.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { auth } from "../libs/firebase";

const AuthPages = ({ children }: { children: JSX.Element }) => {
  const [isUser, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.authStateReady().then(() => {
      if (!auth.currentUser) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div data-testid="loading" className="flex items-center justify-center h-[400px] ">
          <Spinner customStyle="animate-spin" w="48" h="48" />
        </div>
      ) : (
        <>{isUser ? <>{children}</> : <Navigate to={"/login"} />}</>
      )}
    </>
  );
};

export default AuthPages;

// File: src/components/CartItem.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { CartItem , Item } from './CartItem';


describe('CartItem', () => {
  it('renders without crashing', () => {
    const mockItem: Item = {
      id: '1',  // Ensure a string value is provided for the id
      input: 1, // A valid number for input
    };

    render(<CartItem {...mockItem} />);
    //Will output the rendered DOM for debugging

    //Optional: Check for specific output to verify rendering
   //expect(1).toBeTruthy;
  });
});

// File: src/components/CartItem.tsx
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

// File: src/components/Checkout.teszt.tsx
// Checkout.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Checkout from './Checkout';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Checkout Component', () => {
  it('renders without crashing', () => {
    render(
        <MemoryRouter>
        <Checkout />
      </MemoryRouter>
);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});
// File: src/components/Checkout.tsx
import React, { useContext, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import {collection, addDoc } from "firebase/firestore";
import { db } from "../libs/firebase";
import { AuthContext } from "../context/AuthContext";
import { useShoppingCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Item } from "./CartItem";
import { Timer } from "./Timer";

export interface Order {
  uId : string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  items: Item[];
}

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
  //const [orderId, setOrderId] = useState<string | null>(null); // State to store the order ID
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
      // console.log(orderRef.id);
      setOrderId(orderRef.id);
      alert("Order placed successfully");
      // if (currentUser) {
      //   // Add the order to the user's document
      //   await updateDoc(doc(db, "users", currentUser.uid), {
      //     orders: arrayUnion(orderRef),
      //   });
      // }

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

// File: src/components/DeleteMenuItem.test.tsx
// DeleteMenuItem.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import DeleteMenuItem from './DeleteMenuItem';
import '@testing-library/jest-dom/vitest';

const mockMenu = [
  { name: 'Burger', imgLink: 'link-to-burger.jpg', description: 'Juicy grilled burger', price: 8.99, prepTime: 15 },
  { name: 'Pizza', imgLink: 'link-to-pizza.jpg', description: 'Cheesy pepperoni pizza', price: 12.99, prepTime: 20 },
  { name: 'Salad', imgLink: 'link-to-salad.jpg', description: 'Fresh garden salad', price: 6.99, prepTime: 10 }
];

// Mock the GetMenuData hook
vi.mock('../hooks/GetMenuData', () => ({
  GetMenuData: vi.fn(() => mockMenu)
}));

// afterEach(() => {
//   cleanup();
//   vi.restoreAllMocks();
// });

describe('DeleteMenuItem Component with mock data', () => {
  render(<DeleteMenuItem />);
  it('renders correctly with mock data', () => {
    expect(screen.getByTestId("deleteItem")).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('select populates with mock data', () => {
    const selectElement = screen.getByRole('combobox');
    expect(selectElement.children).toHaveLength(4); // includes the initial "Select..." option
  });

  it('button is disabled by default', () => {
    expect(screen.getByRole('button', { name: 'Delete Menu Item' })).toBeDisabled();
  });

  it('enables button when a menu item is selected', () => {
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Salad' } });
    const button = screen.getByRole('button', { name: 'Delete Menu Item' });
    expect(button).toBeEnabled();
  });
});

// File: src/components/DeleteMenuItem.tsx
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore"; 
import { db } from "../libs/firebase"; 
import { Button } from "flowbite-react";
import { GetMenuData } from "../hooks/GetMenuData";

const DeleteMenuItem = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const menu = GetMenuData();

  const handleDelete = async () => {
    try {
      const menuItemRef = doc(db, "menu", selectedItem);
      await deleteDoc(menuItemRef);
      alert("Menu Item deleted successfully");
      setSelectedItem(""); // Reset selected item
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Error deleting document: " + error);
    }
  };

  return (
    <div data-testid="deleteItem" className="container mx-auto text-center my-10 rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">Delete Menu Item</h2>
      <div className="flex flex-wrap mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="menuItems">
            Select Menu Item
          </label>
          <select className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="menuItems" value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
            <option value="">Select...</option>
            {menu.map((menuItem, index) => (
              <option key={index} value={menuItem.name}>{menuItem.name}</option>
            ))}
          </select>
        </div>
      </div>
      <Button className="mx-auto" pill color="failure" onClick={handleDelete} disabled={!selectedItem}>
        Delete Menu Item
      </Button>
    </div>
  );
}

export default DeleteMenuItem;

// File: src/components/Feedback.test.tsx
import { expect,describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Feedback from './Feedback';
import '@testing-library/jest-dom/vitest';
import { db } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";

// Mock the Firestore functions
// vi.mock('../libs/firebase', () => ({
//   db: {},
//   collection: vi.fn(() => 'feedback'),
//   addDoc: vi.fn(() => Promise.resolve({ id: '123' }))
// }));

describe('Feedback Component', () => {
  it('renders without crashing', () => {
    render(<Feedback />);
    expect(screen.getByText('Add Feedback')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Comments')).toBeInTheDocument();
  });

  it('allows entering input', () => {
    render(<Feedback />);
    const nameInput = screen.getByLabelText('Your Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

//   it('submits the form and resets the input fields', async () => {
    
//     render(<Feedback />);
//     const nameInput = screen.getByLabelText('Your Name') as HTMLInputElement;
//     const emailInput = screen.getByLabelText('Your Email') as HTMLInputElement;
//     const commentsTextArea = screen.getByLabelText('Comments') as HTMLTextAreaElement;
//     const ratingSelect = screen.getByLabelText('Rating') as HTMLSelectElement;

//     // Simulate filling out the form
//     fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
//     fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
//     fireEvent.change(commentsTextArea, { target: { value: 'Great service!' } });
//     fireEvent.change(ratingSelect, { target: { value: '5' } });

//     const submitButton = screen.getByRole('button', { name: 'Add Review' });
//     fireEvent.click(submitButton);

//     // Check if addDoc was called (using the mocked implementation)
//     await expect(addDoc).toHaveBeenCalled();

//     // Check if inputs are reset
//     expect(nameInput.value).toBe('');
//     expect(emailInput.value).toBe('');
//     expect(commentsTextArea.value).toBe('');
//     expect(ratingSelect.value).toBe('0');
//   });
});

// File: src/components/Feedback.tsx
import { useState } from "react";
import { db } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "flowbite-react";
import { ReviewData } from "../hooks/GetReviews";
import { Reviews } from "./Reviews";

const Feedback = () => {
    const [review, setReview] = useState<ReviewData>({
        name: "",
        email: "",
        comments: "",
        rating: 0 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // If the name is rating, parse the value as an integer
        const newValue = name === 'rating' ? parseInt(value, 10) : value;
        setReview({ ...review, [name]: newValue });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "feedback"), review);
            alert("Review added successfully");
            setReview({
                name: "",
                email: "",
                comments: "",
                rating: 0 // Reset rating to 0 after submission
            });
        } catch (error) {
            console.error("Error adding review: ", error);
            alert("Error adding review: " + error);
        }
    };

    return (
        <>
        <div className="container mx-auto my-10 rounded-xl py-5 text-center bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">Add Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Your Name
                        </label>
                        <input className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" name="name" value={review.name} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Your Email
                        </label>
                        <input className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" name="email" value={review.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="rating">
                            Rating
                        </label>
                        <select className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="rating" name="rating" value={review.rating} onChange={handleChange}>
                            <option value="0">0</option>
                            <option value="1">1 ⭐</option>
                            <option value="2">2 ⭐⭐</option>
                            <option value="3">3 ⭐⭐⭐</option>
                            <option value="4">4 ⭐⭐⭐⭐</option>
                            <option value="5">5 ⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="comments">
                            Comments
                        </label>
                        <textarea className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="comments" name="comments" rows={3} value={review.comments} onChange={handleChange}></textarea>
                    </div>
                </div>
                <Button className="mx-auto" pill color="failure" type="submit">
                    Add Review
                </Button>
            </form>
        </div>
            <Reviews />
            </>
        
    );
}

export default Feedback;

// File: src/components/Foot.test.tsx
// Home.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Foot from './Foot';
import '@testing-library/jest-dom/vitest';

describe('Story Component', () => {
  it('renders without crashing', () => {
    render(<Foot />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
// File: src/components/Foot.tsx
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

function Foot() {
  return (
    <div data-testid="footer" className='container mx-auto mb-5'>
         <Footer container className='bg-yellow-300 rounded-xl shadow-xl'>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              src="Los_Pollos.webp "
              alt="Flowbite Logo"
              name="Los Pollos Hermanos"
            />
          </div>
          <div className="">
            <div>
              <Footer.Title title="Contact Us!" />
              <Footer.LinkGroup col>
                <Footer.Link href="mailto:Raeolin@live.com">Email Us!: Raeolin@live.com</Footer.Link>
                <Footer.Link href="tel:+36 30 939 9075">Call us!: +36 30 939 9075</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
            {/* <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
          </div>
        </div>
        <Footer.Divider className='border-red-500' />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright by="Los Pollos Hermanos™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/" icon={BsInstagram} />
            <Footer.Icon href="https://github.com/Hazardous-Logic/Los-Pollos-Hermanos" icon={BsGithub} />
          </div>
          <Footer.Copyright by="Taste The Family!" />
        </div>
      </div>
    </Footer>
    </div>
   
  );
}

export default Foot;
// File: src/components/ForgotPassword.test.tsx
// ForgotPassword.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';
import '@testing-library/jest-dom/vitest';

describe('ForgotPassword Component', () => {
  it('renders without crashing', () => {
    render(<ForgotPassword />);
    expect(screen.getByTestId('forgot')).toBeInTheDocument();
  });
});
// File: src/components/ForgotPassword.tsx
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../libs/firebase";

const ForgotPassword = () => {
  const [sentMail, setSentMail] = useState(false);

  const [errHandler, setErrHandler] = useState({
    isError: false,
    errorMsg: "",
  });
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formValues = new FormData(form);

    try {
      await sendPasswordResetEmail(auth, formValues.get("email") as string);
      setSentMail(true);
    } catch (error) {
      setErrHandler({
        isError: true,
        errorMsg: "Error while sending email. Trying again later.",
      });
    }
  };
  return (
    <div data-testid="forgot" className="container mx-auto my-10 rounded-xl py-5 text-center bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">Password Reset</h2>
      <div className="auth-options w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleForgotPassword}
          className="w-[100%] mx-auto md:w-auto mt-5"
        >
          <label htmlFor="email" className="mt-5 block text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
          />

          {sentMail ? (
            <>
              <div className="  w-full md:w-[400px] flex flex-col gap-3 items-center justify-center bg-green-600 text-white mt-5 rounded-md px-3 py-2">
                <h3 className="font-semibold">Mail sent successfully.</h3>
                <p>
                  Please check your spam folder if you can't find it in inbox.
                </p>

                <Link
                  to="/login"
                  className="border-white border-2 px-3 py-1 rounded-md"
                >
                  Back to Login
                </Link>
              </div>
            </>
          ) : null}

          {errHandler.isError ? (
            <div className="w-[100%] mx-auto md:w-auto bg-red-600 mt-3 rounded-md px-3 py-2 text-white">
              {errHandler.errorMsg}
            </div>
          ) : null}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-700 mt-5 w-full px-10 py-2 rounded-full text-white hover:scale-95 duration-100 ease-in "
            >
              Send Reset Mail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

// File: src/components/GoogleLogin.test.tsx
// GoogleLogin.test.tsx
import { describe, it, expect, vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import GoogleLogin from './GoogleLogin';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, createMemoryRouter } from 'react-router-dom';

describe('GoogleLogin Component', () => {
  it('renders without crashing', () => {
    
    render(<MemoryRouter><GoogleLogin           
      isLoading={false}
      setIsLoading={vi.fn()}
      message="Sign in with Google"/></MemoryRouter>);
    expect(screen.getByTestId('googleLogin')).toBeInTheDocument();
    screen.debug();
  });
});
// File: src/components/GoogleLogin.tsx
import {GoogleAuthProvider,getRedirectResult, signInWithRedirect} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, db } from "../libs/firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

interface Props {
  message: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleLogin = ({ message, isLoading, setIsLoading }: Props) => {
  const [errHandler, setErrHandler] = useState({
    isError: false,
    errorMsg: "",
  });

  const [signInLoading, setSignInLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setIsLoading(true);
      setSignInLoading(true);
      setErrHandler({ isError: false, errorMsg: "" });
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setIsLoading(false);
      setSignInLoading(false);
      setErrHandler({
        isError: true,
        errorMsg: "Error while log in with google.",
      });
    }
  }

  const authResult = async () => {
    try {
      setSignInLoading(true);
      const user = await getRedirectResult(auth);
      return user;
    } catch (error) {
      setIsLoading(false);
      setSignInLoading(false);
      setErrHandler({
        isError: true,
        errorMsg: "Error while log in with google.",
      });

      return null;
    }
  };

  useEffect(() => {
    authResult()
      .then(async (res) => {
        setSignInLoading(false);
        if (!res) {
          return;
        }

        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          navigate("/");
          return;
        }

        await setDoc(docRef, {
          name: res.user.displayName,
          email: res.user.email,
          timeStamp: serverTimestamp(),
        });
        navigate("/");
      })
      .catch(() => {
        setIsLoading(false);
        setSignInLoading(false);
        setErrHandler({
          isError: true,
          errorMsg: "Error while log in with google.",
        });

        return null;
      });
  }, []);

  return (
    <>
      <button
        data-testid="googleLogin"
        onClick={handleLogin}
        type="button"
        className=" hover:scale-95 duration-100 ease-in bg-white flex mt-10 w-[100%] md:w-[400px] shadow-xl py-2 px-10 md:px-16 rounded-full items-center justify-center disabled:bg-gray-50 "
        disabled={isLoading}
      >
        {signInLoading ? (
          <>
            <div className="animate-spin mr-2 ">
              <Spinner />
            </div>
            <p>{message}</p>
          </>
        ) : (
          <>
            <svg
              className="mr-2 h-6 w-6"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="github"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
              <path d="M1 1h22v22H1z" fill="none"></path>
            </svg>
            <p>{message}</p>
          </>
        )}
      </button>

      <div className="w-[100%] md:w-[400px] mx-auto">
        {errHandler.isError ? (
          <div className="  bg-red-600 mt-3 rounded-md px-3 py-2 text-white">
            {errHandler.errorMsg}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GoogleLogin;

// File: src/components/Home.test.tsx
// Home.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/vitest';

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
// File: src/components/Home.tsx
function Home() {
  return (
    <div data-testid="home" className="container rounded-xl py-4 mx-auto">
      <img
        src="Home.jpg"
        alt="Home"
        className="rounded-xl w-full h-full shadow-xl"
      />
    </div>
  );
}

export default Home;

// File: src/components/l.tsx
// Import the necessary modules from Vitest and Testing Library
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

// Explicitly mock firebase/auth
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  // Add any other methods or properties you use from 'firebase/auth'
}));

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // Import and spread the actual module
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockNavigate.mockClear();
    vi.clearAllMocks();
  });

  it('should navigate to the home page on successful login', async () => {
    const userCredentialMock = {
      user: {
        emailVerified: true,
        email: 'test@example.com',
      },
    };

    // Get the mocked function and set it to resolve with the mock user credentials
    const signInMock = vi.mocked(signInWithEmailAndPassword);
    signInMock.mockResolvedValue(userCredentialMock);

    render(
      <AuthContext.Provider value={{ currentUser: null }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith(
        expect.anything(), // Adjust according to your real implementation, for instance passing auth instance
        'test@example.com',
        'password123'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});

// File: src/components/Loading.test.tsx
// Home.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';
import '@testing-library/jest-dom/vitest';

describe('Loading Component', () => {
  it('renders without crashing', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
// File: src/components/Loading.tsx
import Spinner from "./Spinner";

const Loading = () => {
  return (
      <div data-testid="loading" className=" flex items-center justify-center h-[400px] ">
        <Spinner customStyle="animate-spin" w="48" h="48" />
      </div>
  );
};

export default Loading;

// File: src/components/Login.tsx
import React, { useState, useContext } from "react";
import GoogleLogin from "./GoogleLogin";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { auth } from "../libs/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const [errHandler, setErrHandler] = useState({
    isError: false,
    errorMsg: "",
  });

  const [emailNotVerified, setEmailNotVerified] = useState(false);

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/" />;
  }

  const FIREBASE_ERRORS = {
    "auth/email-already-in-use": "A user with that email already exists",
    "auth/weak-password":
      "Please check your password. It should be 6+ characters",
    "auth/user-not-found": "Invalid email or password",
    "auth/invalid-credential": "Invalid email or password",
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formValues = new FormData(form);

    try {
      // this is a trick to resolve the issue to resolve the authStateChanged when user verifies their email and login then it doesnot changes as it is same as signup
      await signOut(auth);
      setIsLoading(true);
      setEmailNotVerified(false);
      setErrHandler({ isError: false, errorMsg: "" });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formValues.get("email") as string,
        formValues.get("password") as string
      );
      if (userCredential.user) {
        if (!userCredential.user.emailVerified) {
          setEmailNotVerified(true);
          setErrHandler({
            isError: true,
            errorMsg: "Please verify your mail before logging in.",
          });
        } else {
          navigate("/");
        }
      }
    } catch (error: unknown) {
      const err = error as FirebaseError;
      // console.log("Firebase Error Code:", err.code); // Debug log
      // console.log("Firebase Error Message:", err.message); // Debug log
      // console.log("Error Object:", err); // Debug log
      // console.log("FIREBASE_ERRORS:", FIREBASE_ERRORS); // Debug log
      console.log("Error Message:", FIREBASE_ERRORS[err.code as keyof typeof FIREBASE_ERRORS]); // Debug log
      setErrHandler({
        isError: true,
        errorMsg: FIREBASE_ERRORS[err.code as keyof typeof FIREBASE_ERRORS] || "Login error. Please check your credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10 rounded-xl py-5 text-center bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">Log in</h2>
      <div className="auth-options w-full flex flex-col items-center justify-center">
        <GoogleLogin
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          message="Sign in with Google"
        />
        <div className="mt-5 mb-3 w-full md:w-[380px] flex items-center justify-center">
          <div className="before-or w-[100%] h-[2px] bg-gray-900 mr-2"></div>
          <p className="text-black or">OR</p>
          <div className="after-or w-[100%] h-[2px] bg-gray-900 ml-2"></div>
        </div>
        <form onSubmit={handleLogin} className="w-[100%] mx-auto md:w-auto">
          <label htmlFor="email" className="mt-5 block text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
          />
          <label htmlFor="password" className="mt-5 block text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              required
              className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
            />
            <button
              type="button"
              aria-label={showPass ? "Password Visible" : "Password Invisible"}
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  ></path>
                </svg>
              )}
            </button>

            <div className="mt-2 flex justify-end">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          {errHandler.isError ? (
            <div className="w-[100%] text-center mx-auto md:w-auto bg-red-600 mt-3 rounded-md px-3 py-2 text-white">
              {errHandler.errorMsg}

              {emailNotVerified ? (
                <div className="  w-full flex items-center  mt-5 mb-2 justify-center">
                  <Link className="border-2 px-3 py-1 rounded-md" to="/verify">
                    Verify Email
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-700 mt-5 w-full px-10 py-2 rounded-full text-white hover:scale-95 duration-100 ease-in "
            >
              Log in
            </button>
          </div>
        </form>
        <p className="mt-5 text-left">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

// File: src/components/MenuItem.tsx
import { Button } from "flowbite-react";
import { useShoppingCart } from "../context/CartContext";
import { MenuItemData } from "../hooks/GetMenuData";

export function MenuItem({
  name,
  imgLink,
  description,
  price,
  prepTime,
}: MenuItemData) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
  } = useShoppingCart();
  const itemQuantity = getItemQuantity(name);

  return (
    <div className=" bg-yellow-300 rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
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

// File: src/components/Nav.test.tsx
// Nav.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Nav from './Nav';
import React from 'react';
import { User } from 'firebase/auth';
import '@testing-library/jest-dom/vitest';


// Define the type for the context value
interface AuthContextType {
  currentUser: User | null;
}

// Helper function to render component with necessary context
const renderWithAuthContext = (ui: React.ReactElement, providerProps: AuthContextType) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Nav Component', () => {
  it('should show login button when user is not logged in', () => {
    renderWithAuthContext(<Nav />, { currentUser: null });
    // const loginButton = screen.getByText(/Login \/ Register/i)
    // expect(loginButton).toBeInTheDocument();
    // expect(loginButton).toHaveTextContent(/Login \/ Register/i);
    expect(screen.getByText(/Login \/ Register/i)).toBeInTheDocument();
    screen.debug();
  });

  it('should display the user name when they are logged in', () => {
    const mockUser: User = {
      displayName: 'John Doe',
      email: 'johndoe@example.com',
    } as User;

    renderWithAuthContext(<Nav />, { currentUser: mockUser });
    expect(screen.getByText(/Hola! John Doe/i)).toBeInTheDocument();
  });
  
  it('should show not the admin tab for a normal user', () => {
    const mockUser: User = {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
      } as User;

    renderWithAuthContext(<Nav />, { currentUser: mockUser });
    expect(screen.queryByText(/Admin/i)).not.toBeInTheDocument();
  });

});





// File: src/components/Nav.tsx
import { Dropdown, Navbar, Button } from 'flowbite-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink , useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../libs/firebase';
import { useShoppingCart } from "../context/CartContext";
import { UseCheckAdmin } from "../hooks/UseCheckAdmin";

function Nav() {
  const { currentUser } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = UseCheckAdmin();
  const { cartItems , clearCart } = useShoppingCart();
  const navigate = useNavigate();
  const handleLogout = async () => {

    if (cartItems.length > 0) {
      const confirmLogout = window.confirm("You have items in your cart. Are you sure you want to logout and lose your items?");
      if (!confirmLogout) {
        return; // Do not proceed with logout
      }
    }

    await signOut(auth);
    clearCart();
    setIsAdmin(false);
    navigate("/");
  };

  const userName = currentUser?.displayName || 'Default Name';
  const userEmail = currentUser?.email || 'default@email.com';

  return (
    <div className='container mx-auto mt-5 tracking-wide'>
      <Navbar fluid className='bg-yellow-300 shadow-xl rounded-xl'>
        <Navbar.Brand as={Link} to="/">
          <img src="/Los_Pollos.webp" className="mr-7 h-20 sm:h-36" alt="Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          {currentUser ? (
            <Dropdown
              className='bg-yellow-300 border-red-500'
              arrowIcon={true}
              inline
              label={
                  <div className="space-y-1 font-medium dark:text-white">
                    <div className='text-red-500'>Hola! {userName}</div>
                    <div className="text-sm text-red-500 dark:text-gray-400">{userEmail}</div>
                  </div>
              }
            >
              <Dropdown.Header className='text-red-500'>
                <span className="block text-sm">{userName}</span>
                <span className="block truncate text-sm font-medium">{userEmail}</span>
              </Dropdown.Header>
              <Dropdown.Item as={Link} to="/Profile">My profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/Orders">Orders</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item  onClick={handleLogout}>Sign out</Dropdown.Item>

            </Dropdown>
          ) : (
            <Link to="/login">
              <Button color="failure" pill size="lg">
                Login / Register
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={NavLink} to="/" active className="text-xl">Home</Navbar.Link>
          <Navbar.Link as={NavLink} to="/shop" className="text-xl">Order</Navbar.Link>
          <Navbar.Link as={NavLink} to="/contact" className="text-xl">Feedback</Navbar.Link>
          <Navbar.Link as={NavLink} to="/story" className="text-xl">Our Story</Navbar.Link>
          {isAdmin && <Navbar.Link as={NavLink} to="/admin" className="text-xl">Admin</Navbar.Link>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Nav;
// File: src/components/NotFound.tsx
// NotFound.tsx

import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";


const NotFound = () => {

    const navigate = useNavigate();
  return (
    <div className="container mx-auto my-10 rounded-xl text-center items-center flex flex-col py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h1 className="text-3xl font-medium mt-10 text-black text-center">
        404 - Page Not Found
      </h1>
      <p className="mt-5 text-lg">
        Seems like you have lost your way Amigo. 🤠
      </p>
      <Button
            className="mt-3 mb-3"
            pill
            color="failure"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
    </div>
  );
};

export default NotFound;
// File: src/components/Orders.test.tsx
// Orders.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Orders from './Orders';
import '@testing-library/jest-dom/vitest';
// Mock data for orders
const mockOrders = [
  {
    fullName: "John Doe",
    address: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
    phoneNumber: "555-1234",
    items: [
      { id: "item1", input: 1 },
      { id: "item2", input: 2 }
    ]
  },
  {
    fullName: "Jane Smith",
    address: "456 Elm St",
    city: "Othertown",
    postalCode: "67890",
    phoneNumber: "555-5678",
    items: [
      { id: "item3", input: 3 }
    ]
  }
];

// Mocking GetUserOrders hook
vi.mock('../hooks/GetUserOrders', () => ({
  GetUserOrders: vi.fn(() => mockOrders)
}));

// Add afterEach to clean up after each test
afterEach(() => {
  cleanup();
});

describe('Orders Component', () => {
  it('should render all orders correctly', () => {
    render(<Orders />);
    expect(screen.getByText(/Order History/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Full Name:/i).length).toBe(2); // Because two orders
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });

  it('should display each order\'s details', () => {
    render(<Orders />);
    // Check for details in the first order
    expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
    expect(screen.getByText(/Anytown/)).toBeInTheDocument();
    expect(screen.getByText(/12345/)).toBeInTheDocument();
    expect(screen.getByText(/555-1234/)).toBeInTheDocument();
    expect(screen.getByText(/Item: item1, Quantity: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Item: item2, Quantity: 2/)).toBeInTheDocument();

    // Check for details in the second order
    expect(screen.getByText(/456 Elm St/)).toBeInTheDocument();
    expect(screen.getByText(/Othertown/)).toBeInTheDocument();
    expect(screen.getByText(/67890/)).toBeInTheDocument();
    expect(screen.getByText(/555-5678/)).toBeInTheDocument();
    expect(screen.getByText(/Item: item3, Quantity: 3/)).toBeInTheDocument();
  });
});
// File: src/components/Orders.tsx
import { GetUserOrders } from "../hooks/GetUserOrders";

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
// File: src/components/Profile.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, waitFor ,screen} from '@testing-library/react';
import Profile from './Profile';
import '@testing-library/jest-dom/vitest';

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    Navigate: vi.fn(() => null),
    useNavigate: vi.fn(() => mockNavigate),
}));

describe('Profile Component', () => {
    it('renders without crashing', () => {
        render(<Profile />);
        expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

    it("navigates to login if no user is authenticated", async () => {
        render(<Profile />);
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });
});

// File: src/components/Profile.tsx
import { useState, useEffect } from "react";
import { auth, db } from "../libs/firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Button } from "flowbite-react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  fullName: string;
  birthday: string;
}

const Profile = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [updates, setUpdates] = useState<UserProfile>({
    fullName: "",
    birthday: "",
  });
  const [createdAt, setCreatedAt] = useState<string>("");
  const [lastLoginAt, setLastLoginAt] = useState<string>("");

  useEffect(() => {
    //console.log(currentUser);
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData) {
              setUpdates({
                fullName: userData.name || "",
                birthday: userData.birthday || "", // Set birthday if available
              });
            }
          }
          const user = auth.currentUser;
          if (user) {
            setCreatedAt(user.metadata.creationTime || "");
            setLastLoginAt(user.metadata.lastSignInTime || "");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdates({ ...updates, [name]: value });
  };

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.uid), {
          name: updates.fullName,
          birthday: updates.birthday,
        });
        alert("Profile updated successfully!");
      } else {
        alert("User not logged in.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        "An error occurred while updating profile. Please try again later."
      );
    }
  };

  const deleteUserAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmation) {
      try {
        if (currentUser) {
          // Delete user data from Firestore
          await deleteDoc(doc(db, "users", currentUser.uid));
          
          // Delete user account from Firebase Authentication
          await currentUser.delete();
  
          alert("Your account has been deleted successfully!");
  
        } else {
          alert("User not logged in.");
        }
      } catch (error) {
        console.error("Error deleting user account:", error);
        alert("An error occurred while deleting your account. Please try again later.");
      } finally {
        navigate("/login");
      }
    }
  };
  

  return (
    <div data-testid="profile" className="container mx-auto my-10 text-center rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">
        Profile Settings
      </h2>
      <form onSubmit={updateProfile}>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Update Your Name
            </label>
            <input
              className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              name="fullName"
              required
              value={updates.fullName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Add Your Birthday
            </label>
            <input
              className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="birthday"
              type="date"
              name="birthday"
              value={updates.birthday}
              onChange={handleChange}
            />
          </div>
        </div>
        <p className="tracking-wide font-bold text-gray-700 my-5">User ID: {currentUser?.uid}</p>
        <p className="tracking-wide font-semibold text-gray-700 my-5">Account created: {createdAt}</p>
        <p className="tracking-wide font-semibold text-gray-700 my-5=">Last login: {lastLoginAt}</p>

        <Button
          disabled={false}
          className="mx-auto mt-5"
          pill
          color="success"
          type="submit"
        >
          {"Update Profile"}
        </Button>

        <Button
          className="mx-auto mt-5"
          pill
          color="failure"
          onClick={deleteUserAccount}
        >
          Delete Account
        </Button>


      </form>
    </div>
  );
};

export default Profile;

// File: src/components/Reviews.test.tsx
// Reviews.test.tsx
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import {Reviews} from './Reviews';
import '@testing-library/jest-dom/vitest';
import React from 'react';

// Mock data for reviews
const mockReviews = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    comments: "Great service!",
    rating: 5
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    comments: "Good, but a bit slow.",
    rating: 3
  },
  {
    name: "Carol White",
    email: "carol@example.com",
    comments: "Exceptional quality!",
    rating: 4
  },
  {
    name: "Dave Brown",
    email: "dave@example.com",
    comments: "Not what I expected.",
    rating: 2
  },
  {
    name: "Eve Black",
    email: "eve@example.com",
    comments: "Could be better.",
    rating: 2
  }
];



describe('Reviews Component', () => {

  // it('displays a message when there are no reviews', () => {
  //   cleanup();
  //   vi.mock('../hooks/GetReviews', () => ({
  //     GetReviews: vi.fn(() => [])
  //   }));

  //   render(<Reviews />);
  //   expect(screen.getByText(/No reviews available/i)).toBeInTheDocument();
  //   screen.debug();
  //   cleanup();
  // });

  it('renders top five reviews sorted by rating', () => {
    // Mocking GetReviews hook
    vi.mock("../hooks/GetReviews", () => ({
      GetReviews: vi.fn(() => mockReviews),
    }));

    render(<Reviews />);
    expect(screen.getByText(/Latest Reviews/i)).toBeInTheDocument();
    const ratings = screen.getAllByText(/out of 5/i);
    expect(ratings.length).toBe(5); // Ensures only top five reviews are shown
    expect(ratings[0].textContent).toContain("5");
    expect(ratings[1].textContent).toContain("4");
    expect(ratings[2].textContent).toContain("3");
    expect(ratings[3].textContent).toContain("2");
    expect(ratings[4].textContent).toContain("2");
    expect(screen.getByText("Great service!")).toBeInTheDocument(); // Highest rating comment
    expect(screen.getByText("Good, but a bit slow.")).toBeInTheDocument(); // Check if comments are correctly associated
    screen.debug();
    cleanup();
  });
});


// File: src/components/Reviews.tsx
import { Rating } from 'flowbite-react';
import { GetReviews } from '../hooks/GetReviews';

export function Reviews() {
  const reviews = GetReviews();
  
  if (!reviews || reviews.length === 0) {
    return <div>No reviews available</div>;
  }
  
  const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
  
  const topFiveReviews = sortedReviews.slice(0, 5);

  return (
    <div className="container mx-auto my-10 rounded-xl py-5  md:w-2/3 lg:w-1/2 flex flex-col items-center  bg-yellow-300">
    <h2 className="text-4xl font-medium mt-10 text-black text-center mb-5">Latest Reviews</h2>
      <ul className="list-none w-1/2 p-0">
        {topFiveReviews.map((review, index) => (
          <li key={index} className="mb-6 p-7 shadow-xl bg-gray-200 text-gray-700 border border-gray-200 flex flex-col items-center rounded-xl"> {/* Added margin bottom for spacing */}
            <strong>{review.name}</strong>
            <Rating>
              {[...Array(5)].map((_, i) => (
                <Rating.Star key={i} filled={i < review.rating} />
              ))}
            </Rating>
            <p> {review.rating} out of 5. </p>
            <br />
            {review.comments}
          </li>
        ))}
      </ul>
    </div>
  );
}

// File: src/components/Shop.test.tsx
// Shop.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';
//import { GetMenuData } from "../hooks/GetMenuData";
import '@testing-library/jest-dom/vitest';

// Mocking GetMenuData hook
// vi.mock("../hooks/GetMenuData", () => ({
//   GetMenuData: () => [
//     { name: "Pizza", imgLink: "link-to-image", description: "Delicious pizza", price: 10, prepTime: 15 } ,
//     { name: "Burger", imgLink: "link-to-image", description: "Juicy burger", price: 8, prepTime: 10 }
//   ]
// }));

describe('Shop Component', () => {
  it('renders without crashing', () => {
    render(<Shop />);
    expect(screen.getByTestId('shop')).toBeInTheDocument();
  });

  // it('displays menu items correctly', () => {
  //   render(<Shop />);
  //   const menuItemTexts = screen.getAllByText(/delicious pizza|juicy burger/i);
  //   expect(menuItemTexts).toHaveLength(2); // We expect two menu items to be rendered
  // });
});

// File: src/components/Shop.tsx
import { MenuItem } from "./MenuItem";
import { GetMenuData } from "../hooks/GetMenuData";

function Shop() {
  const menu = GetMenuData();
  return (
    <div data-testid="shop" className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menu.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Shop;

// File: src/components/ShoppingCart.tsx
import { RxCross2 } from "react-icons/rx";
import { useShoppingCart } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { GetMenuData } from "../hooks/GetMenuData";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export function ShoppingCart() {
  const { cartItems , clearCart} = useShoppingCart();
  const menu = GetMenuData();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, cartItem) => {
      const item = menu.find((item) => item.name === cartItem.id);
      return total + (item?.price || 0) * cartItem.input;
    }, 0);
    setTotal(newTotal);

    const newDeliveryTime = cartItems.reduce((time, cartItem) => {
      const item = menu.find((item) => item.name === cartItem.id);
      return time + (item?.prepTime || 0) * cartItem.input;
    }, 0);
    setTime(newDeliveryTime);
  }, [cartItems, menu]);

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/checkout', { state: { total, time } });

  }
  return (
    <>
    <div className={`fixed right-0 top-5 bottom-5 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex flex-col justify-between rounded-xl border-red-700 h-full border shadow-lg bg-yellow-300 w-96 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
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
          <p className="text-xl">{total+"ft"}</p>
             <Button color="failure" pill onClick={() =>clearCart()}>Clear Cart</Button>
        </div>
       <Button className="mx-auto" pill color="success" onClick={handleCheckout} disabled={cartItems.length < 1}>Checkout</Button>
        </div>{(total>0) && (<div className=" shadow-xl p-3 bg-red-700 text-white flex flex-col items-center rounded-full">
        <p className="text-xl">{time + " minutes estimated delivery time"}</p>
        </div>)}

      </div>
    </div>
    {(cartItems.length > 0) && (<div className="fixed bottom-16 right-16 z-10">
      <button onClick={() => setIsOpen(!isOpen)} className={`bg-red-700 animate-bounce-short text-white p-2 rounded-full shadow-lg  transition-transform transform ${isOpen ? "-translate-x-96 rotate-180": "translate-x-0 rotate-0 "}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 5l -7 7 7 7" />
        </svg>
      </button>
    </div>)}
          </>
  );
}

// File: src/components/Signup.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "../libs/firebase";
import { FirebaseError } from "firebase/app";

const Signup = () => {
  const FIREBASE_ERRORS = {
    "auth/email-already-in-use": "Account already exists",
    "auth/weak-password":
      "Password should be at least 6 characters",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  
  const [errHandler, setErrHandler] = useState({
    isError: false,
    errorMsg: "",
  });
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formValues = new FormData(form);
    
    //Create a new user
    try {
      setIsLoading(true);
      setErrHandler({ isError: false, errorMsg: "" });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formValues.get("email") as string,
        formValues.get("password") as string
      );
      
      //Update the name , this was a bug with new firebase
      await updateProfile(userCredential.user, { displayName: formValues.get("name") as string});

      //save the user in the firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formValues.get("name") as string,
        email: formValues.get("email") as string,
        timeStamp: serverTimestamp(),
        role: "user",
        orders:[],
      });

      navigate("/verify");
    } catch (error: unknown) {
      const err = error as FirebaseError;
      console.log("Firebase Error Code:", err.code); // Debug log
      console.log("Firebase Error Message:", err.message); // Debug log
      console.log("Error Object:", err); // Debug log
      console.log("FIREBASE_ERRORS:", FIREBASE_ERRORS); // Debug log
      setErrHandler({
        isError: true,
        errorMsg: FIREBASE_ERRORS[err.code as keyof typeof FIREBASE_ERRORS],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
  

    <div className="container mx-auto my-10 rounded-xl py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
            <h2 className="text-4xl font-medium my-5 text-black text-center tracking-wider">Sign up</h2>
      <div className="auth-options w-full flex flex-col items-center justify-center">
        <GoogleLogin
          isLoading={false}
          setIsLoading={setIsLoading}
          message="Sign up with Google"
        />
        <div className="mt-5 mb-3 w-full md:w-[380px] flex items-center justify-center">
          <div className="before-or w-[100%] h-[2px] bg-gray-700 mr-2"></div>
          <p className="text-black or">OR</p>
          <div className="after-or w-[100%] h-[2px] bg-gray-700 ml-2"></div>
        </div>
        <form onSubmit={handleSignup} className="w-[100%] mx-auto md:w-auto">
          <label htmlFor="name" className="mt-5 block text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
          />
          <label htmlFor="email" className="mt-5 block text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
          />
          <label htmlFor="password" className="mt-5 block text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              required
              className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
            />
            <button
              type="button"
              aria-label={showPass ? "Password Visible" : "Password Invisible"}
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          {errHandler.isError ? (
            <div className="w-[100%] text-center mx-auto md:w-auto bg-red-600 mt-3 rounded-md px-3 py-2 text-white">
              {errHandler.errorMsg}
            </div>
          ) : null}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-700 mt-5 w-full px-10 py-2  rounded-full text-white hover:scale-95 duration-100 ease-in "
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
        <p className="mt-5 text-left">
          Already have an account?{" "}
          <Link to="/login" className="font-medium">
            Log in
          </Link>
        </p>
      </div>
    
    </div>
  );
};

export default Signup;

// File: src/components/Spinner.test.tsx
// Spinner.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import '@testing-library/jest-dom/vitest';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
// File: src/components/Spinner.tsx
type Props = {
  w?: string;
  h?: string;
  customStyle?: string;
};
const Spinner = ({ w = "24", h = "24", customStyle }: Props) => {
  return (
    <>
      <svg
        data-testid="spinner"
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-loader-2 ${customStyle}`}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </>
  );
};

export default Spinner;

// File: src/components/Story.test.tsx
// Story.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Story from './Story';
import '@testing-library/jest-dom/vitest';

describe('Story Component', () => {
  it('renders without crashing', () => {
    render(<Story />);
    expect(screen.getByTestId('story')).toBeInTheDocument();
  });
});
// File: src/components/Story.tsx
function Story() {
  return (
    <div data-testid="story" className="container mx-auto my-10 rounded-xl tracking-widest w-full md:w-2/3 lg:w-3/4">
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
        <div className="md:w-1/2">
          {/* Picture on the left, text on the right */}
          <img src="bell.jpg" alt="Description" className="rounded-xl" />
        </div>
        <div className="md:w-1/2 p-10 font-serif  flex font-semibold items-center justify-center text-xl">
          {/* Text on the left */}
          <p>In the little village where I was born, life moved 
            at a slower pace, yet felt all the richer for it.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
      <div className="md:w-1/2 p-10 font-serif flex font-semibold items-center justify-center text-xl">
          {/* Text on the right */}
          <p>There, my two uncles were known far and wide for
             their delicious cooking. They seasoned their zesty 
             chicken using only the freshest herbs and spices. 
             People call them Los Pollos Hermanos: the chicken
              brothers.</p>
        </div>
        <div className="md:w-1/2">
          {/* Picture on the right, text on the left */}
          <img src="brothers.jpg" alt="Description" className="rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
        <div className="md:w-1/2">
          {/* Picture on the left, text on the right */}
          <img src="spices.jpg" alt="Description" className="rounded-xl" />
        </div>
        <div className="md:w-1/2 p-10 font-serif font-semibold flex items-center justify-center text-xl">
          {/* Text on the left */}
          <p>Today we carry on their tradition in a manner 
            that would make my uncles proud. The finest 
            ingredients are brought together with love and 
            care, then slow cooked to perfection.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-10 rounded-xl shadow-xl bg-yellow-300">
      <div className="md:w-1/2 p-10 font-serif font-semibold flex items-center justify-center text-xl">
          {/* Text on the right */}
          <p>Yes, the old ways are still best at Los 
            Pollos Hermanos. But don’t take my word 
            for it. One taste, and you’ll know.</p>
        </div>
        <div className="md:w-1/2">
          {/* Picture on the right, text on the left */}
          <img src="madrigal.jpg" alt="Description" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default Story;

// File: src/components/Timer.tsx
import { useState, useEffect } from "react";

export function Timer({ deliveryTime }: { deliveryTime: number }) {
    // const initialSeconds = parseInt(localStorage.getItem("timerSeconds") || "0", 10);
    // const initialMinutes = parseInt(localStorage.getItem("timerMinutes") || deliveryTime.toString(), 10);

    // const [seconds, setSeconds] = useState(initialSeconds);
    // const [minutes, setMinutes] = useState(initialMinutes);
    const [timeUp, settimeUp] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(deliveryTime);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                clearInterval(interval);
                settimeUp(true);
                // Handle timer expiry here
            } else if (seconds === 0) {
                setMinutes(prevMinutes => prevMinutes - 1);
                setSeconds(59);
            } else {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, minutes]);

    // Save timer state to localStorage
    // useEffect(() => {
    //     localStorage.setItem("timerSeconds", seconds.toString());
    //     localStorage.setItem("timerMinutes", minutes.toString());
    // }, [seconds, minutes]);

    //radius
    const size = 210;
    const radius = 85;
    const totalSeconds = minutes * 60 + seconds;
    const progress = (totalSeconds / (deliveryTime * 60)) * 100;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (circumference * progress) / 100 ;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
      <div className="text-center items-center flex flex-col my-10">
        {timeUp ? (
          <div className="container mx-auto my-10 rounded-xl shadow-xl text-center items-center flex flex-col py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
            <p className="font-semibold text-xl mb-5">
              Your meal has arrived! 🥳
            </p>
            <p className="text-gray-700">
              Delivery Time: {new Date().toLocaleString()}
            </p>
          </div>
        ) : (
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={`bg-yellow-300 animate-bounce-short rounded-full shadow-xl`}
          >
            <circle
              className="stroke-current text-gray-200"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth="10%"
              fill="transparent"
            />
            <circle
              className="stroke-current text-red-700"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth="10%"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              //transform={`rotate(-90 ${size/2} ${size/2})`}
            />
            <text
              x="50%"
              y="50%"
              dy="0.3em"
              textAnchor="middle"
              className="text-3xl font-bold tracking-wider text-red-700"
            >
              {formattedTime}
            </text>
          </svg>
        )}
      </div>
    );
}

// File: src/components/VerifyEmail.test.tsx
// VerifyEmail.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';
import '@testing-library/jest-dom/vitest';

describe('VerifyEmail Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <VerifyEmail />
      </MemoryRouter>
    );
    expect(screen.getByTestId('verify')).toBeInTheDocument();
  });
});

// File: src/components/VerifyEmail.tsx
import { useEffect, useState } from "react";
import { auth } from "../libs/firebase";

import { sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const VerifyEmail = () => {
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [sentMail, setSentMail] = useState(false);

  const navigate = useNavigate();

  const sendVerificationEmail = async () => {
    try {
      auth.authStateReady().then(() => {
        if (!auth.currentUser || auth.currentUser === null) {
          return navigate("/login");
        }

        if (auth.currentUser?.emailVerified) {
          setIsVerified(true);
          return navigate("/");
        } else {
          sendEmailVerification(auth.currentUser!).then(() => {
            setSentMail(true);
          });
        }
      });
    } catch (error) {
      throw new Error("Error while sending email");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  useEffect(() => {
    sendVerificationEmail();
  }, []);

  return (
    <div data-testid="verify" className="md:w-1/2 mx-auto my-10 py-10 rounded-xl px-3 flex items-center justify-center bg-yellow-300 shadow-md">
      {isCheckingStatus ? (
        <div>Checking Auth Status...</div>
      ) : (
        <>
          {isVerified ? (
            <>
              <p className="text-center">
                You have already verified your email. Redirecting you to
                dashboard
              </p>
            </>
          ) : (
            <>
              {sentMail ? (
                <div className="flex flex-col gap-3 items-center justify-center">
                  <p>Sent Verification mail successfully.</p>
                  <p>
                    Please check your spam folder if you can't find it in inbox.
                  </p>

                  <Link to="/login">
                    <Button color="failure" pill size="lg">
                      Login in
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="text-center flex flex-col gap-3 items-center justify-center">
                    Sending Email in progress...
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyEmail;

// File: src/hooks/GetMenuData.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebase";

export interface MenuItemData {
  name: string;
  imgLink: string;
  description: string;
  price: number;
  prepTime: number;
}

export function GetMenuData() {
  const [menu, setMenu] = useState<MenuItemData[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const menuData = querySnapshot.docs.map(
        (doc) => doc.data() as MenuItemData
      );
      setMenu(menuData);
    };
    fetchMenu();
  }, [db]);

  return menu;
}

// File: src/hooks/GetReviews.tsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../libs/firebase";

 export interface ReviewData {
    name: string;
    email: string;
    comments: string;
    rating: number;
  }

export function GetReviews() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  
  useEffect(() => {
    async function fetchReviews() {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const reviewData = querySnapshot.docs.map((doc) => doc.data() as ReviewData);
      setReviews(reviewData);
    }
    fetchReviews();
  }, [db]);

  return reviews;
}

// File: src/hooks/GetUserOrders.tsx
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
// File: src/hooks/UseCheckAdmin.tsx
//Custom Hook to check if the user is an admin

import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../libs/firebase";
import { doc, getDoc } from "firebase/firestore";

export function UseCheckAdmin(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isAdmin, setIsAdmin] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const checkAdmin = async () => {
      //uid check added during testing of mock user
      if (currentUser && currentUser.uid) {
        const userRef = doc(db, "users", currentUser.uid);
        const userData = await getDoc(userRef);
        const user = userData.data();
        // console.log(currentUser);
        // console.log(user);
        if (userData && user && user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
       }
      }
    };

    checkAdmin();
  }, [currentUser]);
  return [isAdmin, setIsAdmin] ;
}
// File: src/hooks/UseLocalStorage.tsx
//Custom hook to save the cart data to local storage

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}

// File: src/libs/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase connection parameters
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialization of the Authenticator and the database (firestore)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// File: src/context/AuthContext.tsx
import { User, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";

type InitialState = {
  currentUser: User | null;
};
export const AuthContext = createContext<InitialState>({ currentUser: null });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// File: src/context/CartContext.tsx
import { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/UseLocalStorage";

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

// File: src/context/TimerContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TimerContextType = {
  startTimer: (duration: number) => void;
  stopTimer: () => void;
  timeUp: boolean;
  formattedTime: string;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

type TimerProviderProps = {
  children: ReactNode;
};

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeUp, setTimeUp] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0 && minutes === 0) {
        clearInterval(interval);
        setTimeUp(true);
      } else if (seconds === 0) {
        setMinutes(minutes => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds => seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const startTimer = (duration: number) => {
    setTimeUp(false);
    setMinutes(duration);
    setSeconds(0);
  };

  const stopTimer = () => {
    setMinutes(0);
    setSeconds(0);
    setTimeUp(true);
  };

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <TimerContext.Provider value={{ startTimer, stopTimer, timeUp, formattedTime }}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the timer context
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

