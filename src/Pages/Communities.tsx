import Navigation from "../Components/Navigation";
import Community from "../Hooks/Community";

export default function Communities() {
  return (
    <>
      <div className="flex justify-center p-5 gap-3 h-full bg-slate-100 ">
        <div className="w-1/12">
          <Navigation />
        </div>
        <div className="w-full md:w-11/12">
          <Community />
        </div>
      </div>
    </>
  );
}
