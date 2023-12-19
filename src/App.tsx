import React, { useState } from 'react';
import './App.css';
import dayjs from 'dayjs';
import { DatePicker } from './DatePicker/DatePicker';

function App() {
  const [date, setDate] = useState(new Date('2023-12-25'));
  return (
    <div className="App">
      {/* <DatePicker selectedDate={date} onChange={setDate} /> */}
      {/* <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} />
      <DatePicker selectedDate={date} onChange={setDate} /> */}
      <DatePicker selectedDate={date} onChange={setDate} minAllowedDate={new Date('2023-12-20')} maxAllowedDate={new Date('2023-12-30')} />
    </div>
  );
}

export default App;
