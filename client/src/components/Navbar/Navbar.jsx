import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"
import logo from "../../assets/logo.png"
import search from "../../assets/search-solid.svg"
import Avatar from "../Avatar/Avatar"
import { useDispatch,useSelector } from 'react-redux';
import { loadUser, logoutUser } from '../../store/slices/userSlice';
import { useEffect } from 'react';
const Navbar = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  },[dispatch])

  return (
    <nav className='main-nav'>
      <div className='navbar'>
        <a>
          <img src={logo} alt='logo' className='nav-logo'/>
        </a>
        <a href="/" className='nav-item nav-btn'>About</a>
        <a  href="/" className='nav-item nav-btn'>For Products</a>
        <a  href="/" className='nav-item nav-btn'>For Teams</a>

        <form>
          <input type='text' placeholder='Search..' />
          <img src={search} alt='Search' width="18" className='search-icon'></img>
        </form>

        {auth._id ? <>
          <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              ><a  href={`/User/${auth._id}`} style={{padding:"7px 10px"}}> {auth.name.charAt(0).toUpperCase()} </a></Avatar>
            <button className='nav-item nav-login' onClick={() => dispatch(logoutUser())}>Log Out</button>
          </>
          :
          <Link to={"/Auth"} className='nav-item nav-login'>Log in</Link> 
        }
      </div>
    </nav>
  )
}
 
export default Navbar