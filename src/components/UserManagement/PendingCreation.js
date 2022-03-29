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
    <div className="pendingApprovals">
      <h2>Pending Vendor Profile Approval Request</h2>
      <div className="form-container">
        {unapprovedVendorList && unapprovedVendorList.length ? (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Organization Name</th>
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
          <div>No pending vendor approval requests.</div>
        )}
      </div>
    </div>
  );
};

export default PendingCreation;
