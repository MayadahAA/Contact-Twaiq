
import './001-Css/App.css'
import { Routes, Route } from "react-router-dom"
// import About from './Pages/About'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Login from './Hooks/Users/Login'
import SignUp from './Hooks/Users/SignUp'
import Footer from './Components/Footer'
// import Contact from './Pages/Contact'
import NotFound from './Pages/NotFound'
import Settings from './Hooks/Settings'
import Dashboard from './Hooks/Dashboard'
function App() {

  return (
    <>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={ <Home/> } />
        {/* <Route path="/about" element={ <About/> } />
        <Route path="/contact" element={ <Contact/> } /> */}
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/Register" element={ <SignUp/> } />
        <Route path="/settings" element={ <Settings/> } />
        <Route path="*" element={ <NotFound/> } />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
