import { useContext } from "react";
import User from "../../../ContextApi/User/UserContext";
import LogoFile from "../../Header/Logo/logo";
import axios from "axios";
import { useNavigate } from "react-router";

const Logout = () => {
 const navigate  = useNavigate();
  const { UserDataCtx } = useContext(User);
  const username = UserDataCtx && UserDataCtx.name;
  const email = UserDataCtx && UserDataCtx.email;

  const SignOut = async()=>{
   const res = await axios.post('/logout');
   if(res){
    navigate('/login');
   }
    
  }

  return (
    <>
      <div className="flex justify-between w-screen p-4 sm:px-5">
        <div>
          <LogoFile />
        </div>
      </div>
      <div className="bg-white rounded  p-4 md:p-6 lg:p-8 my-[100px] sm:m-[150px] shadow-2xl">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          Hi there , {username}
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-700">
          You are currently Signed In as{" "}
          <span className="font-bold">{email} </span>
        </p>
        <button onClick={SignOut} className="group relative w-full my-[30px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          Log Out
        </button>
      </div>
    </>
  );
};

export default Logout;
