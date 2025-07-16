import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'

// Extend Vitest's expect with Jest DOM matchers
expect.extend({
  toBeInTheDocument: expect.anything(),
  toBeVisible: expect.anything(),
  toBeEmpty: expect.anything(),
  toBeEmptyDOMElement: expect.anything(),
  toHaveAttribute: expect.anything(),
  toHaveClass: expect.anything(),
  toHaveStyle: expect.anything(),
  toHaveTextContent: expect.anything(),
  toHaveValue: expect.anything(),
  toHaveDisplayValue: expect.anything(),
  toHaveFocus: expect.anything(),
  toBeDisabled: expect.anything(),
  toBeEnabled: expect.anything(),
  toBeInvalid: expect.anything(),
  toBeReadOnly: expect.anything(),
  toBeRequired: expect.anything(),
  toBeChecked: expect.anything(),
  toBePartiallyChecked: expect.anything(),
  toBeSelected: expect.anything(),
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
