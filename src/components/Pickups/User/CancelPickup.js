import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Calendar, message, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function CancelPickup() {
  const navigate = useNavigate();
  const [date, setDate] = useState(moment().add(1, "day").endOf("day")._d);
  const [time, setTime] = useState("");
  const [wasteTypes, setWasteTypes] = useState([
    "Cardboard",
    "Glass",
    "Plastic",
  ]);
  const [bags, setBages] = useState(2);
  const [weight, setWeight] = useState(3);
  const [showDetails, setShowDetails] = useState(false);

  const dateChange = (event) => {
    setDate(event._d);
  };

  const onTimeSelect = (event) => {
    setTime(event.target.value);
  };

  const submitClick = () => {
    navigate("/");
  };

  const cancelPickup = () => {
    message.config({ top: "10%" });
    message.success("Pickup successfully cancelled");
    navigate("/");
  };

  useEffect(() => {
    if (time !== "") {
      setShowDetails(true);
    }
  }, [time]);
  return (
    <Row>
      <Row>
        <Col>
          <h3
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Cancel Pickup
          </h3>
        </Col>
      </Row>
      <Col
        sm={7}
        style={{ alignItems: "center", justifyContent: "center" }}
        className="d-flex"
      >
        <Row>
          <Col sm={7} style={{ marginBottom: "2px" }}>
            <Row className="text-center">
              <h5
                style={{
                  color: "rgba(17, 45, 92,0.85)",
                  textAlign: "center",
                }}
              >
                Select Date
              </h5>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Calendar
                  fullscreen={false}
                  defaultValue={moment().add(1, "day").endOf("day")}
                  disabledDate={(current) =>
                    current && current <= moment().endOf("day")
                  }
                  onSelect={dateChange}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                    width: "80%",
                    marginLeft: "2%",
                  }}
                />
              </div>
            </Row>
          </Col>
          <Col sm={5} style={{ marginBottom: "2px" }}>
            <Row className="text-center">
              <h5
                style={{
                  color: "rgba(17, 45, 92,0.85)",
                  textAlign: "center",
                }}
              >
                Select Time & Vendor
              </h5>
              <Row style={{ justifyContent: "center" }} className="d-flex">
                <ButtonGroup
                  style={{ minWidth: "80%" }}
                  vertical
                  onClick={onTimeSelect}
                >
                  <Button
                    style={{
                      margin: "2%",
                      border: "1px solid rgba(40, 111, 18,0.85)",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                    }}
                    variant="light"
                    size="sm"
                    value="9 AM - Walmart"
                    active={time === "9 AM - Walmart" ? true : false}
                  >
                    9 AM - Walmart
                  </Button>
                  <Button
                    style={{
                      margin: "2%",
                      border: "1px solid rgba(40, 111, 18,0.85)",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                    }}
                    variant="light"
                    size="sm"
                    value="11 AM - Walmart"
                    active={time === "11 AM - Walmart" ? true : false}
                  >
                    11 AM - Walmart
                  </Button>
                </ButtonGroup>
              </Row>
            </Row>
          </Col>
        </Row>
      </Col>
      {showDetails && (
        <Col sm={5}>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "5%",
            }}
          >
            Details
          </h4>
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
              <Row style={{ marginTop: "1%" }} className="text-center">
                <Popconfirm
                  title="Are you sure？"
                  icon={
                    <QuestionCircleOutlined
                      style={{ color: "red" }}
                    />
                  }
                  onConfirm={cancelPickup}
                >
                  <Button
                    style={{
                      maxWidth: "30%",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                      margin: "0 auto",
                    }}
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </Popconfirm>
              </Row>
            </Row>
          </div>
        </Col>
      )}
      <Row style={{ marginTop: "1%" }} className="text-center">
        <Button
          style={{
            maxWidth: "30%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            margin: "0 auto",
          }}
          variant="success"
          onClick={submitClick}
        >
          Home
        </Button>
      </Row>
    </Row>
  );
}
