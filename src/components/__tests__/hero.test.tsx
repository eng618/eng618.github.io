import { Hero } from '@/components/hero';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('renders Hero with correct name', () => {
  render(<Hero />);
  const nameElement = screen.getByText(/Eric N. Garcia/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders role eyebrow and Version B tagline', () => {
  render(<Hero />);
  expect(screen.getByText(/Principal Engineer · Systems Architect · Design Systems/i)).toBeInTheDocument();
  expect(screen.getByText(/Eleven years building enterprise software/i)).toBeInTheDocument();
});

test('renders primary CTAs', () => {
  render(<Hero />);
  expect(screen.getByRole('link', { name: /View selected work/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Get in touch/i })).toBeInTheDocument();
});
