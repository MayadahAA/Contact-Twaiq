
import './001-Css/App.css'
import { Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import Navbar from './Components/Header'
import Login from './Hooks/Users/Login'
import SignUp from './Hooks/Users/SignUp'
import NotFound from './Pages/NotFound'
import Settings from './Hooks/Settings'
import SendRequest from './Pages/SendRequest'
import Admin from './Hooks/Users/Admin'
import Communities from './Pages/Communities'
import NewSession from './Hooks/NewSession'
import Dashboard from './Pages/Dashboard'
function App() {
  
  return (
    <>
    <Navbar></Navbar>
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/signin" element={ <Login/> } />
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/settings" element={ <Settings/> } />
        <Route path="/communities" element={ <Communities/> } />
        <Route path="/request/:userId" element={ <SendRequest/> } />
        {/* <Route path="/requestDetails/:userId" element={ <RequestDetails/> } />
        <Route path="/instructorDetails/:userId" element={ <InstructorDetails/> } /> */}
        <Route path="/request/:userId" element={ <SendRequest/> } />
        <Route path="/Newsession" element={ <NewSession/> } />
        <Route path="/admin" element={ <Admin/> } />
        <Route path="*" element={ <NotFound/> } />
      </Routes>
      {/* <Footer></Footer> */}
    </>
  )
}

export default App
