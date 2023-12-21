import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className="w-80 bg-[#006D77] pt-20 min-h-screen px-5">
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
            <div className="text-lg font-medium py-2 px-2 text-white hover:bg-[#83C5BE]">
            <NavLink to="/add-a-new-task">
              {({ isActive }) => (
                <span className={isActive ? "active" : ""}>My Todo List</span>
              )}
            </NavLink>
            </div>
            <div className="text-lg font-medium py-2 px-2 text-white hover:bg-[#83C5BE]">
            <NavLink to="/signin">
              {({ isActive }) => (
                <span className={isActive ? "active" : ""}>Add a New Task</span>
              )}
            </NavLink>
            </div>
          </div>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
