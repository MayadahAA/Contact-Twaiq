import { useState, useEffect } from "react";
import axios from "axios";

interface CalendarDataItem {
  date: string;
  day: string;
  hours: {
    time: string;
    requests?: {
      name: string;
      duration: string;
      topics: string[];
    }[];
  }[];
}
function Calendar() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarDataItem[]>([]);

  const handleDayClick = (date: string) => {
    setSelectedDay(date);
  };

  useEffect(() => {
    axios
      .get('https://64d8b3c25f9bf5b879ce7999.mockapi.io/p')
      .then((response) => {
        setCalendarData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex  gap-10 p-10">
      <div className=" w-1/12 border-2">
        <div>
          <div className="flex flex-col gap-10">
            {calendarData.map((dayData) => (
              <button
                key={dayData.date}
                onClick={() => handleDayClick(dayData.date)}
                className={`day ${
                  selectedDay === dayData.date
                    ? "border-b-4 border-purple-500 p-1"
                    : ""
                }`}
              >
                <h1 className="text-lg font-medium text-slate-600 p-3">
                  {dayData.day}
                </h1>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex border-2 w-6/12">
        {selectedDay && (
          <div className="flex flex-col gap-5 w-full justify-start">
            <h2 className="text-lg font-medium text-slate-600 w-1/4 p-3 ">
              {selectedDay}
            </h2>
            <ul className="flex justify-between flex-col gap-5 ">
              {(
                calendarData.find((dayData) => dayData.date === selectedDay)
                  ?.hours || []
              )
                //to sort time
                .sort((a, b) => {
                  const timeA = a.time.toLowerCase();
                  const timeB = b.time.toLowerCase();
                  return timeA.localeCompare(timeB);
                })
                .map((hourData) => (
                  <li>
                    <div
                      key={hourData.time}
                      className="flex gap-5 border-b-2 p-1"
                    >
                      <span className="text-lg font-medium text-slate-600 w-1/4 p-3 ">
                        {hourData.time}
                      </span>{" "}
                      {hourData.requests && hourData.requests ? (
                        <ul className="bg-blue-700 text-white font-medium p-3 rounded-md w-full">
                          {hourData.requests.map((request) => (
                            <li
                              key={request.name}
                              className="flex gap-5 items-center justify-between"
                            >
                              <span>{request.name}</span>
                              <span>{request.duration}</span>
                              {request.topics}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
