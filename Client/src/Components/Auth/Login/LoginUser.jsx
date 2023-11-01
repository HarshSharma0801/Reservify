import React, { useState , useContext } from "react";
import LogoFile from "../../Header/Logo/logo";
import { Link, useNavigate } from "react-router-dom";
import Logged from "./LoginApi";
import User from "../../../ContextApi/User/UserContext";


function Login() {
  const Navigate = useNavigate();
  const {UserDataCtx , SetUserDataCtx} = useContext(User) ; 

  const LoginCtx = (info)=>{
   SetUserDataCtx(info) ;
  }

  const NavigateRoute = ()=>{
    Navigate('/');
  }
  const [UserData , SetUserData] = useState({
    email:'',
    password:''
  })

  const HandleChange = (e)=>{

    const {name,value} = e.target;
    SetUserData({
      ...UserData , [name]:value 
    })
  }

 const SubmitLogin = (e)=>{
  e.preventDefault();
  Logged(UserData , NavigateRoute , LoginCtx);
  

 SetUserData({
  email:'',
  password:''
})
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
              Sign in to your account
            </h2>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={SubmitLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
               onChange={HandleChange}
                id="email-address"
                name="email"
                type="email"
                value={UserData.email}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
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

                onChange={HandleChange}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </button>
          </div>
        </form>
        <Link
          to={"/register"}
          className="group relative w-full flex justify-center py-2 px-4 border border-primary text-sm font-medium rounded-md text-primary hover:bg-primary hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
