import { createBrowserRouter } from "react-router";

import HomeLayouts from "../Layout/HomeLayouts";
import Login from "../Authentication/Login";
import UpdateProfile from "../Authentication/UpdateProfile";
import UserProfile from "../Page/UserProfile";
import Register from "../Authentication/Register";
import Rooms from "../Page/Rooms";
import PrivateRoute from "../Private/PrivateRoute";
import MyBooking from "../Page/MyBooking";
import RoomDetails from "../Page/RoomDetails";
import Home from "../Layout/Home";
import ForgetPass from "../Authentication/ForgetPass";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayouts,
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
        path: "/register",
        Component: Register,
      },
      {
        path: "/updateprofile",
        Component: UpdateProfile,
      },
      {
        path:'/forgetpass',
        Component: ForgetPass
      },
      {
        path: "/profile",
        Component: UserProfile,
      },
      {
        path: "/allRoom",
        Component: Rooms,
      },
      {
        path: "/myBooking",
        element: (
          <PrivateRoute>
            <MyBooking></MyBooking>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <RoomDetails></RoomDetails>
          </PrivateRoute>
        ),
      },
      

    ],
  },
]);
