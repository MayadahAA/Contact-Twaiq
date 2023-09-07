
import './001-Css/App.css'
import { Routes, Route } from "react-router-dom"
import About from './Pages/About'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import PostApi from './Data/API/PostApi'
import Login from './Hooks/Users/Login'
import SignUp from './Hooks/Users/SignUp'
function App() {

  return (
    <>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/post" element={ <PostApi/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/Register" element={ <SignUp/> } />
      </Routes>
    </>
  )
}

export default App
