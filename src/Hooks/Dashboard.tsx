import Calendar from "../Components/Calendar";
import Req from "../Components/Requests";
import Navgation from "../Components/Navigation";

function Dashboard() {
  return (
    <>
      <div className="bg-slate-100 w-screen h-screen flex">
        <div className="w-1/4">
          <Navgation />
        </div>
        <div className="flex flex-col justify-around  items-end w-3/4">
          <Calendar />
          <Req />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
