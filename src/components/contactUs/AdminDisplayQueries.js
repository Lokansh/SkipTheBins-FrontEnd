// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUs.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";

function AdminDisplayQueries() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [contactUsQueries, setContactUsQueries] = useState([]);

  useEffect(() => {
    getAllQueriesApiCall();
  }, []);

  useEffect(() => {
    if (!user || user?.result?.role !== "admin") {
      toast.error("Please login to continue");

      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [localStorage.getItem("profile")]);

  const getAllQueriesApiCall = () => {
    API.get("/queries")
      .then((res) => {
        setContactUsQueries(res.data.queryData);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const renderRowData = (query, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{query.name}</td>
        <td>{query.email}</td>
        <td>{query.mobile}</td>
        <td>{query.query}</td>
      </tr>
    );
  };
  const handleModifyVendors = (e) => {
    navigate("/contactus/modifyvendors");
  };
  return (
    <div className="contactContainer">
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Contact Us
      </h1>
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        User Queries List
      </h4>
      <Table
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
        responsive="sm"
        bordered="true"
        size="sm"
        striped="true"
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>{contactUsQueries.map(renderRowData)}</tbody>
      </Table>
      <div
        style={{ marginTop: "1%", justifyContent: "center" }}
        className="text-center d flex"
      >
        <Button variant="primary" onClick={handleModifyVendors}>
          Modify Vendor Details
        </Button>
      </div>
    </div>
  );
}

export default AdminDisplayQueries;
