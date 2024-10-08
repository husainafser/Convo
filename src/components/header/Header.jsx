import React from 'react'
import { Container,Logo,LogoutBtn } from "../index";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status);
  const navigator = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <header className='py-3 shadow sticky top-0 z-10 bg-white'>
     <Container>
      <nav className='flex'>
       <div className='mr-4'>
        <Link>
         <Logo width='70px' />
        </Link>
       </div>
       <ul className='flex ml-auto'>
         {navItems.map((item)=>
         item.active ? (
          <li key={item.name}>
           <button onClick={()=>navigator(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-black hover:text-white hover:shadow-lg rounded-full font-bold text-lg '>{item.name}</button>
          </li>
         ) : null
        )}
        {
          authStatus && (
            <li>
              <LogoutBtn/>
            </li>
          )
        }
       </ul>
      </nav>
     </Container>
    </header>
  )
}

export default Header