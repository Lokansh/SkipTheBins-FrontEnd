import React, { useEffect, useState } from "react";
import { Button, Dropdown, Row, Col } from "react-bootstrap";
import { message, TimePicker, Progress, Calendar } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

export default function EditSchedule() {
  const navigate = useNavigate();

  const [date, setDate] = useState(moment().add(1, "day").endOf("day"));
  const [slots, setSlots] = useState([
    {
      area: "Spring Garden",
      time: [
        "Sat Mar 26 2022 14:30:00 GMT-0300 (Atlantic Daylight Time)",
        "Sat Mar 26 2022 15:30:00 GMT-0300 (Atlantic Daylight Time)",
      ],
    },
    {
      area: "Bayers Road",
      time: [
        "Sat Mar 26 2022 18:30:00 GMT-0300 (Atlantic Daylight Time",
        "Sat Mar 26 2022 19:30:00 GMT-0300 (Atlantic Daylight Time)",
      ],
    },
  ]);

  const [time, setTime] = useState([]);
  const [area, setArea] = useState("Select Area");
  const [slotProgress, setSlotProgress] = useState(0);
  const [nextDisable, setNextDisable] = useState(false);
  const [addDisable, setAddDisable] = useState(true);

  const [pickerTime, setPickerTime] = useState();
const [buttonText, setButtonText] = useState("Add");
  const dateChange = (event) => {
    setDate(event._d);
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
    setButtonText("Add");
  };

  useEffect(() => {
    let slotProgress = 0;
    if (time.length > 0) {
      slotProgress += 50;
    }
    if (area !== "Select Area") {
      slotProgress += 50;
    }

    if (slotProgress === 100) {
      setAddDisable(false);
    } else {
      setAddDisable(true);
    }
    setSlotProgress(slotProgress);

    if (slots.length === 0) {
      setNextDisable(true);
    } else {
      setNextDisable(false);
    }
  }, [time, area, slots]);

  const submitClick = () => {
    message.config({ top: "10%" });
    message.success("Schedule is updated successfully!");
    navigate("/");
  };

  const slotDeleteClick = (delIndex) => {
    const newSlots = slots.filter((slot, index) => index !== delIndex);
    setSlots(newSlots);
  };

  const slotEditClick = (editIndex) => {
    setArea(slots[editIndex].area);
    setTime([slots[editIndex].time[0], slots[editIndex].time[1]]);
    setPickerTime([
      moment(slots[editIndex].time[0]),
      moment(slots[editIndex].time[1]),
    ]);
    const newSlots = slots.filter((slot, index) => index !== editIndex);
    setSlots(newSlots);

    setButtonText("Update");
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
          Edit Schedule
        </h3>
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
                  Select Date
                </h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2%",
                  }}
                >
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
                      // marginLeft: "2%",
                    }}
                  />
                </div>
              </Row>
            </Col>
            <Col sm={8} style={{ marginBottom: "2px", paddingLeft: "2%" }}>
              <Row className="text-center">
                <h5
                  style={{
                    color: "rgba(17, 45, 92,0.85)",
                    textAlign: "left",
                  }}
                >
                  Slot Details
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
                      <Col sm={8}>
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
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              marginLeft: "2%",
                              paddingBottom: "2%",
                            }}
                            variant="light"
                            onClick={() => slotDeleteClick(index)}
                          >
                            <DeleteTwoTone
                              twoToneColor="red"
                              style={{ fontSize: "x-large" }}
                            />
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              marginLeft: "1%",
                              paddingBottom: "2%",
                            }}
                            variant="light"
                            onClick={() => slotEditClick(index)}
                          >
                            <EditTwoTone
                              twoToneColor="green"
                              style={{ fontSize: "x-large" }}
                            />
                          </Button>
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
                        maxWidth: "35%",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: "0 auto",
                      }}
                      variant="primary"
                      onClick={slotSubmit}
                      disabled={addDisable}
                      size="sm"
                    >
                      {buttonText}
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
              Update
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
}
