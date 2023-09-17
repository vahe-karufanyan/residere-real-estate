import React from 'react'
import { Link } from 'react-router-dom'
import { BsHouseDoor } from 'react-icons/bs'
import classes from './navbar.module.scss'

const NavBar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>Residere <BsHouseDoor /></Link>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Filter</li>
        </ul>
        <div className={classes.right}>
          <Link to='/signup' >Sign Up</Link>
          <Link to='/signin' >Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar