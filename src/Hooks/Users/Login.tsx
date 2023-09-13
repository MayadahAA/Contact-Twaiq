import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  status: string;
}

export default function Login() {
  const url = "https://64d8b3c25f9bf5b879ce7999.mockapi.io/users";
  const navigate = useNavigate();

  //useState for Login validation or rejection message
  const [msg, setMsg] = useState("");

  //useState Object variables to login
  const [user, setUser] = useState({
    username: "",
    password: "",
    isLogin: "",
    status: "",
  });

  const [getUserApi, setUserApi] = useState<IUser[]>([]);
  //get user info from database
  const userApi = getUserApi.find((users) => users.username == user.username);

  //get user from Api
  try {
    useEffect(() => {
      axios.get(url).then((response) => {
        setUserApi(response.data);
      });
    }, [getUserApi, userApi]);
  } catch (error) {
    console.log(error);
  }

  //User input from fields
  const input = () => {
    console.log("---------------------------------- " + user.username);
    console.log("---------------------------------- " + user.password);

    console.log("---------------------------------- " + userApi?.username);
    console.log("---------------------------------- " + userApi?.password);
    try {
      //Check inputs before login
      if (user.username == "" || user.password == "") {
        setMsg("فضلا ادخل اسم المستخدم و كلمة المرور!");
        return;
      }

      //validate username and password match if in the database
      else if (
        userApi?.username == user.username &&
        userApi?.password == user.password
      ) {
        //Confirm login and stored value in  localStorage
        localStorage.setItem("id", userApi.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("email", userApi.email);
        localStorage.setItem("status", userApi.status);
        // userApi.isLogin = true

        //redirect to Home  page when successful login
        navigate("/");
      } else {
        setMsg("اسم المستخدم او كلمة المرور غير صحيحة!");
      }
    } catch (Error) {
      console.error();
    }
  };

  return (
    <>
      <div className=" bg-slate-200 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* msg */}
            <div className="text-red-600 font-bold"> {msg}</div>
            {/* all fields of login  */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              سجل الدخول لحسابك
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  اسم المستخدم
                </label>

                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  placeholder="@"
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  كلمة المرور{" "}
                </label>

                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  type="password"
                  required
                  placeholder="••••••••"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              
              <button
                type="submit"
                className=" w-full text-white bg-cyan-500 hover:bg-primary-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
                onClick={input}
              >
سجل الدخول              </button>

              <div >
                <p className="flex gap-2 text-sm font-light text-gray-500 dark:text-gray-400">
                  ليس لديك حساب؟{" "}
                  <Link to="/Signup">
                    {" "}
                    <p className="text-cyan-500 font-medium  hover:underline ">
                    انشاء حساب
                    </p>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
