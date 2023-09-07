import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <>
            {/* <div className="hidden sm:flex justify-start p-5 bg-amber-400">
                <div className="HAMBURGER-ICON space-y-2">
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                </div>
            </div> */}
            <nav className="flex justify-center ">
                <ul className="gap-4 p-3 bg-sky-800 w-full font-bold text-sm  ">
                    <div className="flex justify-between items-center text-white pl-6 pr-6">
                        <div>
                            <p className="text-3xl">Web Site</p>
                        </div>

                        <div className="flex gap-4">
                            <Link to='/'><li className=""> HOME</li></Link>
                            <Link to='/post'><li className=""> POST</li></Link>
                            <Link to='/register'><li className=""> Login</li></Link>
                            <Link to='/login'><li className=""> SignUp</li></Link>
                         
                        </div>
                    </div>

                </ul>
            </nav>
        </>
    )
}
