import InstruCards from "../Components/InstruCards";
import Navgation from "../Components/Navigation";

export default function Home() {




    return (
        <>
            <div className="flex justify-center p-5 gap-3 h-screen bg-slate-100 ">
            <div className="w-1/4">
          <Navgation />
        </div>
        <div className="flex flex-col justify-around  items-end w-3/4">
       <InstruCards/>
        </div>
                
                
            </div>

        </>
    )
}
