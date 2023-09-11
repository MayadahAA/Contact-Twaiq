// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/academy-logo.svg";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-center ">
        <ul className="gap-4 p-3 bg-white w-full font-bold text-sm  ">
          <div className="flex justify-between px-10 items-center text-slate-800 ">
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
              <div className="relative">
    <img className="w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>
    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-blue-400 border-2 border-white  rounded-full"></span>
</div>
              </Link>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
}
