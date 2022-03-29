import moment from "moment";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ScheduleConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { date, time, area, weight, bags, wasteTypes, batchNo } = state;
  const [address, setAddress] = useState("");
  const [radioDisable, setRadioDisable] = useState(false);

  const onAddressChange = (event) => {
    setAddress(event.target.defaultValue);
  };

  const onNewAddress = (event) => {
    if (event.target.value === "") {
      setRadioDisable(false);
    } else {
      setRadioDisable(true);
      setAddress(event.target.value);
    }
  };

  const submitClick = async () => {
    if (address !== "") {
      const timeVendorArr = time.split("=");
      const body = {
        userId: "5678",
        date,
        area,
        wasteType: wasteTypes,
        boxQty: bags,
        wasteQty: weight,
        slot: timeVendorArr[0].trim(),
        vendor: timeVendorArr[1].trim(),
        batchNo,
        address: address,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/schedule",
          body
        );

        if (response.status === 200 && response.data.success === true) {
          message.config({ top: "10%" });
          message.success(response.data.message);
          navigate("/");
        } else {
          message.error(response.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      message.error("Please provide an address");
    }
  };

  return (
    <Row>
      <Col sm={5}>
        <h3
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "5%",
          }}
        >
          Pickup details
        </h3>
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            margin: "0 auto",
            width: "85%",
            padding: "2%",
            borderRadius: "2%",
          }}
        >
          <Row
            style={{
              margin: "0 auto",
              marginBottom: "5%",
              textAlign: "center",
            }}
          >
            <Col>
              <h4
                style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
              >
                Date : {moment(date).format("LL")}
              </h4>
            </Col>
          </Row>
          <Row
            style={{
              margin: "0 auto",
              marginBottom: "5%",
              textAlign: "center",
            }}
          >
            <Col>
              <h4
                style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
              >
                Time : {time}
              </h4>
            </Col>
          </Row>
          <Row
            style={{
              margin: "0 auto",
              marginBottom: "5%",
              textAlign: "center",
            }}
          >
            <Col>
              <h4
                style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
              >
                Waste Types : {wasteTypes.map((item) => item).join(", ")}
              </h4>
            </Col>
          </Row>
          <Row
            style={{
              margin: "0 auto",
              marginBottom: "5%",
              textAlign: "center",
            }}
          >
            <Col>
              <h4
                style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
              >
                No. of bags : {bags}
              </h4>
            </Col>
            {/* <Col sm={7}>
              <h4 style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}>
                {bags}
              </h4>
            </Col> */}
          </Row>
          <Row
            style={{
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Col>
              <h4
                style={{ textAlign: "center", color: "rgba(40, 111, 18, 1)" }}
              >
                Weight : {weight}
              </h4>
            </Col>
          </Row>
        </div>
      </Col>
      <Col
        sm={7}
        style={{ alignItems: "center", justifyContent: "center" }}
        className="d-flex"
      >
        <Row>
          <h3
            style={{
              textAlign: "left",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              margin: "5% 0 5% 3%",
            }}
          >
            Pickup Address
          </h3>
          <h4
            style={{
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginLeft: "3%",
            }}
          >
            Area: {area}
          </h4>
          <Form.Check
            style={{ fontSize: "larger", marginLeft: "5%" }}
            disabled={radioDisable}
            type="radio"
            name="address-group"
            value="address1"
            label="Address 1"
            onClick={onAddressChange}
          />
          <Form.Check
            style={{ fontSize: "larger", marginLeft: "5%" }}
            disabled={radioDisable}
            type="radio"
            name="address-group"
            value="address2"
            label="Address 2"
            onClick={onAddressChange}
          />

          <h4
            style={{
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginTop: "5%",
              marginLeft: "3%",
            }}
          >
            Different Address?
          </h4>
          <Form.Control
            style={{
              maxWidth: "80%",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
              marginLeft: "5%",
            }}
            type="text"
            onChange={onNewAddress}
          />
          <Button
            style={{
              maxWidth: "30%",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
              marginTop: "5%",
              marginLeft: "5%",
            }}
            variant="success"
            onClick={submitClick}
          >
            Schedule
          </Button>
        </Row>
      </Col>
    </Row>
  );
}
