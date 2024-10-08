
import { useState,useEffect } from 'react'
import './App.css'
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components/index'
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
  
    return () => {
      authService.getCurrentUser().then((userData)=>{
        if(userData){
           dispatch(login(userData));
        }else{
          dispatch(logout());
        }
      }).finally(()=>setLoading(false));
    }
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) 
  : 
  null
}

export default App
