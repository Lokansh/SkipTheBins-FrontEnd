import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUs.css";
//import contactUsQueries from "../../assets/data/contactUsQueries.json";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminDisplayQueries() {
  const navigate = useNavigate();

  const [contactUsQueries, setContactUsQueries] = useState([]);

  useEffect(() => {
    getAllQueriesApiCall();
  }, []);

  const getAllQueriesApiCall = () => {
    axios
      .get("http://localhost:8080/api/queries")
      .then((res) => {
        console.log("queryData-------" + JSON.stringify(res.data.queryData));
        setContactUsQueries(res.data.queryData);
      })
      .catch((error) => console.log(error));
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
      <span className="contact-heading">Contact Us</span>
      <span>User Queries List</span>
      <Table responsive="sm" bordered="true" size="sm" striped="true">
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
      <Button variant="primary" onClick={handleModifyVendors}>
        Modify Vendors
      </Button>
    </div>
  );
}

export default AdminDisplayQueries;
