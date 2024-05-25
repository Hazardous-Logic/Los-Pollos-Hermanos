// Reviews.test.tsx
import { describe, it, expect, vi} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import {Reviews} from './Reviews';
import '@testing-library/jest-dom/vitest';

// Mock data for reviews
const mockReviews = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    comments: "Great service!",
    rating: 5
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    comments: "Good, but a bit slow.",
    rating: 3
  },
  {
    name: "Carol White",
    email: "carol@example.com",
    comments: "Exceptional quality!",
    rating: 4
  },
  {
    name: "Dave Brown",
    email: "dave@example.com",
    comments: "Not what I expected.",
    rating: 2
  },
  {
    name: "Eve Black",
    email: "eve@example.com",
    comments: "Could be better.",
    rating: 2
  }
];



describe('Reviews Component', () => {

  // it('displays a message when there are no reviews', () => {
  //   cleanup();
  //   vi.mock('../hooks/GetReviews', () => ({
  //     GetReviews: vi.fn(() => [])
  //   }));

  //   render(<Reviews />);
  //   expect(screen.getByText(/No reviews available/i)).toBeInTheDocument();
  //   screen.debug();
  //   cleanup();
  // });

  it('renders top five reviews sorted by rating', () => {
    // Mocking GetReviews hook
    vi.mock("../hooks/useReviews", () => ({
      GetReviews: vi.fn(() => mockReviews),
    }));

    render(<Reviews />);
    expect(screen.getByText(/Latest Reviews/i)).toBeInTheDocument();
    const ratings = screen.getAllByText(/out of 5/i);
    expect(ratings.length).toBe(5); // Ensures only top five reviews are shown
    expect(ratings[0].textContent).toContain("5");
    expect(ratings[1].textContent).toContain("4");
    expect(ratings[2].textContent).toContain("3");
    expect(ratings[3].textContent).toContain("2");
    expect(ratings[4].textContent).toContain("2");
    expect(screen.getByText("Great service!")).toBeInTheDocument(); // Highest rating comment
    expect(screen.getByText("Good, but a bit slow.")).toBeInTheDocument(); // Check if comments are correctly associated
    screen.debug();
    cleanup();
  });
});

