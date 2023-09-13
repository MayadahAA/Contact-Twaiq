import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface Data {
    id: number,
    title: string,
    date: string,
    time: string,
    location: string,
}

export default function Community() {

    const [getItems, setItems] = useState<Data[]>([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        try {
            setIsLoading(true)
            axios.get('https://6500f50418c34dee0cd5876c.mockapi.io/community')
                .then((res) => {
                    setItems(res.data)
                    setIsLoading(false)

                })
        } catch (error) {
            console.log(error);

        }
    }, [])

    return (
        <>

            <div className="text-xl  w-52">
                <Link to='/Newsession'>
                    <button className="border w-52 h-12 rounded-xl bg-blue-400 text-white" type="button">اضافة جلسة جديدة</button>
                </Link>
            </div>
            {
                isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="spinner"></div>
                    </div>
                ) :
                    <div className="flex p-7 w-full h-full">
                        <div className="flex flex-wrap justify-end  gap-8 h-auto  w-11/12">


                            {
                                getItems.map((e) => (
                                    <>
                                        <div className="flex-col text-center h-3/6 max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-slate-50 p-4">

                                            <div className="flex justify-center w-full  ">
                                                <img className="rounded-3xl h-40" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Sunset in the mountains" />

                                            </div>
                                            <div className="px-6 py-4">
                                                <div className="font-bold text-xl mb-2">{e.title}</div>
                                                <p className="text-gray-700 text-base">
                                                    التاريخ : {e.date}
                                                </p>
                                                <p className="text-gray-700 text-base">
                                                    الوقت : {e.time}
                                                </p>
                                            </div>
                                            <p>الموقع : {e.location}</p>
                                            <div className="px-6 pt-4 pb-2">
                                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                            </div>
                                        </div>

                                    </>
                                ))
                            }

                        </div>
                    </div>
            }



        </>
    )
}
