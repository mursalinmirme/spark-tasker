import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./authProvider/AuthProvider.jsx";
import "./index.css";
import MainLayout from "./mainlayout/MainLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import AddAnewTask from "./pages/dashboardComponents.jsx/AddAnewTask.jsx";
import MyTodoList from "./pages/dashboardComponents.jsx/MyTodoList.jsx";
import PrivateRouter from "./privateRouter/PrivateRouter.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
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
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <MyTodoList></MyTodoList>
          </PrivateRouter>
        ),
      },
      {
        path: "my-todos",
        element: (
          <PrivateRouter>
            <MyTodoList></MyTodoList>
          </PrivateRouter>
        ),
      },
      {
        path: "add-a-new-task",
        element: (
          <PrivateRouter>
            <AddAnewTask></AddAnewTask>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
    <div>
      <Toaster />
    </div>
  </React.StrictMode>
);
