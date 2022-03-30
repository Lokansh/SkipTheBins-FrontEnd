// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUs.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { WEB_API_URL } from "../../constants";
import { toast } from "react-toastify";

function AdminDisplayQueries() {
  const navigate = useNavigate();

  const [contactUsQueries, setContactUsQueries] = useState([]);

  useEffect(() => {
    getAllQueriesApiCall();
  }, []);

  const getAllQueriesApiCall = () => {
    axios
      .get(WEB_API_URL + "/queries")
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
        class="text-center d flex"
      >
        <Button variant="primary" onClick={handleModifyVendors}>
          Modify Vendor Details
        </Button>
      </div>
    </div>
  );
}

export default AdminDisplayQueries;
