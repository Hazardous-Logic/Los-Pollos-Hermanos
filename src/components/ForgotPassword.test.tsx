// ForgotPassword.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';
import '@testing-library/jest-dom/vitest';

describe('ForgotPassword Component', () => {
  it('renders without crashing', () => {
    render(<ForgotPassword />);
    expect(screen.getByTestId('forgot')).toBeInTheDocument();
  });
});