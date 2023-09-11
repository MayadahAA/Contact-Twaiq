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
    <div className=" flex justify-center">
      <div className="flex justify-center w-4/6 h-2/6 border bg-white">
 {/* days */}
 <div className="w-2/6  pb-5 scrollbar overflow-auto">
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
                    dayData.day === "الجمعة" ? "hidden" : ""
                  } ${dayData.day === "السبت" ? "hidden" : ""}`}
                >
                  {dayData.day}
                </h1>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* calendar */}
      <div className="flex w-full ">
        {selectedDay && (
          <div className="flex flex-col gap-5 w-full justify-start  p-4 rounded-md">
            {/* selected date */}
            <h2 className="text-2xl font-medium text-right text-slate-600 w-full p-3 ">
              {selectedDay}
            </h2>

            <ul className="flex justify-between  flex-col  ">
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
                  <li className="border-2 p-2 rounded-sm">
                    
                    <div
                      key={hourData.time}
                      className="flex p-1"
                    >
                          <span className="text-xl  flex justify-center font-semibold text-slate-600 w-1/4 p-3 ">
                        {hourData.time}
                      </span>{" "}

                  
                          {hourData.requests && (
                        <ul className=" border bg-cyan-800/10 border-cyan-900/20 text-slate-600 font-medium p-3 rounded-md w-full">
                          {hourData.requests.map((request) => (
                            // request card
                            <li
                              key={request.name}
                              className="flex gap-5 items-center  justify-between "
                            >
                              <span className="font-semibold">{request.name}</span>
                              <span>{request.duration}</span>
                              {request.topics}
                            </li>
                          ))}
                        </ul>
                      )}
                  
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
     
      </div>
      
    </div>
  );
}

export default Calendar;
