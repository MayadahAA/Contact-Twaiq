import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IUser {
  id: string;
  name: string;
  role: string;
  status: string;
  topics: string[];
  isInstructor: boolean
}

function Instrucards() {
  const url = "https://64d8b3c25f9bf5b879ce7999.mockapi.io/users";
  const [instructors, setInstructors] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get(url).then((response) => {
      setInstructors(response.data);
      setIsLoading(false);

    });
  }, []);

  //chick if user instructor
  const isInstructors = instructors.filter((e) => e.isInstructor == true)

  const filteredInstructors = isInstructors.filter((e) => {
    const name = e.name ? e.name.toLowerCase() : "";
    const status = e.status ? e.status.toLowerCase() : "";
    const role = e.role ? e.role.toLowerCase() : "";
    const topics = e.topics ? e.topics.map((topic) => topic.toLowerCase()) : [];

    return (
      name.includes(search.toLowerCase()) ||
      status.includes(search.toLowerCase()) ||
      topics.some((topic) => topic.includes(search.toLowerCase())) ||
      role.includes(search.toLowerCase())
    );
  });

  // Sort by status order
  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    const statusOrder = { available: 1, busy: 2, "not available": 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className="flex flex-col h-fit w-full items-center">
      {
        isLoading ? (
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        ) :
          <div className="flex flex-col w-10/12 gap-5 items-center">
            {/* search input start*/}

            <div className="p-10  text-slate-800 w-11/12 flex items-center ">
              <h1 className="text-4xl">المدربين</h1>


        </div>
        <div className="flex justify-end w-11/12 items-center gap-2 p-5">
          <div className="flex items-center gap-2 rounded-md bg-white px-2 border-2 border-slate-400">
            <input
              type="text"
              className="p-2 rounded-md outline-none "
              placeholder="بحث"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-11/12 gap-10 ">
          {sortedInstructors.map((e) => (
            <div key={e.id} className="w-80 h-1/4 flex">
              <div className="h-fit">
                <div className="h-full rounded-lg shadow-md shadow-slate-300/60 bg-white items-center justify-between gap-5 flex flex-col p-10 text-center">
                  <div className="relative flex flex-col items-center justify-center">
                    <img
                      className="w-1/2 h-1/2 rounded-full"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt=""
                    />
                    <div className={`bottom-0 right-16 absolute  w-7 h-7 border-4 border-white  rounded-full ${e.status === "busy" ? "bg-red-500" : ""
                    } ${e.status === "available" ? "bg-blue-400" : ""}${
                      e.status === "not available" ? "bg-slate-500" : ""
                    }`}>

                        </div>
                      </div>


                  <div className="text-center w-3/4 ">
                    <h1> {e.name}</h1>
                    <h2>{e.role}</h2>
                  </div>
                  <div className="flex flex-wrap w-5/6 h-1/2 gap-2 text-center items-center justify-center">
                    <div className=" flex flex-wrap gap-2 items-center justify-center">
                      {e.topics.map((topic) => (
                        <h3 key={topic}>
                          <h3 className="bg-purple-100 rounded-full p-1 px-3 text-sm font-medium text-slate-800">
                            {topic}
                          </h3>
                        </h3>
                      ))}
                    </div>
                  </div>
                  <Link to={`/request/${e.id}`} className="w-full">
                    <button className="bg-purple-700 font-medium text-white p-2 w-full rounded-md">
                      تواصل
                    </button>
                  </Link>
                </div>
                {/* card end */}
              </div>
            </div>
          ))}
        </div>
        {/* cards end*/}
      </div>
}
    </div>
  );
}

export default Instrucards;
