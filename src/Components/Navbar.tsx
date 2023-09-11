// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/academy-logo.svg";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-center ">
        <ul className="gap-4 p-3 bg-white w-full font-bold text-sm  ">
          <div className="flex justify-between items-center text-slate-800 pl-6 pr-6">
            <div>
                <Link to='/'>

              <div>
                <img src={logo} alt="" />
              </div>
                </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* <Link to='/'><li className=""> HOME</li></Link>
                            <Link to='/about'><li className=""> ABOUT</li></Link>
                            <Link to='/contact'><li className=""> CONTACT</li></Link>
                            <Link to='/dashboard'><li className=""> dashboard</li></Link> */}
              {/* <Link to="/signin">
                <li className=""> Sign In</li>
              </Link>
              <Link to="/signup">
                <li className=""> Sign Up</li>
              </Link> */}
              <Link to='/settings'>
              <div className="w-12 rounded-full relative ">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt=""
                  className="rounded-full relative"
                />
                <div
                  className={`bg-blue-600  rounded-full w-1/4 h-1/4 absolute right-1 bottom-1 border-white border-2`}
                ></div>
              </div>
              </Link>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
}
