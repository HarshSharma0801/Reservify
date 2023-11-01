import { useContext } from "react";
import User from "../../../ContextApi/User/UserContext";
import { useNavigate, Link } from "react-router-dom";
import LogoFile from "../../Header/Logo/logo";
import UserAccount from "../../Header/UserAccount/AccountUser";
const Account = () => {
  const { UserDataCtx, hasData } = useContext(User);
  const nav = useNavigate();

  if (!UserDataCtx && hasData) {
    nav("/login");
  }

  return (
    <>
         <div className="flex justify-between w-screen p-4 sm:px-5">
        <div>
          <LogoFile />
        </div>
<div>
  <UserAccount/>
</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-3 py-5 mx-7  my-5">
        <Link to={"/account/YourReserves"} className="flex justify-center gap-2 grid-item bg-gray-200 sm:p-4 p-2 text-center max-w-[400px] rounded-full cursor-pointer border border-black hover:bg-gray-300 font-bold focus:bg-primary focus:text-white">
          <div>
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <div>Your Reserves</div>
        </Link>

        <Link
          to={"/account/SecurityLogin"}
          className="flex justify-center gap-2 grid-item bg-gray-200 sm:p-4 p-2 text-center max-w-[400px] rounded-full cursor-pointer border border-black hover:bg-gray-300 font-bold focus:bg-primary focus:text-white"
        >
          <div>
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
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <div>Login and Security</div>
        </Link>

        <Link className="flex justify-center gap-2 grid-item bg-gray-200 sm:p-4 p-2 text-center max-w-[400px] rounded-full cursor-pointer border border-black hover:bg-gray-300 font-bold focus:bg-primary focus:text-white">
          <div>
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
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <div>Contact Us</div>
        </Link>

        <Link to={'/account/NewReserve'} className="flex justify-center gap-2 grid-item bg-gray-200 sm:p-4 p-2 text-center max-w-[400px] rounded-full cursor-pointer border border-black hover:bg-gray-300 font-bold focus:bg-primary focus:text-white">
          <div>
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>Add Your Reserve</div>
        </Link>

        <Link to={'/YourBookings'} className="flex justify-center gap-2 grid-item bg-gray-200 sm:p-4 p-2 text-center max-w-[400px] rounded-full cursor-pointer border border-black hover:bg-gray-300 font-bold focus:bg-primary focus:text-white">
          <div>
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
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>Your Bookings</div>
        </Link>
      </div>
    </>
  );
};

export default Account;
