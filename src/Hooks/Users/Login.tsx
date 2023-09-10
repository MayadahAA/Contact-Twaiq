
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


interface IUser {
    id: string
    username: string,
    password: string,
    email: string,
}

export default function Login() {

    const url = 'https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/users'
    const navigate = useNavigate();

    //useState for Login validation or rejection message
    const [msg, setMsg] = useState('');

    //useState Object variables to login 
    const [user, setUser] = useState({
        username: '',
        password: '',
        isLogin: ''

    })

    const [getUserApi, setUserApi] = useState<IUser[]>([])
    //get user info from database
    const userApi = getUserApi.find((users) => users.username == user.username)
    
    //get user from Api 
    try {
        useEffect(() => {
            axios.get(url)
            .then((response) => {
                setUserApi(response.data)
            })
        }, [getUserApi , userApi ])
        
    } catch (error) {
        console.log(error)
    }
    


    
    
    //User input from fields
    const input = () => {
        
        console.log("---------------------------------- "+userApi?.username);
        try {
            
            //Check inputs before login 
            if (user.username == '' || user.password == '') {
                setMsg('Please fill in the fields !')
                return
            }
            
            
            //validate username and password match if in the database
            else if (userApi?.username == user.username && userApi?.password == user.password) {

                //Confirm login and stored value in  localStorage
                localStorage.setItem('username', user.username );
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('email', userApi.email);
                // userApi.isLogin = true

                //redirect to Home  page when successful login
                navigate('/')

            } else {
                setMsg('username or password is incorrect!')
            }
        } catch (Error) {

            console.error();
        }
    }

    return (
        <>
            <div className="flex justify-center p-5  ">
                <div className="flex flex-col bg-white border-2 justify-center items-center gap-5  px-3 font-medium p-5 w-96 h-72  rounded ">

                    {/* msg */}
                    <div className='text-red-600 font-bold'> {msg}</div>
                    {/* all fields of login  */}
                    <div className="font-bold self-start ml-5">Sign In</div>
                    <div><input className="border border-black p-1 rounded  w-80" placeholder='Username' type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} /></div>
                    <div><input className="border border-black p-1 rounded w-80 " type="text" placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} /></div>
                    <div className="self-center ">
                        <button className='bg-red-500 border w-28 h-10 text-white rounded' onClick={input}>Login</button>
                    </div>

                </div>
            </div>
        </>
    )
}

