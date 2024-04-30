// Home.test.tsx
import { describe, it, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';
import '@testing-library/jest-dom/vitest';

describe('Loading Component', () => {
  it('renders without crashing', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});