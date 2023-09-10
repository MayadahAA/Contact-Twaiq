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
      .get("https://64d8b3c25f9bf5b879ce7999.mockapi.io/p")
      .then((response) => {
        setCalendarData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex justify-end w-screen ">
      {/* calendar */}
      <div className="flex  border-2 w-3/6 ">
        {selectedDay && (
          <div className="flex flex-col gap-5 w-full justify-start bg-slate-50 p-4 rounded-md">
            {/* selected date */}
            <h2 className="text-2xl font-medium text-right text-slate-600 w-full p-3 ">
              {selectedDay}
            </h2>

            <ul className="flex justify-between  flex-col gap-5 ">
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
                      className="flex gap-5   p-1"
                    >
                          {hourData.requests && (
                        <ul className="bg-purple-700 text-white font-medium p-3 rounded-md w-full">
                          {hourData.requests.map((request) => (
                            // request card
                            <li
                              key={request.name}
                              className="flex gap-5 items-center  justify-between "
                            >
                              {request.topics}
                              <span>{request.duration}</span>
                              <span>{request.name}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="text-lg flex justify-center font-medium text-slate-600 w-1/4 p-3 ">
                        {hourData.time}
                      </span>{" "}

                  
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {/* days */}
      <div className="w-1/6  border-2">
        <div>
          <div className="flex flex-col gap-5 h-full w-full">
            {calendarData.map((dayData) => (
              <button
                key={dayData.date}
                onClick={() => handleDayClick(dayData.date)}
                className={` ${
                  selectedDay === dayData.date
                    ? "bg-gradient-to-t from-[#91D8DB]  w-full"
                    : ""
                }`}
              >
                <h1
                  className={` text-2xl font-medium text-slate-800 p-3 ${
                    dayData.day === "Friday" ? "hidden" : ""
                  } ${dayData.day === "Saturday" ? "hidden" : ""}`}
                >
                  {dayData.day}
                </h1>
              </button>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Calendar;
