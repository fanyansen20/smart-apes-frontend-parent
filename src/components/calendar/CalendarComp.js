// React
import { memo } from "react";
// import { useState } from "react";

import format from "date-fns/format";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComp = ({ selectedDate }) => {
  // const [selectedDate, setSelectedDate] = useState([
  //   new Date("2023-01-08T00:00:00Z"),
  //   new Date("2023-01-10T00:00:00Z"),
  // ]);
  return (
    <Calendar
      className="calendar"
      tileClassName={({ date }) => {
        if (
          selectedDate.find(
            (x) => format(x, "dd-MM-yyyy") === format(date, "dd-MM-yyyy")
          )
        ) {
          return "react-calendar__tile--active";
        }
      }}
      selectRange={false}
      // onClick={(value) => console.log(value)}
      // onClickDay={(value, event) => console.log(value, event.target)}
    />
  );
};

export default memo(CalendarComp);
