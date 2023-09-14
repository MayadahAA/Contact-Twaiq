import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Components/Navigation";

interface IRequest {
  id: string;
  date: string;
  description: string;
  name: string;
  type: string;
}
const url = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/request";

export default function BookRequest() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState<IRequest[]>([]);
  const courantRequest = request.find((e) => e.id == String(userId));

  const [meet, setMeet] = useState({
    date: "",
    time: "",
    day: "",
    name: "",
    duration: "",
    topics: "",
  });

  const formData = {
    date: meet.date,
    day: meet.day,
    hours: [
      {
        time: meet.time,
        requests: [
          {
            name: courantRequest?.name,
            duration: meet.duration,
            topics: [meet.topics],
          },
        ],
      },
    ],
  };

  //get All Request
  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then((response) => {
      setRequest(response.data);
      setIsLoading(false);
    });
  }, []);

  const input = () => {
    //post formData
    try {
      axios
        .post("https://64d8b3c25f9bf5b879ce7999.mockapi.io/p", formData)
        .then(function (response) {
          console.log(response);
        });
    } catch (Error) {
      console.error();
    }
    setMeet({ ...meet, date: "" });
    setMeet({ ...meet, day: "" });
    setMeet({ ...meet, duration: "" });
    setMeet({ ...meet, time: "" });
  };
  return (
    <>
      <div className="h-fit  bg-slate-100">
        <div className="flex justify-center p-5 gap-3  ">
          <div className="w-1/12">
            <Navigation />
          </div>

          <div className="flex flex-col gap-6 justify-center w-full h-full p-5">
            <a href="/dashboard" className="flex items-center  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 16"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              <h1 className="text-base">رجوع</h1>
            </a>
            <div className="bg-white flex justify-between rounded-md flex-col shadow-sm">
              {isLoading ? (
                <div className="flex justify-center items-center w-full">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div className="flex justify-center  w-full  ">
                  {
                    <>
                      <div className="flex gap-10 justify-center items-center w-3/4 p-5">

                        <div className="flex items-center gap-6">
                        <p className="font-medium text-xl">الاسم :</p>

                          {courantRequest?.name}
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="font-medium text-xl">محتوى طلب التواصل :</p>
                          {courantRequest?.description}
                        </div>
                        <div className="flex items-center gap-6">
                          {" "}
                          <p className="font-medium text-xl">الموضوع :</p>{" "}
                          {courantRequest?.type}
                        </div>
                      </div>
                    </>
                  }
                </div>
              )}
              <div className="flex-col items-center flex justify-center m-3 p-10 bg-white h-fit ">
                <div className="text-2xl pb-5">
                  <p>يرجى تحديد موعد</p>
                </div>
                <div className="flex-col flex  h-full gap-6  ">
                  <div>
                    <input
                      className="border border-slate-500 p-3 rounded w-80 "
                      type="date"
                      placeholder="التاريخ"
                      value={meet.date}
                      onChange={(e) =>
                        setMeet({ ...meet, date: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    {" "}
                    <select
                      className="border border-slate-500 p-3 rounded w-80 "
                      value={meet.day}
                      onChange={(e) =>
                        setMeet({ ...meet, day: e.target.value })
                      }
                    >
                      <option value={"false"}>اليوم</option>

                      <option value="الاحد">الاحد</option>
                      <option value="الاثنين">الاثنين</option>
                      <option value="الثلاثاء">الثلاثاء</option>
                      <option value="الاربعاء">الاربعاء</option>
                      <option value="الخميس">الخميس</option>
                    </select>
                  </div>

                  {/* <div><input className="border border-black p-3 rounded w-80 " type="text" placeholder='اليوم' value={meet.day} onChange={(e) => setMeet({ ...meet, date: e.target.value })} /></div> */}

                  <div>
                    {" "}
                    <select
                      className="border border-slate-500 p-3 rounded w-80 "
                      value={meet.time}
                      onChange={(e) =>
                        setMeet({ ...meet, time: e.target.value })
                      }
                    >
                      <option value={"false"}>الوقت</option>

                      <option value="9:00">9:00</option>
                      <option value="9:30">9:30</option>
                      <option value="10:00">10:00</option>
                      <option value="10:30">10:30</option>
                      <option value="11:00">11:00</option>
                      <option value="11:30">11:30</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="01:00">01:00</option>
                      <option value="1:30">01:30</option>
                      <option value="02:00">02:00</option>
                      <option value="02:30">02:30</option>
                    </select>
                  </div>
                  {/* <div><input className="border border-black p-3 rounded w-80 " type="text" placeholder='الوقت' value={meet.time} onChange={(e) => setMeet({ ...meet, time: e.target.value })} /></div> */}

                  {/* <div><input className="border border-black p-3 rounded w-80 " type="text" placeholder='اليوم' value={meet.day} onChange={(e) => setMeet({ ...meet, day: e.target.value })} /></div> */}

                  <div>
                    <select
                      className="border border-slate-500 p-3 rounded w-80 "
                      placeholder="المدة"
                      value={meet.duration}
                      onChange={(e) =>
                        setMeet({ ...meet, duration: e.target.value })
                      }
                    >
                      <option value={"false"}>المدة</option>
                      <option value="ساعة">ساعة</option>
                      <option value="نصف ساعة">نصف ساعة</option>
                      <option value="ربع ساعة">ربع ساعة</option>
                    </select>
                  </div>

                  <div>
                    <select
                      className="border border-slate-500 p-3 rounded w-80 "
                      placeholder="المدة"
                      value={meet.topics}
                      onChange={(e) =>
                        setMeet({ ...meet, topics: e.target.value })
                      }
                    >
                      <option value={"false"}>نوع اللقاء</option>
                      <option value="مساعدة">مساعدة</option>
                      <option value="نقاش "> نقاش</option>
                    </select>
                  </div>
                  <div className=" ">
                    <button
                      className="bg-cyan-500 border w-full h-10 text-white rounded"
                      onClick={input}
                    >
                      ارسال
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
