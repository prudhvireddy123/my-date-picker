import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { DatePickerCalendar } from './DatePickerCalendar';

describe('DatePickerCalender', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders DatePickerCalender', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const onChangeDateSpy = jest.fn();
    render(<DatePickerCalendar shownDate={showingDate} selectedDate={showingDate} onChange={onChangeDateSpy} />);
    expect(screen.getAllByTestId('day')).toHaveLength(42);
  });

  test('can select the day from DatePickerCalender', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const onChangeDateSpy = jest.fn();
    render(<DatePickerCalendar shownDate={showingDate} selectedDate={showingDate} onChange={onChangeDateSpy} />);
    expect(screen.getAllByTestId('day')).toHaveLength(42);
    fireEvent.click(screen.getAllByTestId('day')[0]);
    expect(onChangeDateSpy).toBeCalledTimes(1);
    expect(onChangeDateSpy.mock.calls[0][0].format('YYYY-MM-DD')).toBe(dayjs('2023-11-26').format('YYYY-MM-DD'));
  });
});
