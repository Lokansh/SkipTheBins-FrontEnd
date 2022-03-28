import React from "react";
import vendorData from "../../assets/data/contactUsVendors.json";
import "./ContactUs.css";
import { Card } from "react-bootstrap";

function DisplayVendors() {
  const vendorCard = (card, index) => {
    return (
      <Card
        style={{
          width: "15rem",
          margin: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        key={index}
      >
        <Card.Body>
          <Card.Title className="cardTitle">{card.name}</Card.Title>
          <Card.Text className="cardDesc">
            <b>Address - </b>
            {card.address} <br />
            <b>Phone Number - </b>
            {card.phoneNumber} <br />
            <b>Email - </b>
            {card.email}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <span>Vendor Contact Details</span>
      <div className="grid">{vendorData.vendorData.map(vendorCard)}</div>
    </div>
  );
}

export default DisplayVendors;
