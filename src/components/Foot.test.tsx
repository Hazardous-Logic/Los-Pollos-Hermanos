import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Foot from './Foot';
import '@testing-library/jest-dom/vitest';

describe('Story Component', () => {
  it('renders without crashing', () => {
    render(<Foot />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});