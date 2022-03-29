import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import moment from "moment";
import { Calendar, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewSchedule() {
  const navigate = useNavigate();
  const [date, setDate] = useState(moment().format("LL"));
  const [slots, setSlots] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const dateChange = (event) => {
    setDate(event.format("LL"));
    getSchedules(event.format("LL"));
  };

  const submitClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (date !== "") {
      setShowDetails(true);
    }
  }, [date]);

  useEffect(() => {
   getSchedules(moment().format("LL"));
  },[]);

  const getSchedules = async (getDate) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/vendor/schedules",
        {
          params: {
            date: getDate,
            vendorId: '1267'
          },
        }
      );
      if (response.status === 200 && response.data.success === true) {
        const schedules = response.data.schedules;
        let scheduleSlots=[];

        for(var i=0; i<schedules.length; i++) {
          console.log(schedules[i]);
          scheduleSlots.push({
            area: schedules[i].area,
            time: [
              schedules[i].slot.split("-")[0].trim(),
              schedules[i].slot.split("-")[1].trim()
            ]
          })
        }
        setSlots(scheduleSlots);
      } else {
        setShowDetails(false);
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
            View Schedule Details
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
                        {slot.time[0] +
                          " to " +
                          slot.time[1]}
                      </td>
                      <td>{slot.area}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      )}
      <Row style={{ marginTop: "1%", justifyContent: "center" }} className="text-center d flex">
        <Button
          style={{
            maxWidth: "20%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            // marginRight: "0 auto",
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
