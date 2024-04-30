// AddMenuItem.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import AddMenuItem from './AddMenuItem';
import '@testing-library/jest-dom/vitest';


describe('AddMenuItem Component', () => {
  it('renders without crashing', () => {
    render(<AddMenuItem />);
    expect(screen.getByText(/Add New Menu Item/i)).toBeInTheDocument();
  });
});
