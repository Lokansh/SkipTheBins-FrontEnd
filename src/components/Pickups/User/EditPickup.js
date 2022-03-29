import React, { useEffect, useState } from "react";
import {
  ProgressBar,
  Button,
  ButtonGroup,
  Dropdown,
  ToggleButton,
  ToggleButtonGroup,
  Form,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { Calendar, message } from "antd";
import moment from "moment";
import "./SchedulePickup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function EditPickup() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState(moment().add(1, "day").format("LL"));
  const [time, setTime] = useState("");
  const [area, setArea] = useState("Select Area");
  const [wasteTypes, setWasteTypes] = useState([]);
  const [bags, setBags] = useState(0);
  const [weight, setWeight] = useState(0);
  const [showFields, setShowFields] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [areaData, setAreaData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [batchNo, setBatchNo] = useState();

  const dateChange = (event) => {
    setDate(event.format("LL"));
    getSlots(event.format("LL"), area);
  };

  const onAreaSelect = (event) => {
    setArea(event.target.innerText);
    setShowFields(true);
    getSlots(date, event.target.innerText);
  };

  const onTimeSelect = (event) => {
    setTime(event.target.value);
    const slot = event.target.value.split("=")[0].trim();
    const vendor = event.target.value.split("=")[1].trim();
    const selectedSlot = schedules.filter(
      (schedule) => schedule.slot === slot && schedule.vendor === vendor
    );
    setBatchNo(selectedSlot[0].batchNo);
  };

  const wasteTypeChange = (event) => {
    setWasteTypes(event);
  };

  const onBagsChange = (event) => {
    setBags(parseInt(event.target.value));
  };

  const onWeightChange = (event) => {
    setWeight(parseInt(event.target.value));
  };

  useEffect(() => {
    let progress = 0;
    if (showFields) {
      progress += 20;
    }
    if (time !== "") {
      progress += 20;
    }
    if (wasteTypes.length > 0) {
      progress += 20;
    }
    if (bags > 0) {
      progress += 20;
    }
    if (weight > 0) {
      progress += 20;
    }
    setProgress(progress);
  }, [showFields, time, wasteTypes.length, bags, weight]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false);
    }, 1500);

    return () => {
      clearTimeout(timeId);
    };
  }, [showAlert]);

  useEffect(() => {
    getArea();
  }, []);

  const getSlots = async (getDate, getArea) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/vendor/schedules",
        {
          params: {
            date: getDate,
            area: getArea,
          },
        }
      );
      if (response.status === 200 && response.data.success === true) {
        setSchedules(response.data.schedules);
      } else {
        setSchedules([]);
      }
    } catch (e) {
      console.log(e);
      message.config({ top: "10%" });
      message.error("Something went wrong!");
    }
  };

  const getArea = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/area");

      if (response.status === 200 && response.data.success === true) {
        setAreaData(response.data.areas);
      } else {
        setAreaData([]);
      }
    } catch (e) {
      console.log(e);
      message.config({ top: "10%" });
      message.error("Something went wrong!");
    }
  };

  const submitClick = () => {
    if (progress === 100) {
      navigate("/user/pickups/confirm", {
        state: {
          date,
          time,
          area,
          wasteTypes,
          bags,
          weight,
          batchNo,
        },
      });
    } else {
      message.config({ top: "10%" });
      message.error("Some details missing!");
    }
  };

  return (
    <div>
      {showAlert && (
        <Col
          className="d-flex"
          style={{
            position: "fixed",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Alert
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px" }}
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading style={{ textAlign: "center" }}>
              Please fill all the details!
            </Alert.Heading>
          </Alert>
        </Col>
      )}
      <div>
        <h3
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
          }}
        >
          Schedule your Pickup
        </h3>
        <div style={{ justifyContent: "center" }} className="d-flex">
          <ProgressBar
            animated
            style={{
              marginBottom: "2%",
              minWidth: "80%",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            }}
            variant="success"
            now={progress}
            label={`${progress}%`}
          />
        </div>
        <div
          style={{ justifyContent: "center", marginBottom: "2%" }}
          className="d-flex"
        >
          <Dropdown
            style={{
              minWidth: "20%",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            }}
          >
            <Dropdown.Toggle
              style={{ width: "100%" }}
              variant="success"
              id="dropdown-basic"
            >
              {area}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: "100%" }} onClick={onAreaSelect}>
              {areaData.map((area, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    style={{ textAlign: "center" }}
                    value={area.name}
                  >
                    {area.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {showFields && (
          <div style={{ marginLeft: "2%" }}>
            <Row>
              <Col sm={3} style={{ marginBottom: "2px" }}>
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
                        width: "90%",
                        marginLeft: "1%",
                      }}
                    />
                  </div>
                </Row>
              </Col>
              <Col sm={3} style={{ marginBottom: "2px" }}>
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
                    {schedules.length === 0 ? (
                      <h4>No slots found!</h4>
                    ) : (
                      <ButtonGroup
                        style={{ minWidth: "80%" }}
                        vertical
                        onClick={onTimeSelect}
                      >
                        {schedules.map((schedule, index) => {
                          return (
                            <Button
                              key={index}
                              style={{
                                margin: "2%",
                                border: "1px solid rgba(40, 111, 18,0.85)",
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                              }}
                              variant="light"
                              size="sm"
                              value={`${schedule.slot} = ${schedule.vendor}`}
                              active={
                                time === `${schedule.slot} = ${schedule.vendor}`
                                  ? true
                                  : false
                              }
                            >
                              {schedule.slot} = {schedule.vendor}
                            </Button>
                          );
                        })}
                      </ButtonGroup>
                    )}
                  </Row>
                </Row>
              </Col>
              <Col sm={3} style={{ marginBottom: "2px" }}>
                <Row className="text-center">
                  <h5
                    style={{
                      color: "rgba(17, 45, 92,0.85)",
                      textAlign: "center",
                    }}
                  >
                    Select Waste Types
                  </h5>
                  <Row className="text-center">
                    <ToggleButtonGroup
                      style={{ minWidth: "80%" }}
                      vertical
                      type="checkbox"
                      value={wasteTypes}
                      onChange={wasteTypeChange}
                    >
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        id="tbg-btn-1"
                        variant="light"
                        value="Plastic"
                      >
                        Plastic
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-2"
                        value="Cardboard"
                      >
                        Cardboard
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-3"
                        value="Glass"
                      >
                        Glass
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-4"
                        value="Metal"
                      >
                        Metal
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        variant="light"
                        id="tbg-btn-5"
                        value="Wood"
                      >
                        Wood
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        id="tbg-btn-6"
                        variant="light"
                        value="Clothing"
                      >
                        Clothing
                      </ToggleButton>
                      <ToggleButton
                        style={{
                          margin: "2%",
                          border: "1px solid rgba(40, 111, 18,0.85)",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        }}
                        id="tbg-btn-7"
                        variant="light"
                        value="Other"
                      >
                        Other
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Row>
                </Row>
              </Col>
              <Col sm={3} style={{ marginBottom: "2%" }}>
                <Row className="text-center">
                  <h5
                    style={{
                      color: "rgba(17, 45, 92,0.85)",
                      textAlign: "center",
                    }}
                  >
                    Number of bags/boxes
                  </h5>
                  <Row className="text-center">
                    <Form.Control
                      style={{
                        maxWidth: "80%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: "0 auto",
                      }}
                      type="number"
                      max={10}
                      min={1}
                      onChange={onBagsChange}
                    />
                  </Row>
                </Row>
                <Row style={{ marginTop: "5%" }} className="text-center">
                  <h5
                    style={{
                      color: "rgba(17, 45, 92,0.85)",
                      textAlign: "center",
                    }}
                  >
                    Approximate Weight
                  </h5>
                  <Row className="text-center">
                    <Form.Control
                      style={{
                        maxWidth: "80%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: "0 auto",
                      }}
                      type="number"
                      max={10}
                      min={1}
                      onChange={onWeightChange}
                    />
                  </Row>
                </Row>
              </Col>
            </Row>
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
                Next
              </Button>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
