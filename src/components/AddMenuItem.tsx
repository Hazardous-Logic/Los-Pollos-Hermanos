import { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore"; 
import { db } from "../libs/firebase"; 
import { Button } from "flowbite-react";
import { MenuItemData } from "../hooks/GetMenuData";

const AddMenuItem = () => {
  const [newMenuItem, setNewMenuItem] = useState<MenuItemData>({
     name: "", 
     imgLink: "", 
     description: "", 
     price: 0, 
     prepTime: 0
    });

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
      <h2 className="text-4xl font-medium mt-10 text-black text-center">Add New Menu Item</h2>
      <form onSubmit={handleSubmit} >
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prepTime">
              Name
            </label>
            <input className=" shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" name="name" value={newMenuItem.name} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="imgLink">
              Image Link
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="imgLink" type="text" name="imgLink" value={newMenuItem.imgLink} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
            Preparation Time (minutes)
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="prepTime" type="number" name="prepTime" value={newMenuItem.prepTime} onChange={handleChange} />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
              Price (HUF)
            </label>
            <input className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="price" type="number" name="price" value={newMenuItem.price} onChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-wrap mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea className="shadow-xl appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" name="description" rows={3} value={newMenuItem.description} onChange={handleChange}></textarea>
          </div>
        </div>
        <Button className="mx-auto" pill color="failure" type="submit">
          Add Menu Item
        </Button>
      </form>
    </div>
  );
}

export default AddMenuItem;
