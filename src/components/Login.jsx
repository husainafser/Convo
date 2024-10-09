import React, { useState } from 'react'; 
import {Link,useNavigate} from 'react-router-dom';
import {login as storeLogin} from '../store/authSlice'
import {Input,Button,Logo} from './index'
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const [error,setError] = useState("");
    const [loading,setloading] = useState(false);

    const login = async (data)=>{
        setError("");
        setloading(true);
        try {
            const session  = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                  console.log(userData);
                    dispatch(storeLogin({userData}));
                    setloading(false);
                    navigate("/");
                    toast.success("Welcome Back !", {
                        position: "top-right"
                      });
                }

            }
        } catch (error) {
          setloading(false);
            toast.error(error.message, {
                position: "top-right"
              });
            setError(error.message);
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>   
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <div>
             
              <div className="mt-2">
                <Input
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                  label="Email :"
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className=""
                />
              </div>
            </div>

            <div>
              
              <div className="mt-2">
                <Input
                    {...register("password", {
                        required: true,
                    })}
                  label="Password :"
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className=""
                disabled={loading}
              >
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have any account?&nbsp;
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signup
            </Link>
            
          </p>
        </div>
        </div>
            <ToastContainer/>
        </div>
      )
}
export default Login