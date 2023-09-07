
interface Items {
    category: [string, string, string, string, string, string]
    photos: string
}





export default function Section(props: Items) {


    return (
        <>

            <div className="flex w-72 h-48  pt-4">
                <div className="basis-full border-solid border-2 border-gray-300">
                    <div className="flex justify-around content-center h-full p-3 ">
                        <div className=''>
                            <img className='w-32 rounded-md' src={props.photos} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className='pb-3 font-bold'>{props.category[0]}</h4>
                            <p className='text-xs text-gray-600'>{props.category[1]}</p>
                            <p className='text-xs text-gray-600'>{props.category[2]}</p>
                            <p className='text-xs text-gray-600'>{props.category[3]}</p>
                            <p className='text-xs text-gray-600'>{props.category[4]}</p>
                            <p className='text-xs text-gray-600'>{props.category[5]}</p>

                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}
