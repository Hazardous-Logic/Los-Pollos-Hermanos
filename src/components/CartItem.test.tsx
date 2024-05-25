import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { CartItem, Item } from './CartItem';

// Mock the useShoppingCart context
vi.mock('../context/CartContext', () => ({
  useShoppingCart: () => ({
    removeItemFromCart: vi.fn(),
  }),
}));

// Mock the GetMenuData hook
vi.mock('../hooks/useMenuData', () => ({
  GetMenuData: () => ([
    { name: '1', imgLink: 'mockimage.jpg', price: 10 },
    // Add other items if needed
  ]),
}));

describe('CartItem', () => {
  it('renders without crashing', () => {
    const mockItem: Item = {
      id: '1',  // Ensure a string value is provided for the id
      input: 1, // A valid number for input
    };

    render(<CartItem {...mockItem} />);
    screen.debug();
    
    // Verify the item details are rendered correctly
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument(); // Since price is 10 and quantity is 1
    expect(screen.getByAltText('1')).toBeInTheDocument(); // Image alt text
  });
});
