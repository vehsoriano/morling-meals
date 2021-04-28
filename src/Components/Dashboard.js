import React, { useState } from 'react';
import moment from "moment";
import Calendar from './Calendar'

function Dashboard() {
    const [selectedDate, setSelectedDate] = useState(moment());

  return (
    <div>
        Dashboard
        <Calendar value={selectedDate} onChange={setSelectedDate} />;
    </div>
  );
}

export default Dashboard;
