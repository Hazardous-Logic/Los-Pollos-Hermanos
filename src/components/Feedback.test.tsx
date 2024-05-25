import { expect,describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Feedback from './Feedback';
import '@testing-library/jest-dom/vitest';

// Mock the Firestore functions
// vi.mock('../libs/firebase', () => ({
//   db: {},
//   collection: vi.fn(() => 'feedback'),
//   addDoc: vi.fn(() => Promise.resolve({ id: '123' }))
// }));

describe('Feedback Component', () => {
  it('renders without crashing', () => {
    render(<Feedback />);
    expect(screen.getByText('Add Feedback')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Comments')).toBeInTheDocument();
  });

  it('allows entering input', () => {
    render(<Feedback />);
    const nameInput = screen.getByLabelText('Your Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

});
