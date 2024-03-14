import { MenuItem } from "./MenuItem";
import { GetMenuData } from "../hooks/GetMenuData";

function Shop() {
  const menu = GetMenuData();
  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menu.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
