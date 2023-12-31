import React , {useContext, useEffect, useState} from "react";
import User from '../../../ContextApi/User/UserContext'

const UserAccount = () => {
  const {UserDataCtx , SetHasData} = useContext(User);
  SetHasData(true);
  const UserName = UserDataCtx && UserDataCtx.name ; 


  

  


  return (
   
    <>
        <div className="flex justify-between sm:gap-2 border border-gray-300 sm:p-3 rounded-2xl shadow-md shadow-gray-300 px-2">
      <div className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      <button className="bg-primary text-white rounded-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      <h1 className="text-[0.8rem] sm:text-[15px] sm:block  hidden">{UserName}
</h1>
    </div>
    </>

  );
};
export default UserAccount;
