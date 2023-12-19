import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { DatePickerSelector } from './DatePickerSelector';

describe('DatePickerSelector', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('renders DatePickerSelector', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const setShownDateSpy = jest.fn();
    render(<DatePickerSelector shownDate={showingDate} setShownDate={setShownDateSpy} />);
    expect(screen.getByText('December 2023')).toBeInTheDocument();
  });

  test('handles back month selection in DatePickerSelector', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const setShownDateSpy = jest.fn();
    render(<DatePickerSelector shownDate={showingDate} setShownDate={setShownDateSpy} />);
    fireEvent.click(screen.getByTestId('icon-left'));
    expect(setShownDateSpy).toBeCalledTimes(1);
    expect(setShownDateSpy.mock.calls[0][0].format('YYYY-MM-DD')).toBe(dayjs('2023-11-19').format('YYYY-MM-DD'));
  });
  test('handles next month selection in DatePickerSelector', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const setShownDateSpy = jest.fn();
    render(<DatePickerSelector shownDate={showingDate} setShownDate={setShownDateSpy} />);
    fireEvent.click(screen.getByTestId('icon-right'));
    expect(setShownDateSpy).toBeCalledTimes(1);
    expect(setShownDateSpy.mock.calls[0][0].format('YYYY-MM-DD')).toBe(dayjs('2024-01-19').format('YYYY-MM-DD'));
  });
});
