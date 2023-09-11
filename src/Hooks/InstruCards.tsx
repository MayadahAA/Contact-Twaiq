import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IUser {
  id: string;
  name: string;
  role: string;
  status: string;
  topics: string[];
}

function Instrucards() {
  const url = "https://64d8b3c25f9bf5b879ce7999.mockapi.io/users";
  const [instructor, setInstructor] = useState<IUser[]>([]);
  const [search, setSearch] = useState<string>("");

  

  try {
    useEffect(() => {
      axios.get(url).then((response) => {
        setInstructor(response.data);
      });
    }, [instructor]);
  } catch (error) {
    console.log(error);
  }

  const searchHandler = instructor.filter(
    (e) => {

      const name = e.name ? e.name.toLowerCase() : ""; 
      const status = e.status ? e.status.toLowerCase() : ""; 
      return name.includes(search.toLowerCase()) || status.includes(search.toLowerCase());

    }
  
  );

  return (
    <>
      {/* search input start*/}
      <div className="flex justify-end p-5">
        <input
          type="text"
          className="p-2 rounded-md bg-slate-50 border-2 border-slate-400"
          placeholder="بحث"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
<h1>المدربين</h1>
      <div className="flex flex-wrap justify-center w-11/12  h-full gap-4 ">


        {searchHandler.map((e) => (
          <div key={e.id}>
            <div>
              {/* {instructor.map((e) => (
                <div key={e.id}> */}
              <div className="bg-white w-75 items-center gap-5 flex flex-col p-10  text-center ">
                <div className="w-32 rounded-full relative ">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                    className="rounded-full relative"
                  />
                  <div
                    className={`  rounded-full w-7 h-7 absolute right-1 bottom-2 border-white border-2 ${
                      e.status === "busy" ? "bg-red-500" : ""
                    } ${
                      e.status === "available"
                        ? "bg-blue-600"
                        : ""
                    }${
                      e.status === "not available"
                        ? "bg-slate-500"
                        : ""
                    }
                    `}
                  ></div>
                </div>

                <div className="text-center w-3/4 border">
                  <h1> {e.name}</h1>
                  <h2>{e.role}</h2>
                </div>
                <div className="flex flex-wrap w-3/4 gap-2 text-center items-center justify-center">
                  <div className="border flex flex-wrap gap-2 w-5/6">
               
                    {e.topics.map((topic) => (
                      <h3 key={topic}>
                        <h3 className="bg-purple-50 rounded-full p-1 px-3 text-sm font-medium text-slate-800">{topic}</h3>
                      </h3>
                    ))}
                  </div>
                  
                </div>
                <Link to={`/request/${e.id}`} className="w-full">
                  <button className="bg-purple-700 text-white p-2 w-full">
                    Send Request
                  </button>
                </Link>
              </div>
              {/*  card end */}
              {/* </div> */}
              {/* // ))} */}
            </div>
          </div>
        ))}
   
      </div>
      {/* search input end*/}
    </>
  );
}

export default Instrucards;
