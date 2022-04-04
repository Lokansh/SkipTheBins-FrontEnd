// @author : Vasu Gamdha (Group 14)

import {
  LOGIN,
  SIGNUP,
  EDIT_PROFILE,
  LOGOUT,
  PASSWORD_CHANGE,
} from "../../config/actionTypes";

import * as api from "../../api";
import { toast } from "react-toastify";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: LOGIN, data });
    toast.success("Logged in successfully");
    if(data?.result?.role === "normaluser") {
      navigate("/user/pickups");
    } else if(data?.result?.role === "vendor") {
      navigate("/vendor/pickups");
    } else if(data?.result?.role === "admin") {
      navigate("/profile");
    }
  } catch (error) { 
    toast.error("Please activate your account or wait for admin approval");
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: SIGNUP, data });
    toast.success("Check your email inbox and spams and activate your account!");
    navigate("/login");
  } catch (error) {
    console.log(error);
    toast.error("Email already has created an account. Try logging in!");
  }
};

export const editProfile = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.editProfile(id, formData);
    dispatch({ type: EDIT_PROFILE, data });
    toast.success("Profile updated!");
  } catch (error) {
    toast.error("Couldn't update your profile!");
  }
};

export const changePassword = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(id, formData);
    dispatch({ type: PASSWORD_CHANGE, data });
    toast.success("Password updated!");
  } catch (error) {
    toast.error("Couldn't update your password!");
  }
};

export const deleteProfile = (id, formData, navigate) => async (dispatch) => {
  try {
    formData.password = formData.passwordToDelete;
    await api.deleteProfile(id);
    dispatch({ type: LOGOUT });
    toast.success("Profile deleted!");
    navigate("/");
  } catch (error) {
    toast.error("Failed to delete your profile!");
  }
};
