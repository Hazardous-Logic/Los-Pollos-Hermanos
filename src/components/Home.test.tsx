// Home.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/vitest';

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});