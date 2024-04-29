// Admin.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import React from 'react';
import Admin from './Admin';
import '@testing-library/jest-dom/vitest';
import { Button } from "flowbite-react";
import { UseCheckAdmin } from '../hooks/UseCheckAdmin';

  
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
  
    // it('should show admin features for admin user', () => {
    //   vi.mock('../hooks/UseCheckAdmin', () => ({
    //     UseCheckAdmin: () => [true, vi.fn()]
    //   }));
  
    //   render(
    //     <MemoryRouter>
    //       <Admin />
    //     </MemoryRouter>
    //   );
  
    //  expect(screen.getByTestId('admin')).toBeInTheDocument();
    // });
  });