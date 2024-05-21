import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore"; 
import { db } from "../libs/firebase"; 
import { Button } from "flowbite-react";
import { GetMenuData } from "../hooks/useMenuData";

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
