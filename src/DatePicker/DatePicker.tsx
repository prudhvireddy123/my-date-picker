import React, { useEffect, useRef, useState } from 'react';

import type { Dayjs } from 'dayjs';

// import { defaultDatePickerFormat } from "./utils";

import { DatePickerCalendar } from './DatePickerCalendar/DatePickerCalendar';
import { DatePickerSelector } from './DatePickerSelector/DatePickerSelector';

import './DatePicker.css';

export interface IDatePickerProps {
  selectedDate: Dayjs;
  selectorDateFormat?: string;

  onChange: (newDate: Dayjs) => void;
}

export const DatePicker: React.FC<IDatePickerProps> = ({ selectedDate, selectorDateFormat, onChange }) => {
  const [shownDate, setShownDate] = useState(selectedDate.clone());
  const [showPicker, setShowPicker] = useState(false);
  const newRef: React.Ref<any> = useRef();
  const onselectDate = (newDate: Dayjs) => {
    setShowPicker(false);
    onChange(newDate);
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

          <DatePickerCalendar selectedDate={selectedDate} shownDate={shownDate} onChange={onselectDate} />
        </div>
      )}
    </div>
  );
};
