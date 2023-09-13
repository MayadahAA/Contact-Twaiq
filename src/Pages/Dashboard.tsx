import Calendar from "../Hooks/Calendar";
import Navgation from "../Components/Navigation";
import RequestCard from "../Hooks/RequestCard";

function Dashboard() {
  return (
    <>
      <div className="h-fit bg-slate-100">
        <div className="flex  p-5 gap-3">
          <div className="w-1/12">
            <Navgation />
          </div>
          <div className="flex flex-col w-full">
            <Calendar />
            <RequestCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
