import Calendar from "../Components/Calendar";
import Navgation from "../Components/Navigation";

function Dashboard() {
  



  return (
    <>
      <div className="flex  p-5 gap-3 h-screen bg-slate-100">
        <div className="w-1/12">
          <Navgation />
        </div>
        <div className="flex flex-col w-full">
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
