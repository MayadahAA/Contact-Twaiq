import axios from "axios";
import { useEffect, useState } from "react";

type IUser = {
  id: string;
  name: string;
  username: string;
  role: string;
  topics: string[];
  status: string;
};

export default function Settings() {
  const [instructor, setInstructor] = useState<IUser | null>(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!id) return;

    // Fetch the user from the API based on the stored ID
    axios
      .get(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users/${id}`)
      .then((response) => {
        const userI = response.data as IUser;
        if (userI) {
          setInstructor(userI);
        } else {
          console.log(`User with ID ${id} not found.`);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  return (
    <>
      {instructor && (
        <div>
          <div>{instructor.id}</div>
          <div className="w-full h-screen items-center flex justify-center">
            <div className="flex flex-col gap-10 justify-center w-2/4 items-center">
              <div className="w-32 rounded-full relative">
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
                {/* name & username */}
                {/* name */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={instructor.username}
                    className="border p-1 rounded-md"
                    disabled
                    placeholder={instructor.username}
                  />
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-slate-500 bg-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
                {/* username */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={instructor.username}
                    className="border p-1 rounded-md"
                    disabled
                    placeholder={instructor.username}
                  />
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-slate-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* status start*/}
              <h1 className="text-right w-1/2 font-medium text-slate-600 text-lg">
                الحالة:
              </h1>
              <div className="flex items-center justify-center gap-10">
                {/* available */}
                <h1 className="font-medium text-slate-700">متاح:</h1>
                <button
                  className={`bg-blue-600  rounded-full w-7 h-7 border-white border-2 focus:ring-2`}
                ></button>

                {/* busy */}
                <h1 className="font-medium text-slate-700">مشغول:</h1>

                <button
                  className={`bg-red-500  rounded-full w-7 h-7 border-white border-2 focus:ring-2`}
                ></button>

                {/* not available */}
                <h1 className="font-medium text-slate-700">غير متاح:</h1>

                <button
                  className={`bg-slate-400  rounded-full w-7 h-7 border-white border-2 focus:ring-2`}
                ></button>
              </div>
              {/* status end*/}
              <div>
                <button className="bg-purple-600 rounded-md text-white font-medium p-2 px-5">
                  save
                </button>
                <button className="bg-slate-100 rounded-md text-slate-800 font-medium p-2 px-5">
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
