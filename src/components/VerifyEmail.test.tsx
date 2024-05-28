import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VerifyEmail from './VerifyEmail';
import '@testing-library/jest-dom/vitest';

describe('VerifyEmail Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <VerifyEmail />
      </MemoryRouter>
    );
    expect(screen.getByTestId('verify')).toBeInTheDocument();
  });
});
