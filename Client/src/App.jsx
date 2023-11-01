import Home from "./Components/Pages/Home/Home"
import axios from "axios"
import { Route,Routes } from "react-router"
import Login from "./Components/Auth/Login/LoginUser"
import Register from "./Components/Auth/SignUp/SignUpUser"
import Account from "./Components/Pages/Account/Account"
import Logout from "./Components/Pages/Account/LogoutUser"
import AddReserve from "./Components/NewReserve/AddReserve"
import YourReserve from "./Components/YourReserve/YourReserve"
import EditReserve from "./Components/YourReserve/EditReserve"
import ReservePage from "./Components/Pages/SingleReserve/ReservePage"
import Success from "./Components/Pages/SingleReserve/success"
import YourBooking from "./Components/YourBooking/YourBooking"

axios.defaults.baseURL = 'http://localhost:5000';

axios.defaults.withCredentials = true;

function App() {


  return (
    <>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/account/SecurityLogin" element={<Logout/>} />
        <Route path="/account/NewReserve" element={<AddReserve/>} />
        <Route path="/account/YourReserves" element={<YourReserve/>} />
        <Route path="/Edit/:id" element={<EditReserve/>} />
        <Route path="/Reserve/:id" element={<ReservePage/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/YourBookings" element={<YourBooking/>} />









        </Routes>
      
    </>
  )
}

export default App
