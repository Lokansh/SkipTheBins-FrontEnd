import React from "react";
import "./ContactUs.css";
import contactUsQueries from "../../assets/data/contactUsQueries.json";
import { Table } from "react-bootstrap";

function AdminDisplayQueries() {
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
        <tbody>{contactUsQueries.queryData.map(renderRowData)}</tbody>
      </Table>
    </div>
  );
}

export default AdminDisplayQueries;
