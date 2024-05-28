import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import '@testing-library/jest-dom/vitest';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});