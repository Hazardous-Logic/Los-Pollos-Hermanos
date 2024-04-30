// Shop.test.tsx
import { describe, it, expect, vi } from 'vitest';
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
