// @author : Vasu Gamdha (Group 14)

import { combineReducers } from "redux";

import auth from "./auth";
import vendor from "./vendor";

export default combineReducers({ auth, vendor });
