import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//need get name of user
interface IUser {
  id: string;
  name: string;
}

export default function NewRequest() {
  const url = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/request";
  const { userId } = useParams();
  const [RequestType, setRequestType] = useState("---");
  //to get name of user
  const [getUserApi, setUserApi] = useState<IUser[]>([]);

  //useState Object of request
  const [requests, setRequest] = useState({
    date: "",
    day: "",
    time: "",
    duration: "",
    description: "",
  });

  //get user name
  try {
    useEffect(() => {
      axios
        .get("https://64d8b3c25f9bf5b879ce7999.mockapi.io/users")
        .then((response) => {
          setUserApi(response.data);
        });
    }, []);
  } catch (error) {
    console.log(error);
  }

  const id = localStorage.getItem("id");

  //get name of user to stor in request
  const getUserId = getUserApi.find((e) => e.id == id);
  const nameUser = getUserId?.name;

  //input request from fields
  const input = () => {
    try {
      //post Request to EndPoint
      axios
        .post(url, {
          date: Date.now,
          userId: id,
          trainerId: userId,
          description: requests.description,
          approval: "في الانتظار",
          name: nameUser,
          type: RequestType,
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
        <h1 className="text-base" >
          رجوع
        </h1>
      </a>
      <div className="flex justify-center p-5 gap-3 ">
        <div className="w-full bg-white text-center rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

          {/* fields of New Request  */}
          <div className="font-bold self-start ml-5">طلب تواصل</div>
          <div>
            <input
              className="border border-black p-1 rounded w-80"
              type="text"
              value={requests.description}
              placeholder="محتوى طلب التواصل"
              onChange={(e) =>
                setRequest({ ...requests, description: e.target.value })
              }
            />
          </div>
          <div>
            {" "}
            <select
              className="border border-black p-1 rounded w-80"
              value={RequestType}
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option value={"false"}>الموضوع</option>
              <option value="مناقشه">مناقشه</option>
              <option value="مساعدة">مساعدة</option>
            </select>
          </div>
          <div >
            <button
                className=" w-5/6 text-white bg-cyan-500 hover:bg-primary-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
                onClick={input}
            >
              ارسال
            </button>
          </div>
            </div>
        </div>
      </div>
    </>
  );
}
