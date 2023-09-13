import InstruCards from "../Hooks/InstruCards";
import Navigation from "../Components/Navigation";

export default function Home() {

  const user = localStorage.getItem('username')
  if (user) {
    null
  } else {
    alert("Please Login")
    location.href = '/signup'
  }
  return (
    <>
      <div className="h-fit pb-80 bg-slate-100">
        <div className="flex justify-center p-5 gap-3  ">
          <div className="w-1/12">
            <Navigation />
          </div>
          <div className="flex flex-col  justify-around w-full">
            <InstruCards />
          </div>
        </div>
      </div>
    </>
  );
}
