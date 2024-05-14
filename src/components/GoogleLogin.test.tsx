// GoogleLogin.test.tsx
import { describe, it, expect, vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import GoogleLogin from './GoogleLogin';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, createMemoryRouter } from 'react-router-dom';

describe('GoogleLogin Component', () => {
  it('renders without crashing', () => {
    
    render(<MemoryRouter><GoogleLogin           
      isLoading={false}
      setIsLoading={vi.fn()}
      message="Sign in with Google"/></MemoryRouter>);
    expect(screen.getByTestId('googleLogin')).toBeInTheDocument();
    screen.debug();
  });
});