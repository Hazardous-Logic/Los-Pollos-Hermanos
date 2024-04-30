import { expect,describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Feedback from './Feedback';
import '@testing-library/jest-dom/vitest';
import { db } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";

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

//   it('submits the form and resets the input fields', async () => {
    
//     render(<Feedback />);
//     const nameInput = screen.getByLabelText('Your Name') as HTMLInputElement;
//     const emailInput = screen.getByLabelText('Your Email') as HTMLInputElement;
//     const commentsTextArea = screen.getByLabelText('Comments') as HTMLTextAreaElement;
//     const ratingSelect = screen.getByLabelText('Rating') as HTMLSelectElement;

//     // Simulate filling out the form
//     fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
//     fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
//     fireEvent.change(commentsTextArea, { target: { value: 'Great service!' } });
//     fireEvent.change(ratingSelect, { target: { value: '5' } });

//     const submitButton = screen.getByRole('button', { name: 'Add Review' });
//     fireEvent.click(submitButton);

//     // Check if addDoc was called (using the mocked implementation)
//     await expect(addDoc).toHaveBeenCalled();

//     // Check if inputs are reset
//     expect(nameInput.value).toBe('');
//     expect(emailInput.value).toBe('');
//     expect(commentsTextArea.value).toBe('');
//     expect(ratingSelect.value).toBe('0');
//   });
});
