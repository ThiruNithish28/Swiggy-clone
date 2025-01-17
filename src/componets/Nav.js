import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router";

const Nav = () => {
  const [login, setLogin] = useState(false);
  const location = useLocation();

  const isSticky = !location.pathname.startsWith("/restaurant/");
  return (
    <div className={isSticky ? "nav sticky" : "nav"}>
      <div className="nav-logo">WooFood</div>
      <ul className="nav-links d-flex g-1">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="d-flex flex-center g-1">
        <li>cart</li>

        <li>
          <Link to="/login">{login ? "Logout" : "Log in"}</Link>
        </li>
      </div>
    </div>
  );
};
export default Nav;
