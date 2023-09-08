import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <>
           
            <nav className="flex justify-center ">
                <ul className="gap-4 p-3 bg-sky-800 w-full font-bold text-sm  ">
                    <div className="flex justify-between items-center text-white pl-6 pr-6">
                        <div>
                            <p className="text-3xl">Web Site</p>
                        </div>
                        
                        <div className="flex gap-4">
                            <Link to='/'><li className=""> HOME</li></Link>
                            <Link to='/about'><li className=""> ABOUT</li></Link>
                            <Link to='/contact'><li className=""> CONTACT</li></Link>
                            <Link to='/login'><li className=""> LOGIN</li></Link>
                            <Link to='/register'><li className=""> SIGNUP</li></Link>
                         
                        </div>
                    </div>

                </ul>
            </nav>
        </>
    )
}
