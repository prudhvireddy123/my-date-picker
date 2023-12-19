import React, { useEffect, useRef, useState } from 'react';

import type { Dayjs } from 'dayjs';

// import { defaultDatePickerFormat } from "./utils";

import { DatePickerCalendar } from './DatePickerCalendar/DatePickerCalendar';
import { DatePickerSelector } from './DatePickerSelector/DatePickerSelector';

import './DatePicker.css';
import dayjs from 'dayjs';

export interface IDatePickerProps {
  selectedDate: Date;
  onChange: (newDate: Date) => void;
  selectorDateFormat?: string;
  minAllowedDate?: Date;
  maxAllowedDate?: Date;
}

export const DatePicker: React.FC<IDatePickerProps> = ({ selectedDate, selectorDateFormat, onChange, minAllowedDate, maxAllowedDate }) => {
  const [shownDate, setShownDate] = useState(dayjs(selectedDate));
  const [showPicker, setShowPicker] = useState(false);
  const newRef: React.Ref<any> = useRef();
  const onselectDate = (newDate: Dayjs) => {
    setShowPicker(false);
    onChange(newDate.toDate());
  };
  const handleOutsideClick = (e: Event) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <div ref={newRef} className={'DatePickerContainer'}>
      <div
        onClick={(event) => {
          event.preventDefault();
          setShowPicker(true);
        }}
      >
        <input type="date" value={shownDate.date().toString()} onKeyDown={(e) => e.preventDefault()}></input>
      </div>
      {showPicker && (
        <div className={'DatePicker'}>
          <DatePickerSelector shownDate={shownDate} setShownDate={setShownDate} />

          <DatePickerCalendar
            selectedDate={shownDate}
            shownDate={shownDate}
            onChange={onselectDate}
            minAllowedDate={minAllowedDate && dayjs(minAllowedDate)}
            maxAllowedDate={maxAllowedDate && dayjs(maxAllowedDate)}
          />
        </div>
      )}
    </div>
  );
};
