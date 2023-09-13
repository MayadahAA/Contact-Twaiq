import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
export default function NewRequest() {
  const url = "https://64d8b3c25f9bf5b879ce7999.mockapi.io/p";

  // const url = 'https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/request'
  const { userId } = useParams();
  console.log(userId);

  //useState Object of request
  const [requests, setRequest] = useState<CalendarDataItem[]>([
    {
      date: "",
      day: "",
      hours: [
        {
          time: "",
          requests: [
            {
              name: "",
              duration: "",
              topics: [],
            },
          ],
        },
      ],
    },
  ]);

  const id = localStorage.getItem("id");

  //input request from fields
  const input = () => {
    try {
      //post Request to EndPoint
      axios
        .post(url, {
          date: requests.date,
          userId: id,
          trainerId: userId,
          description: requests.description,
          approval: false,
        })
        .then(function (response) {
          console.log(response);
        });
    } catch (Error) {
      console.error();
    }
    setRequest({ ...requests, description: "" });
    alert("ok");
  };

  return (
    <>
      <div className="flex justify-center p-5 gap-3 ">
        <div className="flex flex-col bg-white border-2 justify-center items-center gap-5  px-3 font-medium p-5 w-96 h-full  rounded ">
          {/* fields of New Request  */}
          <div className="font-bold self-start ml-5">New Request</div>
          <div>
            <input
              className="border border-black p-1 rounded w-80"
              type="date"
              value={requests.date}
              onChange={(e) =>
                setRequest({ ...requests, date: e.target.value })
              }
            />
          </div>
          <div>
            <input
              className="border border-black p-1 rounded w-80"
              type="text"
              value={requests.description}
              onChange={(e) =>
                setRequest({ ...requests, description: e.target.value })
              }
            />
          </div>
          <div className="self-center ">
            <button
              className="bg-red-500 border w-28 h-10 text-white rounded"
              onClick={input}
            >
              Send
            </button>
          </div>

          <div>
            <input
              className="border border-black p-1 rounded w-80"
              type="text"
              value={requests.description}
              onChange={(e) =>
                setRequest({ ...requests, description: e.target.value })
              }
            />
          </div>
          <div className="self-center ">
            <button
              className="bg-red-500 border w-28 h-10 text-white rounded"
              onClick={input}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
