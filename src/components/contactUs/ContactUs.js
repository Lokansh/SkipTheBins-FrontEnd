import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayVendors from "./DisplayVendors";

function ContactUs() {
  const navigate = useNavigate();
  const handleSubmitQuery = (e) => {
    navigate("submitquery");
  };
  return (
    <div className="contactContainer">
      <span className="contact-heading">Contact Us</span>
      <DisplayVendors></DisplayVendors>
      <Button variant="primary" onClick={handleSubmitQuery}>
        Submit a Query
      </Button>
    </div>
  );
}

export default ContactUs;
