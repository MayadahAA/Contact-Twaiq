// import { Link } from "react-router-dom";
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
export default function Navbar() {
  const [instructor, setInstructor] = useState<IUser[]>([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`https://64d8b3c25f9bf5b879ce7999.mockapi.io/users`)
      .then((response) => {
        // const userI = response.data as IUser;
        // if (userI) {
        //   setInstructor(userI);
        // } else {
        //   console.log(`User with ID ${id} not found.`);
        // }
        setInstructor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const x = instructor.find((e) => e.id == id);

  console.log("------------------" + x?.id);

  return (
    <>
    {x &&
      <nav className="flex justify-center ">
        <ul className="gap-4 p-3 bg-white w-full font-bold text-sm  ">
          <div className="flex justify-between px-10 items-center text-slate-800 ">
            <div>
              <Link to="/">
                <div>
                  <img src={logo} alt="" />
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
          
              <Link to="/settings">
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                  />
                  {/* <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-blue-400 border-2 border-white  rounded-full"></span> */
                     <div
                     className={`bottom-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white  rounded-full ${
                       x.status === "busy" ? "bg-red-500" : ""
                     } ${x.status === "available" ? "bg-blue-400" : ""}${
                       x.status === "not available" ? "bg-slate-500" : ""
                     }`}
                   ></div>}
                </div>
              </Link>
            </div>
          </div>
        </ul>
      </nav>
    }
    </>
  );
}
