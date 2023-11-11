import LogoFile from "../Header/Logo/logo"
import UserAccount from "../Header/UserAccount/AccountUser"
import { useState , useEffect } from "react";
import axios from "axios";
import Loader from "../Preloader/loader";

const YourBooking =()=>{
    const [isLoading, SetisLoading] = useState(false);
    const [Data, SetData] = useState([]);

    useEffect(() => {
        SetisLoading(true);
        const token  = localStorage.getItem("accessToken");
        const headers = {
            'Authorization': `Bearer ${token}`,
            // Add other headers as needed
          };
          const config = {
            headers: headers
          };
        axios.get("/getYourBookings" , config).then((res) => {
          SetData(res.data);
        });
      }, []);
    
      if (Data) {
        setTimeout(() => {
          SetisLoading(false);
        }, 1500);
        console.log(Data);
      }

return(
    <>
          {isLoading ? <Loader /> : ""}

    <div className="flex justify-between w-screen p-4 sm:px-5">
    <div>
      <LogoFile />
    </div>
    <div>
      <UserAccount />
    </div>
  </div>

<div className="md:m-10 m-3 grid md:grid-cols-3 grid-cols-1 gap-3">
{Data.length > 0 &&
  Data.map((Reserve) => {
    return (
      <div className="  md:w-[351px] md:h-[418px] w-[280px] h-[408px]  m-auto bg-white border border-gray-300 rounded-lg  shadow-2xl dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-gray-200 aspect-video	 rounded-lg overflow-hidden">
          <img
            src={Reserve.photo}
            alt="photo"
            className="w-full h-full "
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {Reserve.MainTitle}
            </h5> 
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            situated at {Reserve.location}  , {Reserve.address}
          </p>

          <p className="mb1 font-normal text-gray-800 dark:text-gray-400">
          {Reserve.Schedule}
          </p>
         
          <div className="flex justify-between md:pt-2 ">
          <h1 className="">Amount Paid: ${Reserve.amount}</h1>
          <h1 className="text-green-500">Status : Paid</h1>

           
          </div>
          <p className="mt-2 mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
              Booked on {Reserve.Date}
          </p>
        </div>
      </div>
    );
  })}
</div>

</>

    
)

}

export default YourBooking