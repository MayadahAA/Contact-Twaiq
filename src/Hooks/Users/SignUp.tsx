import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const url = "https://64d8b3c25f9bf5b879ce7999.mockapi.io/users";
  const navigate = useNavigate();

  //useState Object
  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  //input from fields
  const input = () => {
    try {
      //Check inputs before Sign up
      if (user.username == "" || user.email == "" || user.password == "") {
        setMsg("Please fill in the fields !");
        return;
      } else if (user.username.length < 5) {
        setMsg("Username must be more than 5 characters !");
        return;
      } else if (user.password.length < 5) {
        setMsg("Password must be more than 5 !");
        return;
      }

      //post Data to url api
      axios
        .post(url, {
          username: user.username,
          email: user.email,
          password: user.password,
          name: user.name,
          status: "not availble",
          description: "",
          role: "",
          topics: [],
        })
        .then(function (response) {
          console.log(response);
        });
    } catch (Error) {
      console.error();
    }
    //redirect to login page when successful sign up
    navigate("/signin");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center border-2 h-screen bg-slate-200">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            {/* msg */}
            <div className="text-red-600 font-bold"> {msg}</div>
            {/* all fields of sign up  */}
            <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              انشاء حساب
            </div>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  اسم المستخدم{" "}
                </label>
                <input
                  className="border border-slate-400 p-2 rounded-sm  w-full"
                  type="text"
                  placeholder="@"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  الاسم{" "}
                </label>
                <input
                  className="border border-slate-400 p-2 rounded-sm  w-full"
                  type="text"
                  placeholder="احمد محمد"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                البريد الالكتروني
              </label>

              <input
                className="border border-slate-400 p-2 rounded-sm  w-full"
                type="email"
                placeholder="name@example.com "
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  كلمة المرور{" "}
                </label>
              <input
                className="border border-slate-400 p-2 rounded-sm  w-full"
                type="password"
                placeholder="••••••••"                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <button
            type="submit"
             className=" w-full text-white bg-cyan-500 hover:bg-primary-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
              onClick={input}
            >
          انشئ الحساب
            </button>

            <div>
              <p className="flex gap-2 text-sm font-light text-gray-500 dark:text-gray-400">
                هل لديك حساب مسبق؟{" "}
                <Link to="/signin">
                  {" "}
                  <p className="text-cyan-500 font-medium  hover:underline ">سجل الدخول</p>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
