import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../Components/Navigation";

type IUser = {
  id: string;
  name: string;
  username: string;
  role: string;
  topics: string[];
  status: string;
  description: string;
};

export default function Settings() {
  const [instructor, setInstructor] = useState<IUser[]>([]);

  const [update, setUpdate] = useState(false);

  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users`)
      .then((response) => {
        setInstructor(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const x = instructor.find((e) => e.id == id);
  const [updateStatus, setUpdateStatus] = useState<string>(
    x?.status || "available"
  );

  console.log(x?.id);

  const handleEdit = () => {
    setUpdate(true);
  };

  const updateUserInfo = () => {
    axios
      .put(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users/${x?.id}`, {
        id: x?.id,
        name: x?.name,
        username: x?.username,
        role: x?.role,
        status: updateStatus,
        description: x?.description,
      })
      .then(() => {
        console.log("se");

        setUpdate(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("id");
    location.href = "/signin";
  };

  return (
    <>
      <div className="h-fit pb-80 bg-slate-100">
        <div className="flex  justify-center p-5 gap-3 ">
          <div className="w-2/12">
            <Navigation />
          </div>

          <div className="flex flex-col w-full">
            <h1 className="text-2xl p-5">الاعدادات</h1>
            <div className="flex flex-col  justify-around w-full bg-white">
              <div className=" justify-center items-center w-full md:inset-0 md:h-full">
<div className=" p-4 w-full max-w-2xl h-full md:h-auto">

              {x && (
                <div>
                  <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 mx-auto">
                    <div className="flex flex-col gap-10 justify-center w-2/4 items-center">
                      {/* avatar start*/}
                      <div className="w-32 rounded-full relative">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          alt=""
                          className="rounded-full relative"
                        />
                        <div
                          className={`bottom-0 right-16 absolute  w-7 h-7 border-4 border-white  rounded-full ${
                            x.status === "busy" ? "bg-red-500" : ""
                          } ${x.status === "available" ? "bg-blue-400" : ""}${
                            x.status === "not available" ? "bg-slate-500" : ""
                          }`}
                        ></div>
                      </div>
                      {/* avatar end */}

                      <div className="flex gap-2 flex-col w-96">
                        {/* user info */}
                        <button onClick={handleEdit}>
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
                        {/* name */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={x?.name}
                            className="border p-1 rounded-md w-full"
                            disabled={!update}
                            placeholder={x?.name}
                            onChange={(e) => {
                              if (update) {
                                const updatedName = e.target.value;
                                setInstructor((prevInstructors) => {
                                  const updatedInstructors =
                                    prevInstructors.map((instructor) =>
                                      instructor.id === x?.id
                                        ? { ...instructor, name: updatedName }
                                        : instructor
                                    );
                                  return updatedInstructors;
                                });
                              }
                            }}
                          />
                        </div>
                        {/* username */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={x?.username}
                            className="border p-1 rounded-md w-full"
                            disabled={!update}
                            placeholder={x?.username}
                            onChange={(e) => {
                              if (update) {
                                const updatedUsername = e.target.value;
                                setInstructor((prevInstructors) => {
                                  const updatedInstructor = prevInstructors.map(
                                    (instructor) =>
                                      instructor.id === x?.id
                                        ? {
                                            ...instructor,
                                            username: updatedUsername,
                                          }
                                        : instructor
                                  );
                                  return updatedInstructor;
                                });
                              }
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={x?.role}
                            className="border p-1 rounded-md w-full"
                            disabled={!update}
                            placeholder={x?.role}
                            onChange={(e) => {
                              if (update) {
                                const updatedRole = e.target.value;
                                setInstructor((prevInstructors) => {
                                  const updatedInstructor = prevInstructors.map(
                                    (instructor) =>
                                      instructor.id === x?.id
                                        ? {
                                            ...instructor,
                                            role: updatedRole,
                                          }
                                        : instructor
                                  );
                                  return updatedInstructor;
                                });
                              }
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={x?.topics}
                            className="border p-1 rounded-md w-full"
                            disabled={!update}
                            onChange={(e) => {
                              if (update) {
                                const updatedTopics = e.target.value;
                                const topicsA = updatedTopics.split(", ");
                                setInstructor((prevInstructors) => {
                                  const updatedInstructor = prevInstructors.map(
                                    (instructor) =>
                                      instructor.id === x?.id
                                        ? {
                                            ...instructor,
                                            topics: topicsA,
                                          }
                                        : instructor
                                  );
                                  return updatedInstructor;
                                });
                              }
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 ">
                          <textarea
                            value={x?.description}
                            className="border p-1 rounded-md w-full"
                            disabled={!update}
                            placeholder={x?.description}
                            onChange={(e) => {
                              if (update) {
                                const updatedDescription = e.target.value;
                                setInstructor((prevInstructors) => {
                                  const updatedInstructor = prevInstructors.map(
                                    (instructor) =>
                                      instructor.id === x?.id
                                        ? {
                                            ...instructor,
                                            description: updatedDescription,
                                          }
                                        : instructor
                                  );
                                  return updatedInstructor;
                                });
                              }
                            }}
                          />
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
                          value="available"
                          onClick={() => setUpdateStatus("available")}
                          className={`bg-blue-600  rounded-full w-7 h-7 border-white border-2 ${
                            updateStatus === "available"
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                        ></button>

                        {/* busy */}
                        <h1 className="font-medium text-slate-700">مشغول:</h1>
                        <button
                          value="busy"
                          onClick={() => setUpdateStatus("busy")}
                          className={`bg-red-600  rounded-full w-7 h-7 border-white border-2 ${
                            updateStatus === "busy" ? "ring-2 ring-red-500" : ""
                          }`}
                        ></button>

                        {/* not available */}
                        <h1 className="font-medium text-slate-700">
                          غير متاح:
                        </h1>
                        <button
                          value="not available"
                          onClick={() => setUpdateStatus("not available")}
                          className={`bg-slate-400  rounded-full w-7 h-7 border-white border-2 ${
                            updateStatus === "not available"
                              ? "ring-2 ring-slate-400"
                              : ""
                          }`}
                        ></button>
                      </div>
                      {/* status end*/}
                      <div>
                        <button
                          onClick={updateUserInfo}
                          className="bg-purple-600 rounded-md text-white font-medium p-2 px-5"
                        >
                          save
                        </button>
                        <button className="bg-slate-100 rounded-md text-slate-800 font-medium p-2 px-5">
                          cancel
                        </button>

                        <button onClick={logout}>logout</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}{" "}
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
