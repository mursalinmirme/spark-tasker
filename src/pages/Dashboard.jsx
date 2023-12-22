import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../authProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
const Dashboard = () => {
  const {user,updateName} = useContext(authContext)
  const [photoProfileModal, setPhotoProfileModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();
  console.log('user details is', user);
  useEffect(() => {
    if(user?.photoURL === null){
          setPhotoProfileModal(true);
          console.log('the photo uis emsi');
      }else{
          setPhotoProfileModal(false);
    }
  }, [])
  console.log('check',photoProfileModal);
  const handleProfilePicture = (e) => {
     e.preventDefault();
     setUploadLoading(true);
     const form = e.target;
     const profilePic = form.profile.files[0];
     console.log(profilePic);
     const formData = new FormData();
        formData.append("image", profilePic);
        // upload profile pic
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_imageBB_API
            }`,
            formData
          )
          .then(res => {
            console.log('img res', res);
            if(res.data.success){
              updateName({ displayName: user?.displayName, photoURL: res.data.data.display_url })
            .then(upRes => {
                console.log('update resp is', upRes);
                setUploadLoading(false);
                setPhotoProfileModal(false);
                toast.success('Profile Upload Successfully!');
            })
            .catch(upErr => {
                console.log('UpError is', upErr);
                toast.error(upErr.message)
                setUploadLoading(false);
            })
            }
          })
          .catch(err => {
            console.log('img err',err);
            setUploadLoading(false);
          })
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex gap-2 pt-16">
        <div className="w-80 bg-[#006D77] min-h-screen px-5">
          <div className="mb-7">
            <div className="w-40 h-40 mx-auto mt-7">
              <img
                className="w-full h-full rounded-full object-top"
                src={user?.photoURL}
                alt=""
              />
            </div>
            <h1 className="text-center text-2xl font-semibold text-white mt-4">
              {user?.displayName}
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
      
      <div className={`flex justify-center items-center absolute top-0 w-full h-[100vh] bg-[#00000085] ${photoProfileModal ? 'visible' : 'hidden'}`}>
        <div className="w-96 h-96 bg-[#EDF6F9] flex justify-center items-center flex-col p-10">
          <h3 className="text-2xl font-semibold">Set Profile Picture</h3>
         <FaRegUserCircle className="text-9xl mx-auto mt-10" />
         <form className="mx-auto" onSubmit={handleProfilePicture}>
         <input className="mt-10 border p-3 border-gray-500" type="file" name="profile" id="" />
         <button type="submit" className="w-full bg-[#006D77] text-white btn mt-5">{uploadLoading ? <span className="loading loading-spinner loading-md"></span> : 'Save Profile'}</button>
         </form>
        </div>
      </div>
       
    </div>
  );
};

export default Dashboard;
