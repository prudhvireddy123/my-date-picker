import React, { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import clsx from 'clsx';

import { getCalendarRows } from '../utils';

import './DatePickerCalendar.css';

export interface IDatePickerCalendarProps {
  shownDate: Dayjs;
  selectedDate: Dayjs;
  onChange: (newDate: Dayjs) => void;
  minAllowedDate?: Dayjs;
  maxAllowedDate?: Dayjs;
}

export const DatePickerCalendar: React.FC<IDatePickerCalendarProps> = ({ shownDate, selectedDate, onChange, minAllowedDate, maxAllowedDate }) => {
  const handleSelectDate = (value: Dayjs) => {
    return () => onChange(value);
  };

  const rows = useMemo(() => getCalendarRows(shownDate, minAllowedDate, maxAllowedDate), [shownDate, minAllowedDate, maxAllowedDate]);
  return (
    <>
      <div className={'DatePickerCalendar__header'}>
        {rows[0].map(({ value }, i) => (
          <div key={i} className={'DatePickerCalendar__cell'}>
            {value.format('dd')}
          </div>
        ))}
      </div>

      {rows.map((cells, rowIndex) => (
        <div key={rowIndex} className={'DatePickerCalendar__row'}>
          {cells.map(({ text, value, isInCurrentMonth, selectionDisabled }, i) => (
            <div
              key={`${text} - ${i}`}
              data-testid={`day`}
              className={clsx('DatePickerCalendar__cell', 'DatePickerCalendar__dayCell', {
                DatePickerCalendar__dayCell_selected: value.toString() === selectedDate.toString(),
                DatePickerCalendar__dayCell_disabled: !isInCurrentMonth || selectionDisabled,
              })}
              onClick={handleSelectDate(value)}
            >
              {text}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
