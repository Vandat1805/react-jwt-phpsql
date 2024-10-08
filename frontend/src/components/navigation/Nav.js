import React, { useEffect, useState } from 'react'
import "../../App.css"
import { NavLink, useLocation } from "react-router-dom";
const Nav = () => {
  const navLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link activated' : 'nav-link'
  }
  let location = useLocation();
  const [isShow, setIsShow] = useState(true);
  useEffect(()=>{
    if (location.pathname === '/login') {
      setIsShow(false);
    }
  },[])


  return (
    <>
    {isShow === true &&
      <div>
          <ul>
              <li><NavLink to="/" 
              className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to="/login"  
              className={navLinkClass}>Login</NavLink></li>
              <li><NavLink to="/users"  
              className={navLinkClass}>Users</NavLink></li>
              <li><NavLink to="/register"  
              className={navLinkClass}>Register</NavLink></li>
              <li><NavLink to="/about"  
              className={navLinkClass}>About</NavLink></li>
          </ul>
        </div>
    }
      </>
  )
}

export default Nav;