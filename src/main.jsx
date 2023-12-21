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
import PrivateRouter from "./privateRouter/PrivateRouter.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
    element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: <PrivateRouter><MyTodoList></MyTodoList></PrivateRouter>,
      },
      {
        path: "my-todos",
        element: <PrivateRouter><MyTodoList></MyTodoList></PrivateRouter>,
      },
      {
        path: "add-a-new-task",
        element: <PrivateRouter><AddAnewTask></AddAnewTask></PrivateRouter>,
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
