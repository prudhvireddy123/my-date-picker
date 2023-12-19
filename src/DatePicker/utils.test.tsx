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
});
