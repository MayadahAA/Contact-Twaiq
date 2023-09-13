import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IUser {
    id: string
    username: string,
    isInstructor: boolean,
    email: string,
    name: string,
}


const url = "https://64ec522df9b2b70f2bfa1874.mockapi.io/api/v1/users";


export default function Admin() {

    const [getUserApi, setUserApi] = useState<IUser[]>([])
    const [Instructor, setInstructor] = useState('---');

    //get user from Api 
    try {
        useEffect(() => {
            axios.get(url)
                .then((response) => {
                    setUserApi(response.data)
                })
        }, [getUserApi])

    } catch (error) {
        console.log(error)
    }

    const input = (id: string) => {

        if (Instructor === 'true') {
            axios.put(url + '/' + id, {
                isInstructor: true
            }).then((res) => {
                console.log(res);
            })
        } else {
            return
        }


    }
    return (
        <div>

            <div className="border border-cyan-800 mt-4 gap-11 h-72 overflow-y-auto whitespace-nowrap m-6">
                <div className="flex-col border bg-slate-50  w-full " >

                    {

                        getUserApi.map((e) => (
                            <>
                                <div className="flex border items-center">

                                    <div className="flex justify-between m-5 w-full" key={e.id}>
                                        <Link className=" flex justify-around w-full" to={`/RequestDetails/${e.id}`}>
                                            <div>{e.id}</div>
                                            <div>{e.name}</div>
                                            <div>{e.username}</div>
                                            <div>{e.email}</div>
                                        </Link >
                                        <select
                                            value={Instructor}
                                            onChange={(e) => setInstructor(e.target.value)}
                                            onClick={()=> input(e.id)}>
                                            <option value={'false'}>---</option>
                                            <option value="true">Yes</option>
                                        </select>

                                    </div>
                                    {/* <div onClick={() => DeleteBtn(e.id)}
                                            className="cursor-pointer h-6 w-20 mr-3  rounded-2xl text-white text-center text-sm bg-red-600"> Delete
                                        </div> */}
                                    {/* <div onClick={() => Delete()}
                                            className="cursor-pointer h-6 w-20 mr-3  rounded-2xl text-white text-center text-sm bg-orange-600"> 
                                            <svg data-testid={'DeleteIcon'}></svg>
                                        </div> */}
                                    {/* <div onClick={() => input('true', e.id)}
                                            className="cursor-pointer h-6 w-20 mr-3  rounded-2xl text-white text-center text-sm bg-blue-600"> Approve
                                        </div>
                                        <div onClick={() => input('false', e.id)}
                                            className="cursor-pointer h-6 w-20 mr-3  rounded-2xl text-white text-center text-sm bg-red-600"> Reject
                                        </div> */}
                                </div>
                            </>
                        ))
                    }
                </div>
            </div >


        </div >
    )
}
