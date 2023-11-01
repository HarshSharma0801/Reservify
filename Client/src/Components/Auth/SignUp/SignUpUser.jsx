import LogoFile from "../../Header/Logo/logo";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import SignedUp from "./SignupApi";



const Register = () => {
  
const navigate = useNavigate()

const nav = ()=>{
  navigate('/login');
}
     
 const [UserData,SetUserdata] = useState({
  username:'',
  email:'',
  password:''
  

 });


 const HandleChange  = (e)=>{
   const {name , value} = e.target ;
   SetUserdata({
    ...UserData , [name]:value
   })
 }


 const SubmitRegister = (event)=>{
  event.preventDefault();
  console.log(UserData);

  SignedUp(UserData , nav);

  SetUserdata(
    {
      username:'',
      email:'',
      password:''
      
    
     }
  )
  


 }



  




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-md w-full space-y-8">
        <div className="flex-col justify-center text-center">
          <div className="flex justify-center">
            <LogoFile />
          </div>
          <div>
            <h2 className="mt-6 text-center sm:text-3xl text-lg font-extrabold text-gray-900">
              Register
            </h2>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={SubmitRegister}>
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
              <label htmlFor="username" className="sr-only">
              Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={UserData.username}

                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                onChange={HandleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={UserData.email}

                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={HandleChange}

              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={UserData.password}

                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={HandleChange}

              />
            </div>
          </div>

    

          <div>
            <button
              to={"/"}
              className="group relative w-full flex justify-center py-2 px-4 border border-primary text-sm font-medium rounded-md text-primary hover:bg-primary hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
