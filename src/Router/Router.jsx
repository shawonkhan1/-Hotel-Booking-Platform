import { createBrowserRouter } from "react-router";

import HomeLayouts from "../Layout/HomeLayouts";
import Login from "../Authentication/Login";
import UpdateProfile from "../Authentication/UpdateProfile";
import UserProfile from "../Page/UserProfile";
import Register from "../Authentication/Register";
import Rooms from "../Page/Rooms";

import MyBooking from "../Page/MyBooking";
import RoomDetails from "../Page/RoomDetails";
import Home from "../Layout/Home";
import ForgetPass from "../Authentication/ForgetPass";
import ErrorPage from "../Layout/ErrorPage";
import Galary from "../Page/Galary";
import Contact from "../Page/Contact";
import Admin from "../Page/Admin";
import Services from "../Page/Services";
import AboutUs from "../Page/AboutUs";
import DashBordLayout from "../DashBord/DashBordLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: '/ourservice',
        Component: Services
      },
      {
        path: '/aboutus',
        Component: AboutUs
      },
      {
        path: "/register",
        Component: Register,
      },
      // {
      //   path: "/updateprofile",
      //   Component: UpdateProfile,
      // },
      // {
      //   path: "/forgetpass",
      //   Component: ForgetPass,
      // },
      // {
      //   path: "/profile",
      //   Component: UserProfile,
      // },
      {
        path: "/allRoom",
        Component: Rooms,
      },
      {
        path: "/galary",
        Component: Galary,
      },
      // {
      //   path: "/myBooking",
      //   element: (
      //     <PrivateRoute>
      //       <MyBooking></MyBooking>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/details/:id",
        element: <RoomDetails></RoomDetails>,
      },
      // {
      //   path: "/contact",
      //   element: (
      //     <PrivateRoute>
      //       <Contact></Contact>
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/admin",
      //   element: (
      //     <PrivateRoute>
      //       <Admin></Admin>
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },



  {
    path: '/dashbord',
    Component: DashBordLayout,
    children: [
      {
        path:'/dashbord/home',
        Component: MyBooking
      },
      {
        path:'/dashbord/admin',
        Component:Admin
      },
      {
        path:"/dashbord/contactus",
        Component: Contact
      },
      {
        path:'/dashbord/mybooking',
        Component:MyBooking
      },
       {
        path: "/dashbord/updateprofile",
        Component: UpdateProfile,
      },
      {
        path: "/dashbord/forgetpass",
        Component: ForgetPass,
      },
      {
        path: "/dashbord/profile",
        Component: UserProfile,
      },
     
    ]
  }
]);
