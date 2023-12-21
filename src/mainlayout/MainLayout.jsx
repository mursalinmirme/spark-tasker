import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div className="max-w-screen-2xl mx-auto">
            <Navbar></Navbar>
            <div className="min-h-[70vh]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <div><Toaster/></div>
        </div>
    );
};

export default MainLayout;