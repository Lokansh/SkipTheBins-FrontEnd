import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Calendar, message, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function DeleteSchedule() {
  const navigate = useNavigate();
  const [date, setDate] = useState();
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
  const [showDetails, setShowDetails] = useState(false);

  const dateChange = (event) => {
    setDate(event._d);
  };

  const submitClick = () => {
    navigate("/");
  };

  const deleteSchedule = () => {
    message.config({ top: "10%" });
    message.success("Schedule successfully deleted");
    navigate("/");
  };

  useEffect(() => {
    if (date !== "") {
      setShowDetails(true);
    }
  }, [date]);

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
            Delete Schedule
          </h3>
        </Col>
      </Row>
      <Col
        sm={7}
        style={{ alignItems: "center", justifyContent: "center" }}
        className="d-flex"
      >
        <Row>
          <Col sm={3} />
          <Col sm={6} style={{ marginBottom: "2%" }}>
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
        </Row>
      </Col>
      {showDetails && (
        <Col sm={4}>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "5%",
            }}
          >
            Slots
          </h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Table
              style={{ width: "100%", textAlign: "center", fontSize: "larger" }}
              responsive
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Area</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {moment(slot.time[0]).format("hh:mm A") +
                          " to " +
                          moment(slot.time[1]).format("hh:mm A")}
                      </td>
                      <td>{slot.area}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <Row style={{ marginTop: "1%" }} className="text-center">
            <Popconfirm
              title="Are you sure？"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={deleteSchedule}
            >
              <Button
                style={{
                  maxWidth: "20%",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                  margin: "0 auto",
                  textAlign: "center"
                }}
                variant="danger"
              >
                Delete
              </Button>
            </Popconfirm>
          </Row>
        </Col>
      )}
      <Row
        style={{ marginTop: "1%", justifyContent: "center", marginLeft: "1%" }}
        className="text-center d flex"
      >
        <Button
          style={{
            maxWidth: "20%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            textAlign: "center"
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
