import { Dayjs } from 'dayjs';

export function changeDateMonth(date: Dayjs, isNextMonth: boolean): Dayjs {
  if (date.month() === 0 && !isNextMonth) {
    return date.set('year', date.year() - 1).set('month', 11);
  }

  if (date.month() === 11 && isNextMonth) {
    return date.set('year', date.year() + 1).set('month', 0);
  }

  return date.add(isNextMonth ? 1 : -1, 'month');
}

export interface ICalendarCell {
  text: string;
  value: Dayjs;
  isInCurrentMonth: boolean;
}

const prepareCell = (date: Dayjs, dayNumber: number, isInCurrentMonth: boolean): ICalendarCell => {
  return {
    text: String(dayNumber),
    value: date.clone().set('date', dayNumber),
    isInCurrentMonth: isInCurrentMonth,
  };
};

function getCalendarCells(date: Dayjs): ICalendarCell[] {
  const daysArray = new Array(date.daysInMonth()).fill(1);
  const calendarCells: ICalendarCell[] = [];

  daysArray.forEach((_, i) => {
    calendarCells.push(prepareCell(date, i + 1, true));
  });

  const startOfTheMonthDay = date.startOf('month').day();
  const lastMonth = date.subtract(1, 'month');
  for (let i = 0; i < startOfTheMonthDay; i++) {
    calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i, false));
  }

  const cellsToAdd = 42 - calendarCells.length;
  const nextMonth = date.add(1, 'month');
  for (let i = 0; i < cellsToAdd; i++) {
    calendarCells.push(prepareCell(nextMonth, i + 1, false));
  }

  return calendarCells;
}

export function getCalendarRows(date: Dayjs): Array<ICalendarCell[]> {
  const cells = getCalendarCells(date);
  const rows: Array<ICalendarCell[]> = [];

  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return rows;
}
