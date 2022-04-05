// @author : Vasu Gamdha (Group 14)

import React, { useEffect, useState } from "react";
import Requests from "./Requests";

import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import VendorProfile from "./VendorProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.result?.role === "admin") {
      navigate("/requests");
    } 
  }, []);
  // const state = useSelector((state) => {console.log(state); return state?.auth?.authdata;});
  /**
   *
   * const user = useSelector((state) => {console.log(state)})
   */
  if (user?.result?.role === "vendor") {
    return <VendorProfile />;
  } else {
    return <UserProfile />;
  }
};

export default Profile;
