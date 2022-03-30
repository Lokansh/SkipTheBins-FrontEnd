// @author : Vasu Gamdha (Group 14)

import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  EDIT_PROFILE,
  PASSWORD_CHANGE,
} from "../../config/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      var token = JSON.parse(JSON.stringify({ ...action?.data })).token;
      localStorage.setItem("token", token);
      return { ...state, authData: action?.data?.result };
    }
    case SIGNUP: {
      return state;
    }
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case EDIT_PROFILE:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data?.result };
    case PASSWORD_CHANGE:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data?.result };

    default:
      return state;
  }
};

export default authReducer;
