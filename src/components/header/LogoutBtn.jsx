import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
          navigate('/');
          dispatch(logout());
          toast.success("You are logged out", {
            position: "top-right"
          });
        })
    }
    
  return (
    <>
       <button onClick={logoutHandler} className='inline-bock px-6 py-2 duration-200 hover:bg-red-400 hover:text-white rounded-full font-bold text-lg'>Logout</button>
      <ToastContainer/>
    </>
  )
}

export default LogoutBtn