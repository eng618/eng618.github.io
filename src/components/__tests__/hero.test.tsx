import { Hero } from '@/components/hero';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('renders Hero with correct name', () => {
  render(<Hero />);
  const nameElement = screen.getByText(/Eric N. Garcia/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders greeting text', () => {
  render(<Hero />);
  const greetingElement = screen.getByText(/Hello, I'm/i);
  expect(greetingElement).toBeInTheDocument();
});
