
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function SignUp() {


    const url = 'https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/users'
    const navigate = useNavigate();

    //useState Object 
    const [user, setUser] = useState({
        username: '',
        email: '',
        name: '', 
        password: ''
    })

    const [msg, setMsg] = useState('');


    //input from fields
    const input = () => {
        try {
            
            //Check inputs before Sign up 
            if (user.username == '' || user.email == '' || user.password == '') {
                setMsg('Please fill in the fields !')
                return
            }
            else if (user.username.length < 5) {
                
                setMsg('Username must be more than 5 characters !')
                return
            }
            else if (user.password.length < 5) {
                setMsg('Password must be more than 5 !')
                return
            }

            //post Data to url api
            axios.post(url, {
                username: user.username,
                email: user.email,
                password: user.password,
                name: user.name,
            })
            .then(function (response) {
                console.log(response);
            })
        } catch (Error) {

            console.error();
        }
        //redirect to login page when successful sign up
        navigate('/login')
    }

    return (
        <>
            <div className="flex justify-center p-5 gap-3 ">
            <div className="flex flex-col bg-white border-2 justify-center items-center gap-5  px-3 font-medium p-5 w-96 h-full  rounded ">

                    {/* msg */}
                    <div className='text-red-600 font-bold'> {msg}</div>
                    {/* all fields of sign up  */}
                    <div className="font-bold self-start ml-5">Sign Up</div>
                    <div><input className="border border-black p-1 rounded w-80" type="text" placeholder='Username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} /></div>
                    <div><input className="border border-black p-1 rounded w-80" type="text" placeholder='Name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} /></div>
                    <div><input className="border border-black p-1 rounded w-80" type="email" placeholder='Email' required value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /></div>
                    <div><input className="border border-black p-1 rounded w-80" type="text" placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} /></div>
                    <div className="self-center ">
                        <button className='bg-red-500 border w-28 h-10 text-white rounded' onClick={input}>Sign Up</button>
                    </div>

                </div>
            </div>
        </>
    )
}

