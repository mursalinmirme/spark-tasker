import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./authProvider/AuthProvider.jsx";
import "./index.css";
import MainLayout from "./mainlayout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import AddAnewTask from "./pages/dashboardComponents.jsx/AddAnewTask.jsx";
import MyTodoList from "./pages/dashboardComponents.jsx/MyTodoList.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "signin",
        element: <Signin></Signin>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "",
        element: <MyTodoList></MyTodoList>,
      },
      {
        path: "my-todos",
        element: <MyTodoList></MyTodoList>,
      },
      {
        path: "add-a-new-task",
        element: <AddAnewTask></AddAnewTask>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
