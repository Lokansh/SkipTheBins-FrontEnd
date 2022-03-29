import React, { useEffect, useState } from "react";
import axios from "axios";
//import vendorData from "../../assets/data/contactUsVendors.json";
import "./ContactUs.css";
import { Card } from "react-bootstrap";

function DisplayVendors() {
  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    getAllVendorsApiCall();
  }, []);

  const getAllVendorsApiCall = () => {
    axios
      .get("http://localhost:8080/api/vendor")
      .then((res) => {
        console.log("vendorData-----" + JSON.stringify(res.data.vendorData));
        setVendorData(res.data.vendorData);
      })
      .catch((error) => console.log(error));
  };

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
      <div className="grid">{vendorData.map(vendorCard)}</div>
    </div>
  );
}

export default DisplayVendors;
