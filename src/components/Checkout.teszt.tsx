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