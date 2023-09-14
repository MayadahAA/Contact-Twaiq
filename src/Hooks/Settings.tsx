import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../Components/Navigation";
import { Link } from "react-router-dom";

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
  const [updateStatus, setUpdateStatus] = useState<string>("");

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

  const user = instructor.find((e) => e.id == id);

  const handleEdit = () => {
    setUpdate(true);
  };

  const updateUserInfo = () => {
    axios
      .put(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users/${user?.id}`, {
        id: user?.id,
        name: user?.name,
        username: user?.username,
        role: user?.role,
        status: updateStatus,
        description: user?.description,
      })
      .then(() => {
        console.log("User info updated.");
        setUpdate(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    localStorage.clear();
    localStorage.removeItem("id");
    window.location.href = "/signin";
  };

  return (
    <div className="h-screen bg-slate-100">
      <div className="flex justify-center p-5 gap-3">
        <div className="w-2/12">
          <Navigation />
        </div>

        <div className="flex flex-col w-full">
          <h1 className="text-2xl p-5">الاعدادات</h1>
          <div className="p-4 bg-white rounded-lg shadow sm:p-5">
            <div className="p-4 h-full md:h-auto">
              <div className="flex items-center border-b sm:mb-5">
                {user && (
                  <div className="w-full flex justify-around">
                    <div className="w-full">
                      <div className="flex flex-col gap-10 justify-center items-center">
                        <div className="w-32 rounded-full relative">
                          <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt=""
                            className="rounded-full relative"
                          />
                          <div
                            className={`bottom-0 right-2 absolute w-7 h-7 border-4 border-white rounded-full ${
                              user.status === "busy" ? "bg-red-500" : ""
                            } ${
                              user.status === "available" ? "bg-blue-400" : ""
                            }${
                              user.status === "not available"
                                ? "bg-slate-500"
                                : ""
                            }`}
                          ></div>
                        </div>
                        <div className="flex justify-end w-full">
                          <p>عدل بياناتك</p>
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
                        </div>
                        <div className="flex gap-4 flex-col justify-around w-full">
                          <div className="flex items-center gap-2 w-full border-b-2 pb-3">
                            <label className="block mb-2 text-sm w-full font-medium text-gray-900 ">
                              الاسم
                            </label>
                            <input
                              type="text"
                              value={user?.name}
                              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 p-2.5"
                              disabled={!update}
                              placeholder={user?.name}
                              onChange={(e) => {
                                if (update) {
                                  const updatedName = e.target.value;
                                  setInstructor((prevInstructors) => {
                                    const updatedInstructors =
                                      prevInstructors.map((instructor) =>
                                        instructor.id === user?.id
                                          ? {
                                              ...instructor,
                                              name: updatedName,
                                            }
                                          : instructor
                                      );
                                    return updatedInstructors;
                                  });
                                }
                              }}
                            />
                          </div>
                          <div className="border-b-2 pb-3 flex items-center gap-2 w-full">
                            <label className="block mb-2 text-sm w-full font-medium text-gray-900 ">
                              اسم المستخدم
                            </label>
                            <input
                              type="text"
                              value={user?.username}
                              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 p-2.5"
                              disabled={!update}
                              placeholder={user?.username}
                              onChange={(e) => {
                                if (update) {
                                  const updatedUsername = e.target.value;
                                  setInstructor((prevInstructors) => {
                                    const updatedInstructor =
                                      prevInstructors.map((instructor) =>
                                        instructor.id === user?.id
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
                          <div className="border-b-2 pb-3 flex items-center gap-2 w-full">
                            <label className="block mb-2 text-sm w-full font-medium text-gray-900 ">
                              المسمى الوظيفي{" "}
                            </label>
                            <input
                              type="text"
                              value={user?.role}
                              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 p-2.5"
                              disabled={!update}
                              placeholder={user?.role}
                              onChange={(e) => {
                                if (update) {
                                  const updatedRole = e.target.value;
                                  setInstructor((prevInstructors) => {
                                    const updatedInstructor =
                                      prevInstructors.map((instructor) =>
                                        instructor.id === user?.id
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
                          <div className="border-b-2 pb-3 flex items-center gap-2 w-full">
                            <label className="block mb-2 text-sm w-full font-medium text-gray-900 ">
                              المهارات والاهتمامات{" "}
                            </label>{" "}
                            <input
                              type="text"
                              value={user?.topics}
                              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 p-2.5"
                              disabled={!update}
                              onChange={(e) => {
                                if (update) {
                                  const updatedTopics = e.target.value;
                                  const topicsA = updatedTopics.split(", ");
                                  setInstructor((prevInstructors) => {
                                    const updatedInstructor =
                                      prevInstructors.map((instructor) =>
                                        instructor.id === user?.id
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
                          <div className="border-b-2 pb-3 flex items-center gap-2 w-full">
                            <label className="block mb-2 text-sm w-full font-medium text-gray-900 ">
                              نبذة{" "}
                            </label>{" "}
                            <textarea
                              value={user?.description}
                              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 p-2.5"
                              disabled={!update}
                              placeholder={user?.description}
                              onChange={(e) => {
                                if (update) {
                                  const updatedDescription = e.target.value;
                                  setInstructor((prevInstructors) => {
                                    const updatedInstructor =
                                      prevInstructors.map((instructor) =>
                                        instructor.id === user?.id
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
                        <div className="border-b-2 pb-3 w-full flex items-center justify-center gap-10">
                          <h1 className="block mb-2 text-sm w-full font-medium text-gray-900 ">
                            الحالة
                          </h1>
                          <div className="flex gap-5 w-full">
                            <h1 className="font-medium text-slate-700">
                              متاح:
                            </h1>
                            <button
                              value="available"
                              onClick={() => setUpdateStatus("available")}
                              className={`bg-blue-600  rounded-full w-7 h-7 border-white border-2 ${
                                updateStatus === "available"
                                  ? "ring-2 ring-blue-500"
                                  : ""
                              }`}
                            ></button>
                            <h1 className="font-medium text-slate-700">
                              مشغول:
                            </h1>
                            <button
                              value="busy"
                              onClick={() => setUpdateStatus("busy")}
                              className={`bg-red-600  rounded-full w-7 h-7 border-white border-2 ${
                                updateStatus === "busy"
                                  ? "ring-2 ring-red-500"
                                  : ""
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
                        </div>
                        <div className="flex gap-10 justify-center w-full">
                          <button
                            onClick={updateUserInfo}
                            className="bg-purple-600 rounded-md text-white font-medium p-2 px-5"
                          >
                            حفظ
                          </button>
                          <Link to="/settings">
                            <button className="bg-slate-100 rounded-md text-slate-800 font-medium p-2 px-5">
                              إلغاء
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-1/6 float-left bg-red-600 text-white flex items-center justify-center p-2 rounded-md">
                <button onClick={logout}>تسجيل الخروج</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
