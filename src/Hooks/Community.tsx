import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Data {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

export default function Community() {
  const [getItems, setItems] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      axios
        .get("https://6500f50418c34dee0cd5876c.mockapi.io/community")
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="w-full max-w-sm rounded-lg  ">
        <Link to="/Newsession">
          <button
            className="flex items-center justify-around my-6 w-full md:w-52 h-12 rounded-xl bg-purple-300 text-white"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <h1>اضافة جلسة جديدة</h1>
          </button>
        </Link>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center pb-10">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center pb-10">
          <div className="flex flex-wrap justify-center md:justify-between gap-8 h-auto w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
            {getItems.map((e) => (
              <div
                className="flex-col text-center w-full md:w-5/12 lg:w-4/12 xl:w-3/12 mb-8"
                key={e.id}
              >
                <div className="h-full rounded-lg overflow-hidden shadow-lg bg-white p-4">
                  <div className="flex justify-center">
                    <img
                      className="w-24 h-24 mb-3 rounded-full "
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt="Sunset in the mountains"
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <div className="mb-1 text-xl font-medium text-slate-700 py-3">
                      {e.title}
                    </div>
                    <p className="text-sm text-gray-500 ">التاريخ : {e.date}</p>
                    <p className="text-sm text-gray-500 ">الوقت : {e.time}</p>
                  </div>
                  <p className="text-sm text-slate-500 ">
                    الموقع : {e.location}
                  </p>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-cyan-100 text-slate-900 rounded-full px-3 py-1 text-sm  mr-2 mb-2">
                      #photography
                    </span>
                    <span className="inline-block bg-cyan-100 text-slate-900 rounded-full px-3 py-1 text-sm  mr-2 mb-2">
                      #travel
                    </span>
                    <span className="inline-block bg-cyan-100 text-slate-900 rounded-full px-3 py-1 text-sm  mr-2 mb-2">
                      #winter
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}