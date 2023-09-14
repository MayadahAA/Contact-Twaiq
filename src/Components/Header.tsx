import { Link } from "react-router-dom";
import logo from "../assets/academy-logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";

type IUser = {
  id: string;
  name: string;
  username: string;
  role: string;
  topics: string[];
  status: string;
};

export default function Header() {
  const [instructor, setInstructor] = useState<IUser[]>([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users/${id}`)
      .then((response) => {
        setInstructor(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const statusState =
    instructor.status === "busy"
      ? "bg-red-500"
      : instructor.status === "available"
      ? "bg-blue-400"
      : "bg-slate-500";

  return (
    <>
      {instructor && (
        <nav className="flex justify-center">
          <ul className="gap-4 p-3 bg-white w-full font-bold text-sm">
            <div className="flex justify-between px-10 items-center text-slate-800">
              <div className="flex items-center gap-5 text-2xl font-medium text-purple-950"> 
                <Link to="/">
                  <div>
                    <img src={logo} alt="" />
                  </div>
                </Link>
                  <h1 >تـــــواصــل</h1>
              </div>
              <div className="flex items-center gap-4 ">

              <div className=" max-sm:hidden  text-sm flex gap-2 text-slate-700">
                <h1>   اهلا </h1>
                <p>{instructor.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/settings">
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt=""
                    />
                    <div
                      className={`bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white  rounded-full ${statusState}`}
                    ></div>
                  </div>
                </Link>
              </div>
              </div>
              
            </div>
          </ul>
        </nav>
      )}
    </>
  );
}
