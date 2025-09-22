import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom';

// Extend Vitest expect with jest-dom matchers for DOM assertions
expect.extend(matchers);

// Cleanup DOM after each test to prevent memory leaks
afterEach(() => {
  cleanup();
});