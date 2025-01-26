import { useContext, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import logoImg from "../assets/img/logo.jpeg";
import userContext from "../utils/userContext";

const Nav = () => {
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const { user } = useContext(userContext);

  const isSticky = !location.pathname.startsWith("/restaurant/");
  return (
    // implement the sticky nav
    <div
      className={`flex justify-between items-center px-7 py-5 shadow-md bg-[#0b3c43] text-white ${
        isSticky ? "sticky top-0" : ""
      }`}
    >
      <div className="nav-logo w-20 h-full">
        <img src={logoImg} alt="logo" className="w-full h-full" />
      </div>
      <ul className="nav-links flex gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-[#FFC300]" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-[#FFC300]" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-[#FFC300]" : "")}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {user.name !=="" && (
        <h4 className="font-bold text-red-700">
          Welcome back <span className="capitalize">{user.name}</span>
        </h4>
      )}

      <ul className="flex gap-4">
        <li>cart</li>

        <li>
          <Link to="/login">{login ? "Logout" : "Log in"}</Link>
        </li>
      </ul>
    </div>
  );
};
export default Nav;
