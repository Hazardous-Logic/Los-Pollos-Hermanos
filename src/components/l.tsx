// Import the necessary modules from Vitest and Testing Library
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

// Explicitly mock firebase/auth
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  // Add any other methods or properties you use from 'firebase/auth'
}));

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'), // Import and spread the actual module
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockNavigate.mockClear();
    vi.clearAllMocks();
  });

  it('should navigate to the home page on successful login', async () => {
    const userCredentialMock = {
      user: {
        emailVerified: true,
        email: 'test@example.com',
      },
    };

    // Get the mocked function and set it to resolve with the mock user credentials
    const signInMock = vi.mocked(signInWithEmailAndPassword);
    signInMock.mockResolvedValue(userCredentialMock);

    render(
      <AuthContext.Provider value={{ currentUser: null }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.submit(screen.getByRole('button', { name: /Log in/i }));

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith(
        expect.anything(), // Adjust according to your real implementation, for instance passing auth instance
        'test@example.com',
        'password123'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
