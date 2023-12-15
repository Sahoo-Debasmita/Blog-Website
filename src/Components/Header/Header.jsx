import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Container,LogoutBtn} from '../Index'
function Header() {
  const AuthStatus=useSelector(state=>state.Auth.status);
  const Navigate=useNavigate();
  const NavItem=[
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !AuthStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !AuthStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: AuthStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: AuthStatus,
  },
  ]
  return (
  <header className='py-3 shadow bg-gray-500'>
    <Container>
      <nav className='flex'>
        <div className='mr-4'>
          <Link>
          <Logo width='70px'></Logo>
          </Link>
        </div>
        <ul>
          {NavItem.map((item)=> item.active ? 
          <li key={item.name}>
              <button 
              className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              onClick={()=>Navigate(item.slug)}>{item.name}</button>
          </li>
          : null)}
          {AuthStatus && (
            <li>
              <LogoutBtn></LogoutBtn>
            </li>
            
          )}
        </ul>
      </nav>
    </Container>
  </header>
  )
}

export default Header
