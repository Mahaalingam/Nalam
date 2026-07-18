// src/services/appointmentService.test.js
import { describe, it, expect } from 'vitest';
import { filterTodaysAppointments } from './appointmentService';

describe('filterTodaysAppointments', () => {
  it('returns only appointments matching today\'s date', () => {
    const today = new Date().toISOString().split('T')[0];

    const appointments = [
      { id: '1', date: today, doctorName: 'Dr. Smith' },
      { id: '2', date: '2020-01-01', doctorName: 'Dr. Old' },
      { id: '3', date: today, doctorName: 'Dr. Patel' },
    ];

    const result = filterTodaysAppointments(appointments);

    expect(result).toHaveLength(2);
    expect(result.map((a) => a.id)).toEqual(['1', '3']);
  });

  it('returns an empty array when no appointments match today', () => {
    const appointments = [
      { id: '1', date: '2020-01-01' },
      { id: '2', date: '2099-12-31' },
    ];

    const result = filterTodaysAppointments(appointments);

    expect(result).toHaveLength(0);
  });
});