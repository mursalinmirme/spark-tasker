import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../authProvider/AuthProvider";

const Navbar = () => {
  const NavItem = (
    <>
      <NavLink to="/">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>Home</span>
           )}
             </NavLink>
      <NavLink to="/dashboard/my-todos">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>Dashboard</span>
           )}
             </NavLink>
      <NavLink to="/signup">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>Sign Up</span>
           )}
             </NavLink>
      <NavLink to="/signin">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>Sign In</span>
           )}
             </NavLink>
    </>

  );
  const {name} = useContext(authContext)
  console.log(name);
  return (
    <div className="fixed top-0 w-full bg-[#EDF6F9] z-50">
    <div className="navbar py-3.5 w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavItem}
          </ul>
        </div>
        <a className="text-2xl font-bold text-[#000000]">SparkTasker</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-10 text-lg font-medium text-[#000000]">
          {NavItem}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="text-base bg-[#006D77] text-[#EDF6F9] border-none outline-none px-4 py-2.5 rounded font-semibold hover:bg-[#FFDDD2] cursor-pointer">Logout</a>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
