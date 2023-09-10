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
                            <div><img src={logo} alt="" /></div>
                        </div>
                        
                         <div className="flex  gap-4">
                            {/* <Link to='/'><li className=""> HOME</li></Link>
                            <Link to='/about'><li className=""> ABOUT</li></Link>
                            <Link to='/contact'><li className=""> CONTACT</li></Link>
                            <Link to='/dashboard'><li className=""> dashboard</li></Link> */}
                            <Link to='/signin'><li className=""> Sign In</li></Link>
                            <Link to='/signup'><li className=""> Sign Up</li></Link>
                         
                        </div> 
                    </div>

                </ul>
            </nav>
        </>
    )
}
