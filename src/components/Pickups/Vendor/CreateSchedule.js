import React, { useEffect, useState } from "react";
import { ProgressBar, Button, Dropdown, Row, Col } from "react-bootstrap";
import { message, DatePicker, TimePicker, Progress } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

export default function SchedulePickup() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState([
    moment().add(1, "day").endOf("day")._d,
    moment().add(1, "day").endOf("day")._d,
  ]);
  const [time, setTime] = useState([]);
  const [area, setArea] = useState("Select Area");
  const [slotProgress, setSlotProgress] = useState(0);
  const [nextDisable, setNextDisable] = useState(true);
  const [addDisable, setAddDisable] = useState(true);
  const [slots, setSlots] = useState([]);

  const [pickerTime, setPickerTime] = useState();

  const dateChange = (event) => {
    if (event === null) {
      setDate([]);
    } else {
      const fromDate = event[0]._d;
      const toDate = event[1]._d;
      setDate([fromDate, toDate]);
    }
  };

  const onAreaSelect = (event) => {
    setArea(event.target.innerText);
  };

  const onTimeSelect = (event) => {
    setPickerTime(event);
    if (event === null) {
      setTime([]);
    } else {
      const fromTime = event[0].format("HH:mm");
      const toTime = event[1].format("HH:mm");

      if (fromTime === toTime) {
        setTime([]);
        message.config({ top: "10%" });
        message.error("Invalid Time Range!");
      } else {
        setTime([event[0]._d, event[1]._d]);
      }
    }
  };

  const slotSubmit = () => {
    const newSlot = [{ time, area }];
    setSlots((currSlots) => currSlots.concat(newSlot));
    setTime([]);
    setPickerTime();
    setArea("Select Area");
  };

  useEffect(() => {
    let progress = 0;
    let slotProgress = 0;
    if (date.length > 0) {
      progress += 25;
    }
    if (time.length > 0) {
      progress += 25;
      slotProgress += 50;
    }
    if (area !== "Select Area") {
      progress += 25;
      slotProgress += 50;
    }

    if (slots.length > 0) {
      progress = 100;
    }

    if (slotProgress === 100) {
      setAddDisable(false);
    } else {
      setAddDisable(true);
    }
    if (progress === 100) {
      setNextDisable(false);
    }
    setProgress(progress);
    setSlotProgress(slotProgress);
  }, [date, time, area]);

  const submitClick = () => {
    if (progress === 100) {
      message.config({ top: "10%" });
      message.success("Schedule is created successfully!");

      navigate("/vendor/pickups/confirm", {
        state: {
          date,
          slots,
        },
      });
    } else {
      message.config({ top: "10%" });
      message.error("Some details missing!");
    }
  };

  return (
    <div>
      <div>
        <h3
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
          }}
        >
          Create your Schedule
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
        <div>
          <Row>
            <Col sm={4} style={{ marginBottom: "2px" }}>
              <Row className="text-center">
                <h5
                  style={{
                    color: "rgba(17, 45, 92,0.85)",
                    textAlign: "center",
                  }}
                >
                  Select Date Range
                </h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2%",
                  }}
                >
                  <RangePicker
                    allowEmpty={false}
                    defaultValue={[
                      moment().add(1, "day").endOf("day"),
                      moment().add(1, "day").endOf("day"),
                    ]}
                    disabledDate={(current) =>
                      current && current <= moment().endOf("day")
                    }
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                      width: "90%",
                    }}
                    onChange={dateChange}
                    size="large"
                  />
                </div>
              </Row>
            </Col>
            <Col sm={8} style={{ marginBottom: "2px" }}>
              <Row className="text-center">
                <h5
                  style={{
                    color: "rgba(17, 45, 92,0.85)",
                    textAlign: "left",
                    paddingLeft: "5%"
                  }}
                >
                  Enter Slot Details
                </h5>
                {slots.map((slot, index) => {
                  return (
                    <Row
                      key={index}
                      style={{
                        margin: "1% 0 1% 0",
                      }}
                      className="text-center"
                    >
                      <Col sm={6}>
                        <h5
                          style={{
                            color: "rgba(17, 45, 92, 0.85)",
                            border: "1px solid rgba(17, 45, 92, 0.85)",
                          }}
                        >
                          {moment(slot.time[0]).format("hh:mm A") +
                            " to " +
                            moment(slot.time[1]).format("hh:mm A") +
                            " - " +
                            slot.area}
                        </h5>
                      </Col>
                    </Row>
                  );
                })}
                <Row
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: "5%",
                    margin: "1%",
                  }}
                  className="d-flex"
                >
                  <Col sm={4} style={{ margin: "2%" }}>
                    <TimePicker.RangePicker
                      use12Hours
                      minuteStep={30}
                      format="hh:mm A"
                      onChange={onTimeSelect}
                      value={pickerTime}
                    />
                  </Col>
                  <Col sm={3} style={{ margin: "2%" }}>
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
                        size="sm"
                      >
                        {area}
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{ width: "100%" }}
                        onClick={onAreaSelect}
                      >
                        <Dropdown.Item
                          style={{ textAlign: "center" }}
                          value="Spring Garden"
                        >
                          Spring Garden
                        </Dropdown.Item>
                        <Dropdown.Item
                          style={{ textAlign: "center" }}
                          value="Lower Sackville"
                        >
                          Lower Sackville
                        </Dropdown.Item>
                        <Dropdown.Item
                          style={{ textAlign: "center" }}
                          value="Bayers Road"
                        >
                          Bayers Road
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col sm={3} style={{ margin: "2%" }}>
                    <Button
                      style={{
                        maxWidth: "30%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: "0 auto",
                      }}
                      variant="primary"
                      onClick={slotSubmit}
                      disabled={addDisable}
                      size="sm"
                    >
                      Add
                    </Button>
                    <Progress
                      type="circle"
                      percent={slotProgress}
                      status="success"
                      width="30px"
                      strokeWidth="10"
                      style={{ marginLeft: "5%" }}
                    />
                  </Col>
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
              disabled={nextDisable}
            >
              Create
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
}
