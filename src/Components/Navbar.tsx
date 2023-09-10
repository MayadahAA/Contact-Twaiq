import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <>
           
            <nav className="flex">
                <ul className=" gap-4 p-3 bg-sky-800 h-96 content-between font-bold text-sm  ">
                    <div className="flex-col items-center h-full text-white pl-6 pr-6">
                        <div>
                            <p className="text-3xl">Web Site</p>
                        </div>
                        
                        <div className="flex-col  gap-4">
                            <Link to='/'><li className=""> HOME</li></Link>
                            <Link to='/about'><li className=""> ABOUT</li></Link>
                            <Link to='/contact'><li className=""> CONTACT</li></Link>
                            <Link to='/login'><li className=""> LOGIN</li></Link>
                            <Link to='/register'><li className=""> SIGNUP</li></Link>
                            <Link to='/dashboard'><li className=""> Dashboard</li></Link>
                         
                        </div>
                    </div>

                </ul>
            </nav>
        </>
    )
}
