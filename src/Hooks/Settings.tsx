// import axios from "axios";
// import { useEffect, useState } from "react";

// interface IUser {
//   id: string;
//   name: string;
//   field: string;
//   description: string;
//   status: string;
// }

export default function Settings() {
  // const url = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/users";
  // const [instructor, setInstructor] = useState<IUser[]>([]);

  // try {
  //   useEffect(() => {
  //     axios.get(url).then((response) => {
  //       setInstructor(response.data);
  //     });
  //   }, [instructor]);
  // } catch (error) {
  //   console.log(error);
  // }
  return (
    <>
      {/* {instructor.find((item) => (
        <div key={item.id}>
          {item.name}
        </div>
      ))} */}
      <div className="w-full h-screen">
        <div className=" flex flex-col gap-5 items-center w-full  ">
          <div className="w-32 rounded-full relative ">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt=""
              className="rounded-full relative"
            />
            <div
              className={`bg-blue-600  rounded-full w-7 h-7 absolute right-1 bottom-2 border-white border-2`}
            ></div>
          </div>
          <div className="flex gap-2 flex-col">

          <div>
            <input
              type="text"
              // value={e.name}
              className="border"
              disabled
              placeholder="name"
            />
          </div>
          <div>
            <input
              type="text"
              // value={e.username}
              className="border"
              disabled
              placeholder="Username"
            />
          </div>
          </div>
          {/* status start*/}
          <div>
            <button
              className={`bg-blue-600  rounded-full w-7 h-7 border-white border-2 focus:ring-2`}
              ></button>
            <button
              className={`bg-red-500  rounded-full w-7 h-7 border-white border-2 focus:ring-2`}
            ></button>
            <button
              className={`bg-slate-400  rounded-full w-7 h-7 border-white border-2 focus:ring-2`}
            ></button>
          </div>
              {/* status end*/}
          <div>
            <button className="bg-purple-600 rounded-md text-white font-medium p-2 px-5">
              save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
