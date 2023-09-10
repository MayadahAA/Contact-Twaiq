import Navigation from "../Components/Navigation";
import NewRequest from "../Hooks/NewRequest";

export default function SendRequest() {
    return (
        <>
            <div className="flex justify-center p-5 gap-3 h-screen bg-slate-100 ">
                <div className="w-1/12">
                    <Navigation />
                </div>
                <div className="flex flex-col justify-around w-full">
                    <NewRequest />
                </div>


            </div>

        </>
    )
}
