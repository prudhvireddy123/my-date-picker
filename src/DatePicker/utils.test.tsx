import dayjs from 'dayjs';
import * as utils from './utils';

describe('Date Picker Utils', () => {
  test('getCalendarRows Should return the calender Rows for given month', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const displayDates = utils.getCalendarRows(showingDate);
    expect(displayDates.length).toBe(6);
    // Starts with
    expect(displayDates[0][0].text).toBe('26');
    expect(displayDates[0][0].isInCurrentMonth).toBe(false);
    expect(displayDates[0][1].text).toBe('27');
    expect(displayDates[0][1].isInCurrentMonth).toBe(false);
    //ends With
    expect(displayDates[5][0].text).toBe('31');
    expect(displayDates[5][0].isInCurrentMonth).toBe(true);
    expect(displayDates[5][6].text).toBe('6');
    expect(displayDates[5][6].isInCurrentMonth).toBe(false);
  });

  test('getCalendarRows Should return the disabled calender Rows for given month with minAllowedDate', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const minAllowedDate = dayjs(new Date('2023-12-19'));
    const displayDates = utils.getCalendarRows(showingDate, minAllowedDate);
    expect(displayDates.length).toBe(6);
    displayDates.forEach((daysRow) => {
      daysRow.forEach((day) => {
        expect(day.selectionDisabled).toBe(day.value.isBefore(minAllowedDate));
      });
    });
  });

  test('getCalendarRows Should return the disabled calender Rows for given month with maxAllowedDate', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    const maxAllowedDate = dayjs(new Date('2023-12-30'));
    const displayDates = utils.getCalendarRows(showingDate, undefined, maxAllowedDate);
    expect(displayDates.length).toBe(6);
    displayDates.forEach((daysRow) => {
      daysRow.forEach((day) => {
        expect(day.selectionDisabled).toBe(day.value.isAfter(maxAllowedDate));
      });
    });
  });

  test('changeDateMonth shouldCalculate the before and after month', () => {
    const showingDate = dayjs(new Date('2023-12-19'));
    expect(utils.changeDateMonth(showingDate, false).toString()).toBe('Sun, 19 Nov 2023 00:00:00 GMT');
    expect(utils.changeDateMonth(showingDate, true).toString()).toBe('Fri, 19 Jan 2024 00:00:00 GMT');
  });
});
