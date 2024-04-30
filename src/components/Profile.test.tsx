import { describe, it, expect, vi } from 'vitest';
import { render, waitFor ,screen} from '@testing-library/react';
import Profile from './Profile';
import '@testing-library/jest-dom/vitest';

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
    Navigate: vi.fn(() => null),
    useNavigate: vi.fn(() => mockNavigate),
}));

describe('Profile Component', () => {
    it('renders without crashing', () => {
        render(<Profile />);
        expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

    it("navigates to login if no user is authenticated", async () => {
        render(<Profile />);
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });
});
