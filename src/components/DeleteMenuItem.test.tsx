// DeleteMenuItem.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import DeleteMenuItem from './DeleteMenuItem';
import '@testing-library/jest-dom/vitest';

const mockMenu = [
  { name: 'Burger', imgLink: 'link-to-burger.jpg', description: 'Juicy grilled burger', price: 8.99, prepTime: 15 },
  { name: 'Pizza', imgLink: 'link-to-pizza.jpg', description: 'Cheesy pepperoni pizza', price: 12.99, prepTime: 20 },
  { name: 'Salad', imgLink: 'link-to-salad.jpg', description: 'Fresh garden salad', price: 6.99, prepTime: 10 }
];

// Mock the GetMenuData hook
vi.mock('../hooks/useMenuData', () => ({
  GetMenuData: vi.fn(() => mockMenu)
}));

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
