import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';
import '@testing-library/jest-dom/vitest';

describe('Shop Component', () => {
  it('renders without crashing', () => {
    render(<Shop />);
    expect(screen.getByTestId('shop')).toBeInTheDocument();
  });
});
