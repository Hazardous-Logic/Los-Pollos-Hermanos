// Login.test.tsx
import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Login from './Login';
import React from 'react';
import '@testing-library/jest-dom/vitest';

// Using vi.importOriginal to partially mock firebase/auth
const originalFirebaseAuth = importOriginal('firebase/auth');

vi.mock('firebase/auth', () => ({
  originalFirebaseAuth, // Spread the original module
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(() => ({ /* your mock auth object here if needed */ })),
  GoogleAuthProvider: vi.fn(() => ({ /* your mock provider here if needed */ }))
}));


// Define the type for the context value
interface AuthContextType {
  currentUser: any | null;
}

// Helper function to render component with necessary context and routing
const renderWithAuthContext = (ui: React.ReactElement, providerProps: AuthContextType, initialRoute = '/') => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={ui} />
          <Route path="/verify" element={<div>Verify Email Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Login Component', () => {
  it('should navigate to home page on successful login', async () => {
    const user = {
      emailVerified: true,
      user: { emailVerified: true }
    };
    (signInWithEmailAndPassword as Mock).mockResolvedValue(user);
    renderWithAuthContext(<Login />, { currentUser: null });
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(screen.queryByText(/please verify your mail before logging in./i)).not.toBeInTheDocument();
    });
  });

  it('should display an error message for email verification needed', async () => {
    const user = {
      emailVerified: false,
      user: { emailVerified: false }
    };
    (signInWithEmailAndPassword as Mock).mockResolvedValue(user);
    renderWithAuthContext(<Login />, { currentUser: null });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/please verify your mail before logging in./i)).toBeInTheDocument();
    });
  });

  it('should show error message on login failure', async () => {
    const error = new FirebaseError('auth/user-not-found', 'Invalid email or password');
    (signInWithEmailAndPassword as Mock).mockRejectedValue(error);
    renderWithAuthContext(<Login />, { currentUser: null });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.submit(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });
  });

  // Additional tests can be added here based on other behaviors and scenarios
});


