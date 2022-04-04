// @author : Vasu Gamdha (Group 14)

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUnapprovedVendorsList,
  approveVendorProfile,
  declineVendorProfileCreation,
} from "../../store/actions/vendor";
import { toast } from "react-toastify";
import "./UserProfile.css";

const PendingCreation = () => {
  const dispatch = useDispatch();

  const unapprovedVendorList = useSelector(
    (state) => state?.vendor?.unapprovedVendorList
  );

  useEffect(() => {
    dispatch(getUnapprovedVendorsList());
  }, [dispatch]);

  const approveVendorProfileClicked = (id) => {
    dispatch(approveVendorProfile(id));
    toast.success("Vendor account created!");
  };

  const declineVendorProfileCreationClicked = (id) => {
    dispatch(declineVendorProfileCreation(id));
    toast.success("Account creation request declined!");
  };

  return (
    <div className="mt-3 mb-4 pendingApprovals">
      <h2 style={{ textAlign: "center" }}>
        Pending vendor profile creation requests
      </h2>
      <br />
      <br />
      <div className="table-container">
        {unapprovedVendorList && unapprovedVendorList.length ? (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Organization Name</th>
                <th>Organization Email</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unapprovedVendorList.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.organizationName}</td>
                  <td>{item.email}</td>
                  <td>{item.reason}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => approveVendorProfileClicked(item._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        declineVendorProfileCreationClicked(item._id)
                      }
                    >
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div style={{ textAlign: "center" }} className="h4">
            No pending requests.
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingCreation;
