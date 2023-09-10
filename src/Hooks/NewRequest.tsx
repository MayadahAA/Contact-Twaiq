import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewRequest() {


    const url = 'https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/request'
    const { userId } = useParams();
    //useState Object of request
    const [requests, setRequest] = useState({
      date: '',
      description: '', 
    })
    
     const id = localStorage.getItem('id')
    //input request from fields
    const input = () => {
        try {
            
            //post Request to url EndPoint
            axios.post(url, {
                date: requests.date,
                usrId: id,
                trainerId: userId,
                description: requests.description,
                approval:false
            })
            .then(function (response) {
                console.log(response);
            })
        } catch (Error) {

            console.error();
        }
        alert("ok")
    }

    return (
        <>
            <div className="flex justify-center p-5 gap-3 ">
            <div className="flex flex-col bg-white border-2 justify-center items-center gap-5  px-3 font-medium p-5 w-96 h-full  rounded ">

                    {/* fields of New Request  */}
                    <div className="font-bold self-start ml-5">New Request</div>
                    <div><input className="border border-black p-1 rounded w-80" type="date"  value={requests.date} onChange={(e) => setRequest({ ...requests, date: e.target.value })} /></div>
                    <div><input className="border border-black p-1 rounded w-80" type="text" value={requests.description} onChange={(e) => setRequest({ ...requests, description: e.target.value })} /></div>
                    <div className="self-center ">
                        <button className='bg-red-500 border w-28 h-10 text-white rounded' onClick={input}>Send</button>
                    </div>

                </div>
            </div>
        </>
    )
}
