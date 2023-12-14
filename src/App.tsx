import React, { useState } from 'react';
import './App.css';
import dayjs from 'dayjs';
import { DatePicker } from './DatePicker/DatePicker';

function App() {
  const [date, setDate] = useState(dayjs());
  return (
    <div className="App">
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
    </div>
  );
}

export default App;
