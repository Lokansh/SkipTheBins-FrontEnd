import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

import defaultProfileImage from "../../assets/default.png";
import { Row, Col, Container } from "react-bootstrap";

const UserProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <Container>
      <div className="profile__name">
        <h1>{`${user?.result?.firstName} ${user?.result?.lastName}'s Profile`}</h1>
      </div>
      <Container fluid className="profile__details">
        <Row>
          <Col md={2} sm={12}>
            <img
              src={user?.result?.imageBase64 || defaultProfileImage}
              className="img-fluid"
            />
          </Col>
          <Col md={8} sm={12}>
            <div
              style={{ top: "25%", position: "inherit" }}
              className="my-auto"
            >
              <div>Address: {user?.result?.address}</div>
              <div>Mobile Number: {user?.result?.mobileNumber}</div>
              <div>Email: {user?.result?.email}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default UserProfile;
