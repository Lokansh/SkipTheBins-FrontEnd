import React, { useEffect, useState } from "react";
import { Button, Dropdown, Row, Col } from "react-bootstrap";
import { message, TimePicker, Progress, Calendar } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import axios from "axios";

export default function EditSchedule() {
  const navigate = useNavigate();

  const [date, setDate] = useState(moment().add(1, "day").format("LL"));
  const [slots, setSlots] = useState([]);

  const [time, setTime] = useState([]);
  const [area, setArea] = useState("Select Area");
  const [slotProgress, setSlotProgress] = useState(0);
  const [nextDisable, setNextDisable] = useState(false);
  const [addDisable, setAddDisable] = useState(true);

  const [pickerTime, setPickerTime] = useState();
  const [buttonText, setButtonText] = useState("Add");
  const [editableSchedule, setEditableSchedule] = useState({});

  const dateChange = (event) => {
    setDate(event.format("LL"));
    getSchedules(event.format("LL"));
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
        setTime([event[0].format("hh:mm A"), event[1].format("hh:mm A")]);
      }
    }
  };

  const slotSubmit = async () => {
    if (buttonText === "Add") {
    } else if (buttonText === "Update") {
      try {
        const body = {
          vendorId: editableSchedule.vendor,
          vendor: editableSchedule.vendorId,
          area: area,
          date: editableSchedule.date,
          batchNo: editableSchedule.batchNo,
          slot: [time[0], time[1]],
        };
        const response = await axios.put(
          "http://localhost:8080/api/vendor/update/" + editableSchedule.id,
          body
        );

        if (response.status === 200 && response.data.success === true) {
          const existingSlots = slots;
          existingSlots.push({
            area: area,
            time: [time[0], time[1]],
            id: editableSchedule.id,
            vendorId: editableSchedule.vendorId,
            vendor: editableSchedule.vendor,
            batchNo: editableSchedule.batchNo,
            date: editableSchedule.date,
          });
          setSlots(existingSlots);
        } else {
          setSlots(slots);
          message.config({ top: "10%" });
          message.error(response.data.message);
        }
      } catch (e) {
        console.log(e);
        message.config({ top: "10%" });
        message.error("Something went wrong!");
      }
    }
    // const newSlot = [{ time, area }];
    // setSlots((currSlots) => currSlots.concat(newSlot));
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

  const slotDeleteClick = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/vendor/delete/" + id
      );
    } catch (e) {
      console.log(e);
    }
    const newSlots = slots.filter((slot) => slot.id !== id);
    setSlots(newSlots);
  };

  const slotEditClick = (id) => {
    const selectedSlot = slots.filter((slot) => slot.id === id);
    setEditableSchedule(selectedSlot[0]);
    setArea(selectedSlot[0].area);
    setTime([selectedSlot[0].time[0], selectedSlot[0].time[1]]);
    setPickerTime([
      moment(selectedSlot[0].time[0], "hh:mm A"),
      moment(selectedSlot[0].time[1], "hh:mm A"),
    ]);
    const newSlots = slots.filter((slot) => slot.id !== id);
    setSlots(newSlots);

    setButtonText("Update");
  };

  useEffect(() => {
    getSchedules(moment().add(1, "day").format("LL"));
  }, []);

  const getSchedules = async (getDate) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/vendor/schedules",
        {
          params: {
            date: getDate,
            vendorId: "1267",
          },
        }
      );
      if (response.status === 200 && response.data.success === true) {
        const schedules = response.data.schedules;
        let scheduleSlots = [];

        for (var i = 0; i < schedules.length; i++) {
          scheduleSlots.push({
            area: schedules[i].area,
            time: [
              schedules[i].slot.split("-")[0].trim(),
              schedules[i].slot.split("-")[1].trim(),
            ],
            id: schedules[i].scheduleId,
            vendorId: schedules[i].vendorId,
            vendor: schedules[i].vendor,
            batchNo: schedules[i].batchNo,
            date: schedules[i].date,
          });
        }
        setSlots(scheduleSlots);
      } else {
        // setShowDetails(false);
        setSlots([]);
        message.config({ top: "10%" });
        message.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      message.config({ top: "10%" });
      message.error("Something went wrong!");
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
                          {slot.time[0] +
                            " to " +
                            slot.time[1] +
                            " - " +
                            slot.area}
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              marginLeft: "2%",
                              paddingBottom: "2%",
                            }}
                            variant="light"
                            onClick={() => slotDeleteClick(slot.id)}
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
                            onClick={() => slotEditClick(slot.id)}
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
