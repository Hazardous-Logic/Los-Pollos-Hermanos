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
