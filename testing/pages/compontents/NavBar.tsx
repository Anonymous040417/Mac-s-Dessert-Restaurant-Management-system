import React from 'react'
import {Link} from "react-router"

const NavBar = () => {
  return (
    <div>
    <Link to='/'>Register</Link>
    <Link to='/Login'>Login</Link>  
    </div>
  )
}

export default NavBar
