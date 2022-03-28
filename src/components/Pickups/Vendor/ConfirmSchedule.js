import moment from "moment";
import React from "react";
import { useLocation } from "react-router-dom";
import { Row, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ScheduleConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { date, slots } = state;

  const submitClick = () => {
    navigate("/");
  };

  return (
    <Row>
        {console.log(slots)}
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "2%",
        }}
      >
        Schedule Details
      </h3>
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "2%",
        }}
      >
        Date :{" "}
        {moment(date[0]).format("DD/MM/YYYY") +
          " to " +
          moment(date[1]).format("DD/MM/YYYY")}
      </h4>
      <h5
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Slots
      </h5>
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
      <Button
        style={{
          maxWidth: "20%",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
          margin: "2% auto",
        }}
        variant="success"
        onClick={submitClick}
      >
        Home
      </Button>
    </Row>
  );
}
