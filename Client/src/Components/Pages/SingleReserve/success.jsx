import UserAccount from "../../Header/UserAccount/AccountUser";
import LogoFile from "../../Header/Logo/logo";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";

const Success = () => {


  const [BookingData , SetBookingData] = useState();

  useEffect(()=>{
    
    const token  = localStorage.getItem("BookingToken");
    const Roken  = localStorage.getItem("accessToken");

    const headers = {
      'Authorization': `Bearer ${Roken}`,
        'main': token,

      };
      const config = {
        headers: headers
      };
      
        axios.get('/BookingData' , config).then((res)=>{
          SetBookingData(res.data.data)
       
        });
    
    },[]);




  return (
    <>
      <div className="flex justify-between w-screen p-4 sm:px-5">
        <div>
          <LogoFile />
        </div>
        <div>
          <UserAccount />
        </div>
      </div>
      <div className="flex justify-center m md:m-[200px] text-center">
        <div>      
              <h1 className="md:text-3xl text-xl">Your Payment was a  </h1>
              <h1 className="md:text-3xl text-2xl py-2 text-green-500">{BookingData && BookingData} !</h1>

              <Link to={'/'}
              >
                 <button
                           
                            className=" md:w-1/2  mt-3 mx-auto flex justify-center md:text-lg border border-transparent p-2 md:py-4 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                             Return Home
                          </button>
              </Link>

        </div>
      </div>
    </>
  );
};

export default Success;
