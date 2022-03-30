// @author : Vasu Gamdha (Group 14)

import {
  FETCH_UNAPPROVED_VENDORS,
  APPROVE_VENDOR_PROFILE,
  FETCH_VENDOR_DELETION_LIST,
  DELETE_VENDOR_PROFILE,
  REQUEST_VENDOR_DELETION,
  DECLINE_VENDOR_DELETION,
  DECLINE_VENDOR_CREATION,
} from "../../config/actionTypes";
import { toast } from "react-toastify";
import * as api from "../../api";

export const getUnapprovedVendorsList = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUnapprovedVendorsList();
    dispatch({ type: FETCH_UNAPPROVED_VENDORS, payload: data });
  } catch (error) {
    toast.error("Failed to fetch unapproved vendors' account creation list!");
  }
};

export const approveVendorProfile = (id) => async (dispatch) => {
  try {
    const { data } = await api.approveVendorProfile(id);
    dispatch({ type: APPROVE_VENDOR_PROFILE, payload: data });
  } catch (error) {
    toast.error("Failed to create vendor account!");
  }
};

export const getVendorDeletionRequestList = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchVendorDeletionList();
    dispatch({ type: FETCH_VENDOR_DELETION_LIST, payload: data });
  } catch (error) {
    toast.error("Failed to fetch unapproved vendors' account deletion list!");
  }
};

export const deleteVendorProfile = (id) => async (dispatch) => {
  try {
    await api.deleteProfile(id);
    dispatch({ type: DELETE_VENDOR_PROFILE, payload: id });
  } catch (error) {
    toast.error("Failed to delete vendor account!");
  }
};

export const requestVendorDeletion = (id) => async (dispatch) => {
  try {
    const { data } = await api.requestVendorDeletion(id);
    dispatch({ type: REQUEST_VENDOR_DELETION, payload: data });
  } catch (error) {
    toast.error("Failed request account deletion!");
  }
};

export const declineVendorProfileCreation = (id) => async (dispatch) => {
  try {
    await api.declineVendorProfileCreation(id);
    dispatch({ type: DECLINE_VENDOR_CREATION, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const declineVendorProfileDeletion = (id) => async (dispatch) => {
  try {
    const { data } = await api.declineVendorProfileDeletion(id);
    dispatch({ type: DECLINE_VENDOR_DELETION, payload: data });
  } catch (error) {
    console.log(error);
  }
};
