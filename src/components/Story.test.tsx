import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Story from './Story';
import '@testing-library/jest-dom/vitest';

describe('Story Component', () => {
  it('renders without crashing', () => {
    render(<Story />);
    expect(screen.getByTestId('story')).toBeInTheDocument();
  });
});