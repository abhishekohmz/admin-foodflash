import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo.png'

function Navbar() {
  return (
   <>
    <div className="navbar">
      <Link to={'/'}><img src={logo} alt="" /></Link>
      <h1>Admin Panel</h1>
    </div>
   </>
  )
}

export default Navbar