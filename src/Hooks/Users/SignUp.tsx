import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const url = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/users";
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
          description: ""
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
        <div className="bg-white shadow-sm h-1/2 flex-col flex justify-around gap-3 p-10 w-1/4 rounded-lg">
          {/* msg */}
          <div className="text-red-600 font-bold"> {msg}</div>
          {/* all fields of sign up  */}
          <div className="font-medium text-center">Sign Up</div>
          <div className="flex gap-3">
            <div>
              <input
                className="border border-slate-400 p-1 rounded-md  w-full"
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div>
              <input
                className="border border-slate-400 p-1 rounded-md  w-full"
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <input
              className="border border-slate-400 p-1 rounded-md  w-full"
              type="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            <input
              className="border border-slate-400 p-1 rounded-md  w-full"
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
            Sign Up
          </button>

          <div >
            <p className="flex  w-full gap-4 items-center text-center justify-center" >
              Alerady Have Account?{" "}
              <Link to="/signin">
                {" "}
                <p className="text-purple-700 font-medium">Sign In</p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
