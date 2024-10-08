import React, { useState } from 'react'; 
import {Link,useNavigate} from 'react-router-dom';
import {login} from '../store/authSlice'
import {Input,Button,Logo} from './index'
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth";
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [loading,setloading] = useState(false);

    const create = async(data) => {
      setloading(true);
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) {
                dispatch(login(userData));
                setloading(false);
                toast.success("Your account created !", {
                    position: "top-right"
                  });
                navigate("/")
                }
            }
        } catch (error) {
          setloading(false);
            toast.error(error.message, {
                position: "top-right"
              });
            setError(error.message)
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
   Sign up to create your account
 </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
 <form onSubmit={handleSubmit(create)} className="space-y-6">

 <div>
     
     <div className="mt-2">
       <Input
       {...register("name", {
           required: true,
           
       })}
         label="Full Name :"
         id="name"
         name="name"
         type="text"
         required
         autoComplete="name"
         className=""
       />
     </div>
   </div>

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
         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
       />
     </div>
   </div>

   <div>
     <div className="flex items-center justify-between">
       
       {/* <div className="text-sm">
         <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
           Forgot password?
         </a>
       </div> */}
     </div>
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
         className=""
       />
     </div>
   </div>

   <div>
     <Button
       type="submit"
       className=""
       disabled={loading}
     >
       Create Account
     </Button>
   </div>
 </form>

 <p className="mt-10 text-center text-sm text-gray-500">
 Already have an account&nbsp;
   <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
     Signin
   </Link>
   
 </p>
</div>
</div>
   <ToastContainer/>
</div>
      )
}

export default Signup