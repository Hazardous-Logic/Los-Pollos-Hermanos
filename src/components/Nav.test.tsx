// Nav.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Nav from './Nav';
import React from 'react';
import { User } from 'firebase/auth';
import '@testing-library/jest-dom/vitest';


// Define the type for the context value
interface AuthContextType {
  currentUser: User | null;
}

// Helper function to render component with necessary context
const renderWithAuthContext = (ui: React.ReactElement, providerProps: AuthContextType) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Nav Component', () => {
  it('should show login button when user is not logged in', () => {
    renderWithAuthContext(<Nav />, { currentUser: null });
    // const loginButton = screen.getByText(/Login \/ Register/i)
    // expect(loginButton).toBeInTheDocument();
    // expect(loginButton).toHaveTextContent(/Login \/ Register/i);
    expect(screen.getByText(/Login \/ Register/i)).toBeInTheDocument();
    screen.debug();
  });

  it('should display the user name when they are logged in', () => {
    const mockUser: User = {
      displayName: 'John Doe',
      email: 'johndoe@example.com',
    } as User;

    renderWithAuthContext(<Nav />, { currentUser: mockUser });
    expect(screen.getByText(/Hola! John Doe/i)).toBeInTheDocument();
  });
  
  it('should show not the admin tab for a normal user', () => {
    const mockUser: User = {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
      } as User;

    renderWithAuthContext(<Nav />, { currentUser: mockUser });
    expect(screen.queryByText(/Admin/i)).not.toBeInTheDocument();
  });

});




