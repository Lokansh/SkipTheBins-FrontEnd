// @author : Vasu Gamdha (Group 14)

import React, { useState } from "react";
import AdminProfile from "./AdminProfile";

import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import VendorProfile from "./VendorProfile";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // const state = useSelector((state) => {console.log(state); return state?.auth?.authdata;});
  /**
   *
   * const user = useSelector((state) => {console.log(state)})
   */
  if (user?.result?.role === "vendor") {
    return <VendorProfile />;
  } else if (user?.result?.role === "admin") {
    return <AdminProfile />;
  } else {
    return <UserProfile />;
  }
};

export default Profile;
