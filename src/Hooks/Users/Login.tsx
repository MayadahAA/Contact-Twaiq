import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
}

export default function Login() {
  const url = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/users";
  const navigate = useNavigate();

  //useState for Login validation or rejection message
  const [msg, setMsg] = useState("");

  //useState Object variables to login
  const [user, setUser] = useState({
    username: "",
    password: "",
    isLogin: "",
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
    console.log("---------------------------------- " + userApi?.username);
    try {
      //Check inputs before login
      if (user.username == "" || user.password == "") {
        setMsg("Please fill in the fields !");
        return;
      }

      //validate username and password match if in the database
      else if (
        userApi?.username == user.username &&
        userApi?.password == user.password
      ) {
        //Confirm login and stored value in  localStorage
        localStorage.setItem("username", user.username);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("email", userApi.email);
        // userApi.isLogin = true

        //redirect to Home  page when successful login
        navigate("/");
      } else {
        setMsg("username or password is incorrect!");
      }
    } catch (Error) {
      console.error();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center border-2 h-screen bg-slate-200">
        <div className="bg-white shadow-sm h-1/2 flex-col flex justify-around gap-3 p-10 w-1/4 rounded-lg">
          {/* msg */}
          <div className="text-red-600 "> {msg}</div>
          {/* all fields of login  */}
          <div className="font-medium text-center">Sign In</div>
          <div>
            <input
              className="border border-slate-400 p-1 rounded-md  w-full"
              placeholder="Username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div>
            <input
              className="border border-slate-400 p-1 rounded-md w-full "
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            className="bg-purple-600 p-1 w-full text-white rounded"
            onClick={input}
          >
            Sign In
          </button>
          <div >
            <p className="flex  w-full gap-4 items-center text-center justify-center" >
              Do not have account ?{" "}
              <Link to="/signup">
                {" "}
                <p className="text-purple-700 font-medium">Sign Up</p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
