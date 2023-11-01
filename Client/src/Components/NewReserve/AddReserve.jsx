import { useState } from "react";
import LogoFile from "../Header/Logo/logo";
import ReserveForm from "./ReserveForm";

const AddReserve = () => {
  return (
    <>
      <div className="flex justify-between w-screen p-4 sm:px-5">
        <div>
          <LogoFile />
        </div>
      </div>
      <div className="flex text-center justify-center gap-2">
        <div className="md:text-3xl text-gray-600">Add Your Reserve</div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="md:w-7 md:h-8 w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      <div className="m-5">
        <ReserveForm />
      </div>
    </>
  );
};

export default AddReserve;
