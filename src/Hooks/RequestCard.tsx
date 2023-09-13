import axios from "axios";
import { useEffect, useState } from "react";

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

const url = "https://64d8b3c25f9bf5b879ce7999.mockapi.io/p";

export default function RequestCard() {
  const [instructor, setInstructor] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState<IRequest[]>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  try {
    useEffect(() => {
      axios
        .get("https://64d8b3c25f9bf5b879ce7999.mockapi.io/users")
        .then((response) => {
          setInstructor(response.data);
        });
    }, []);
  } catch (error) {
    console.log(error);
  }

  //get All Request
  try {
    useEffect(() => {
      setIsLoading(true);
      axios.get(url).then((response) => {
        setRequest(response.data);
        setIsLoading(false);
      });
    }, []);
  } catch (error) {
    console.log(error);
  }

  //filter request by user id or trainer id
  const localId = localStorage.getItem("id");
  const requestFilter = request.filter((e) =>
    e.userId == localId ? e.userId == localId : e.trainerId == localId
  );

  //chick user if Instructor
  const Instructor = instructor.find((e) => e.id == localId);
  const isInstructor = Instructor?.isInstructor;

  console.log(isInstructor);

  // Delete Request
  const DeleteBtn = (id: string) => {
    const confirmAction = confirm("هل تريد حذف الطلب");
    if (confirmAction) {
      axios.delete(url + "/" + id).then(() => {
        setRequest(
          request.filter((del) => {
            return del.id !== id;
          })
        );
      });
    } else {
      return;
    }
  };

  const input = (check: string, id: string) => {
    if (check === "true") {
      axios.put(url + "/" + id, {
        approval: "تم القبول",
      });
    } else if (check === "false") {
      const confirmAction = confirm("هل تريد رفض الطلب");
      if (confirmAction) {
        axios.put(url + "/" + id, {
          approval: "مرفوض",
        });
      } else {
        return;
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="flex justify-center  mt-4 gap-11 w-full shadow-md shadow-slate-300 rounded-md bg-white overflow-y-auto whitespace-nowrap mb-4">
          <div className="flex-col border bg-slate-50  w-full ">
            <p className="text-2xl p-3">الطلبات</p>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="spinner"></div>
              </div>
            ) : (
              requestFilter.map((e) => (
                <>
                  <div className="flex justify-between w-full border items-center text-white">
                    {e.approval == "تم القبول" ? (
                      <>
                        {isInstructor ? (
                          ""
                        ) : (
                          <div
                            onClick={() => DeleteBtn(e.id)}
                            className="cursor-pointer h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-red-600"
                          >
                            {" "}
                            حذف
                          </div>
                        )}

                        {isInstructor ? (
                          <div>
                            <button
                              type="button"
                              onClick={() => input("true", e.id)}
                              className="h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-blue-200  "
                              disabled
                            >
                              {" "}
                              قبول
                            </button>
                            <button
                              onClick={() => input("false", e.id)}
                              className=" h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-red-200"
                              disabled
                            >
                              {" "}
                              رفض
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : e.approval == "مرفوض" ? (
                      <>
                        {isInstructor ? (
                          ""
                        ) : (
                          <div
                            onClick={() => DeleteBtn(e.id)}
                            className="cursor-pointer h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-red-600"
                          >
                            {" "}
                            حذف
                          </div>
                        )}

                        {isInstructor ? (
                          <div>
                            <button
                              type="button"
                              onClick={() => input("true", e.id)}
                              className="h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-blue-200  "
                              disabled
                            >
                              {" "}
                              قبول
                            </button>
                            <button
                              onClick={() => input("false", e.id)}
                              className=" h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-red-200"
                              disabled
                            >
                              {" "}
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
                            onClick={() => DeleteBtn(e.id)}
                            className="cursor-pointer h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-red-600"
                          >
                            {" "}
                            حذف
                          </div>
                        )}

                        {isInstructor ? (
                          <div>
                            <button
                              type="button"
                              onClick={() => input("true", e.id)}
                              className="h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-blue-600  "
                            >
                              {" "}
                              قبول
                            </button>
                            <button
                              onClick={() => input("false", e.id)}
                              className=" h-6 w-20 mr-3  rounded-md text-white text-center text-sm bg-red-600"
                            >
                              {" "}
                              رفض
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}

                    <button className="w-full" onClick={handleOpen}>
                      <div
                        className="flex justify-between m-5 text-black"
                        key={e.id}
                      >
                        <div></div>
                        <div>المرسل : {e.name}</div>
                        {e.approval == "تم القبول" ? (
                          <div className="bg-green-500 rounded-md w-24 text-center text-sm text-white">
                            <p>الحالة : {e.approval}</p>
                          </div>
                        ) : e.approval == "مرفوض" ? (
                          <div className="bg-red-500 rounded-md w-20 text-center text-sm text-white">
                            <p>الحالة : {e.approval}</p>
                          </div>
                        ) : (
                          <div className="bg-slate-500 rounded-md w-24 text-center text-sm text-white">
                            <p>الحالة : {e.approval}</p>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
