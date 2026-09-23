import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn<() => void>(),
    replace: vi.fn<() => void>(),
    prefetch: vi.fn<() => void>(),
    back: vi.fn<() => void>(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));
