import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IRequest {
  id: string;
  userId: string;
  trainerId: string;
  date: string;
  description: string;
  approval: string;
  name: string;
}

interface IUser {
  id: string;
  isInstructor: boolean;
  trainerId: string;
  username: string;
}

const urlRequest = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/request";

export default function RequestCard() {
  const [instructors, setInstructors] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRequestId, setModalRequestId] = useState<string | null>(null);

  const toggleModal = (id: string | null = null) => {
    setModalRequestId(id);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    axios.get("https://64d8b3c25f9bf5b879ce7999.mockapi.io/users")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios.get(urlRequest)
      .then((response) => {
        setRequests(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const localId = localStorage.getItem("id");
  const requestFilter = requests.filter((e) =>
    e.userId === localId ? e.userId === localId : e.trainerId === localId
  );

  const instructor = instructors.find((e) => e.id === localId);
  const isInstructor = instructor?.isInstructor;

  const deleteRequest = (id: string) => {
    const confirmAction = window.confirm("هل تريد حذف الطلب");
    if (confirmAction) {
      axios.delete(`${urlRequest}/${id}`)
        .then(() => {
          setRequests(requests.filter((del) => del.id !== id));
          toggleModal(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const updateRequest = (check: string, id: string) => {
    const approval = check === "true" ? "تم القبول" : "مرفوض";
    axios.put(`${urlRequest}/${id}`, { approval })
      .then(() => {
        const updatedRequests = requests.map((req) => {
          if (req.id === id) {
            return { ...req, approval };
          }
          return req;
        });
        setRequests(updatedRequests);
        toggleModal(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isModalOpen && (
        <div
          id="deleteModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed  inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
              <button
                type="button"
                onClick={() => toggleModal(null)}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only"></span>
              </button>
              <svg
                className="text-gray-400  w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-gray-500 ">
هل انت متأكد لحذف هذا الطلب؟              </p>
              <div className="flex justify-center items-center gap-5 space-x-4">
                <button
                  onClick={() => toggleModal(null)}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 "
                >
                  لا
                </button>
                <button
                  onClick={() => deleteRequest(modalRequestId || "")}
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-500 rounded-lg "
                >
                  نعم انا متأكد
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex justify-center mt-4 gap-11 w-full rounded-md shadow-md shadow-slate-300 bg-white overflow-y-auto mb-4">
          <div className="flex-col  bg-white w-full">
            <p className="text-2xl p-3">الطلبات</p>
            {requestFilter.map((e) => (
              <div key={e.id} className="flex justify-between w-full border items-center text-white">
                {e.approval === "تم القبول" ? (
                  <>
                    {isInstructor ? (
                      ""
                    ) : (
                      <div className="flex justify-center m-5">
                        <button
                          id="deleteButton"
                          onClick={() => toggleModal(e.id)}
                          className="block text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          type="button"
                        >
                          حذف
                        </button>
                      </div>
                    )}

                    {isInstructor ? (
                      <div>
                        <button
                          type="button"
                          className="h-6 w-20 mr-3 rounded-md text-white text-center text-sm bg-blue-200"
                          disabled
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => updateRequest("false", e.id)}
                          className="h-6 w-20 mr-3 rounded-md text-white text-center text-sm bg-red-200"
                          disabled
                        >
                          رفض
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : e.approval === "مرفوض" ? (
                  <>
                    {isInstructor ? (
                      ""
                    ) : (
                        <div className="flex justify-center m-5">
                        <button
                          onClick={() => toggleModal(e.id)}
                          className="block text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          حذف
                        </button>
                      </div>
                    )}

                    {isInstructor ? (
                      <div>
                        <button
                          type="button"
                          className="h-6 w-20 mr-3 rounded-md text-white text-center text-sm bg-blue-200"
                          disabled
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => updateRequest("false", e.id)}
                          className="h-6 w-20 mr-3 rounded-md text-white text-center text-sm bg-red-200"
                          disabled
                        >
                          رفض
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    {isInstructor ? (
                      ""
                    ) : (
                      <div
                        onClick={() => deleteRequest(e.id)}
                        className="cursor-pointer h-6 w-20 mr-3 rounded-md text-white text-center text-sm bg-red-500"
                      >
                        حذف
                      </div>
                    )}

                    {isInstructor ? (
                      <div>
                        <button
                          onClick={() => updateRequest("true", e.id)}
                          className="h-6 w-20 mr-3 rounded-md text-white text-center text-sm bg-purple-500"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => updateRequest("false", e.id)}
                          className="h-6 w-20 mr-3 rounded-md text-white text-center text-sm bg-red-500"
                        >
                          رفض
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}

                <div className="flex justify-around m-5 text-black w-full">
                  <div>المرسل : {e.name}</div>
                  <div>
                    {e.approval === "تم القبول" ? (
                      <div className="bg-green-500 rounded-md w-24 h-6 text-center text-sm text-white">
                        <p>الحالة : {e.approval}</p>
                      </div>
                    ) : e.approval === "مرفوض" ? (
                      <div className="bg-red-500 rounded-md w-24 h-6 text-center text-sm text-white">
                        <p>الحالة : {e.approval}</p>
                      </div>
                    ) : (
                      <div className="bg-slate-500 rounded-md w-24 h-6 text-center text-sm text-white">
                        <p>الحالة : {e.approval}</p>
                      </div>
                    )}
                  </div>
                  {e.approval === "مرفوض" ? (
                    <div className="pl-24"></div>
                  ) : (
                    <div className="flex bg-cyan-600 text-white w-24 h-8 rounded-md text-center">
                      <Link to={`/BookRequest/${e.id}`} className="w-full">
                        تفاصيل اكثر
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
