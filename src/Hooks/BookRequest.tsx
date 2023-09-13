import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Navigation from "../Components/Navigation";




interface IRequest {
    id: string,
    date: string,
    description: string,
    name: string,
    type: string
}
const url = 'https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/request'

export default function BookRequest() {
    
    const { userId } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState<IRequest[]>([])
    const courantRequest = request.find((e) => e.id == String(userId))
    
    const [meet, setMeet] = useState({
        date: '',
        time: '',
        day: '',
        name: '',
        duration: '',
        topics:''


    })

    const formData = {
        date: meet.date,
        day: meet.day,
        hours: [
          {
            time: meet.time,
            requests: [
              {
                name:courantRequest?.name ,
                duration: meet.duration,
                topics:[
                    meet.topics
                ]
              },
            ],
          },
        ],
      };


    //get All Request
    useEffect(() => {
        setIsLoading(true);
        axios.get(url)
            .then((response) => {
                setRequest(response.data)
                setIsLoading(false);
            })
    }, [])


    const input = () => {
        //post formData
        try {
            axios
                .post('https://64d8b3c25f9bf5b879ce7999.mockapi.io/p',formData)
                .then(function (response) {
                    console.log(response);
                });
        } catch (Error) {
            console.error();
        }
    }
    return (
        <>

            <div className="h-fit  bg-slate-100">
                <div className="flex justify-center p-5 gap-3  ">
                    <div className="w-1/12">
                        <Navigation />
                    </div>


                    <div className="flex flex-col  justify-center w-full h-full p-5">
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center w-full">
                                    <div className="spinner"></div>
                                </div>
                            ) :
                                <div className="flex justify-center h-48 w-full ">

                                    {
                                        <>
                                            <div className="flex flex-col justify-center items-center w-96 border border-fuchsia-950">
                                                <div>الاسم : {courantRequest?.name}</div>
                                                <div>الوصف : {courantRequest?.description}</div>
                                                <div> النوع : {courantRequest?.type}</div>
                                            </div>

                                        </>

                                    }
                                </div>
                        }
                        <div className="flex-col items-center self-center m-3 p-10 bg-slate-300 h-96 ">


                            <div className="flex-col self-start h-full gap-6  "> 
                            <div><input className="border border-black p-3 rounded w-80 " type="date" placeholder='التاريخ' value={meet.date} onChange={(e) => setMeet({ ...meet, date: e.target.value })} /></div>
                            <div><input className="border border-black p-3 rounded w-80 " type="text" placeholder='الوقت' value={meet.time} onChange={(e) => setMeet({ ...meet, time: e.target.value })} /></div>
                            <div><input className="border border-black p-3 rounded w-80 " type="text" placeholder='اليوم' value={meet.day} onChange={(e) => setMeet({ ...meet, day: e.target.value })} /></div>
                            <div><input className="border border-black p-3 rounded w-80 " type="text" placeholder='المدة' value={meet.duration} onChange={(e) => setMeet({ ...meet, duration: e.target.value })} /></div>
                            <div><input className="border border-black p-3 rounded w-80 " type="text" placeholder='النوع' value={meet.topics} onChange={(e) => setMeet({ ...meet, topics: e.target.value })} /></div>
                            <div className=" ">
                                <button className='bg-red-500 border w-28 h-10 text-white rounded' onClick={input}>ارسال</button>
                            </div>

                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}
