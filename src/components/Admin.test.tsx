import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, } from 'react-router-dom';
import Admin from './Admin';
import '@testing-library/jest-dom/vitest';

  
describe('Admin Component', () => {  
    it('should show not allowed message when user is not an admin', () => {
        
      vi.mock('../hooks/UseCheckAdmin', () => ({
        UseCheckAdmin: () => [false, vi.fn()]
      }));
  
      render(
        <MemoryRouter>
          <Admin />
        </MemoryRouter>
      );

      expect(screen.getByTestId('non-admin')).toBeInTheDocument();
      screen.debug();
      });
  
  });