import { NavLink } from 'react-router-dom'

import Brand from '../assets/logo.webp'

function NavBar() {
  return (
    <nav className="flex-container">
      <h1 className="logo">
        <NavLink to="/">
          <img src={Brand} alt="" />
        </NavLink>
      </h1>
      <ul className="navigation">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/regions">Regions</NavLink>
        </li>
        <li>
          <NavLink to="/regions/search">Search</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
