import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render DatePicker', () => {
    const selectedDate = new Date('2023-12-19');
    const setShownDateSpy = jest.fn();
    render(<DatePicker selectedDate={selectedDate} onChange={setShownDateSpy} />);
    expect(screen.queryByTestId('picker-calender')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-12-19')).toBeInTheDocument();
  });

  test('Should display calender', () => {
    const selectedDate = new Date('2023-12-19');
    const setShownDateSpy = jest.fn();
    render(<DatePicker selectedDate={selectedDate} onChange={setShownDateSpy} />);
    expect(screen.queryByTestId('picker-calender')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-12-19')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('input-container'));
    expect(screen.getByTestId('picker-calender')).toBeInTheDocument();
  });

  test('Should select day from calender', () => {
    const selectedDate = new Date('2023-12-19');
    const setShownDateSpy = jest.fn();
    render(<DatePicker selectedDate={selectedDate} onChange={setShownDateSpy} />);
    // calender is not visible
    expect(screen.queryByTestId('picker-calender')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-12-19')).toBeInTheDocument();
    // on click input
    fireEvent.click(screen.getByTestId('input-container'));
    // calender is  visible
    expect(screen.getByTestId('picker-calender')).toBeInTheDocument();
    expect(screen.getAllByTestId('day')).toHaveLength(42);
    // on select day
    fireEvent.click(screen.getAllByTestId('day')[3]);
    expect(setShownDateSpy).toBeCalledTimes(1);
    // returns selected day
    expect(dayjs(setShownDateSpy.mock.calls[0][0]).format('YYYY-MM-DD')).toBe('2023-11-29');
    // hides selected day
    expect(screen.queryByTestId('picker-calender')).not.toBeInTheDocument();
  });
});
