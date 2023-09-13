import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IUser {
    id: string
    name: string
}



export default function NewRequest() {

    const url = 'https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/request'
    const { userId } = useParams();

    const [RequestType, setRequestType] = useState('---')
    const [getUserApi, setUserApi] = useState<IUser[]>([])

    //useState Object of request
    const [requests, setRequest] = useState({
        date: '',
        description: '',
    })

    try {
        useEffect(() => {
            axios.get('https://64d8b3c25f9bf5b879ce7999.mockapi.io/users')
                .then((response) => {
                    setUserApi(response.data)
                })
        }, [])

    } catch (error) {
        console.log(error)
    }

    //get name of user to stor in request
    const id = localStorage.getItem('id')
    const getUserId = getUserApi.find((e) => e.id == id)
    const nameUser = getUserId?.name
    
    //
    

    //input request from fields , post Request to EndPoint
    const input = () => {
        try {
            axios.post(url, {
                date: Date.now,
                userId: id,
                trainerId: userId,
                description: requests.description,
                approval: 'Pending',
                name: nameUser,
                type:RequestType

            })
                .then(function (response) {
                    console.log(response);
                })
        } catch (Error) {

            console.error();
        }
        setRequest({ ...requests, description: "" })
        alert("تم ارسال الطلب")
        location.href = '/dashboard'
    }

    return (
        <>
            <div className="flex justify-center p-5 gap-3 ">
                <div className="flex flex-col bg-white border-2 justify-center items-center gap-5  px-3 font-medium p-5 w-96 h-full  rounded ">

                    {/* fields of New Request  */}
                    <div className="font-bold self-start ml-5">طلب جديد</div>
                    {/* <div><input className="border border-black p-1 rounded w-80" type="date" value={requests.date} onChange={(e) => setRequest({ ...requests, date: e.target.value })} /></div> */}
                    <div><input className="border border-black p-1 rounded w-80" type="text" value={requests.description} onChange={(e) => setRequest({ ...requests, description: e.target.value })} /></div>
                    <div > <select className="border border-black p-1 rounded w-80"
                        value={RequestType}
                        onChange={(e) => setRequestType(e.target.value)}>
                        <option value={'false'}>---</option>
                        <option value="مناقشه">مناقشه</option>
                        <option value="مساعدة">مساعدة</option>
                    </select></div>
                    <div className="self-center ">
                        <button className='bg-red-500 border w-28 h-10 text-white rounded' onClick={input}>Send</button>
                    </div>

                </div>
            </div>
        </>
    )
}
