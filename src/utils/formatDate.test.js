// src/utils/formatDate.test.js
import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a date as "Month Day, Year"', () => {
    const result = formatDate(new Date('2026-07-15'));
    expect(result).toBe('July 15, 2026');
  });

  it('handles a different month correctly', () => {
    const result = formatDate(new Date('2026-01-01'));
    expect(result).toBe('January 1, 2026');
  });
});