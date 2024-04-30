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
