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