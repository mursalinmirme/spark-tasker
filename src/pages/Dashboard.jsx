import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { authContext } from "../authProvider/AuthProvider";

const Dashboard = () => {
  const {user} = useContext(authContext)
  console.log('user details is', user);
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex gap-2 pt-16">
        <div className="w-80 bg-[#006D77] min-h-screen px-5">
          <div className="mb-7">
            <div className="w-40 h-40 mx-auto mt-7">
              <img
                className="w-full h-full rounded-full object-top"
                src="https://i.ibb.co/sFkXm4D/Mursalin-Mir.jpg"
                alt=""
              />
            </div>
            <h1 className="text-center text-2xl font-semibold text-white mt-4">
              Mursalin Mir
            </h1>
          </div>
          <hr />
          <div className="mt-10 space-y-3">
            <div className="">
            <NavLink to="my-todos">
              {({ isActive }) => (
                <span className={isActive ? "text-lg font-medium py-2 px-2 text-white bg-[#83C5BE] block rounded-md" : "text-lg font-medium py-2 px-2 text-white bg-transparent"}>My Todo List</span>
              )}
            </NavLink>
            </div>
            <div className="]">
            <NavLink to="add-a-new-task">
              {({ isActive }) => (
                <span className={isActive ? "text-lg font-medium py-2 px-2 text-white bg-[#83C5BE] block" : "text-lg font-medium py-2 px-2 text-white bg-transparent"}>Add a New Task</span>
              )}
            </NavLink>
            </div>
          </div>
        </div>
        <div className="mt-2 flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
