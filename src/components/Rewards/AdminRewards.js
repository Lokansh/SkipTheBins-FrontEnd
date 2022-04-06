import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Table, Row, Col, Form } from "react-bootstrap";
import API from "../../api";

function AdminRewards() {
  return (
    <Row>
      <Row>
        <Col>
          <h3
            style={{
              textAlign: "left",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Reward Settings
          </h3>
        </Col>
      </Row>
      <Row>
        {/* <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            padding: "5%",
          }}
        > */}
        <h4
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
            marginLeft: "5%",
          }}
        >
          Reward Points per kg :
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "5%",
            marginBottom: "5%",
          }}
        >
          <Form.Control
            style={{
              maxWidth: "10%",
              minWidth: "100px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
              // margin: "0 auto",
            }}
            type="number"
            max={10}
            min={1}
            // onChange={onBagsChange}
          />
           <Button
          style={{
            maxWidth: "30%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            // margin: "0 auto",
            marginLeft: "3%",
          }}
          variant="success"
          // onClick={submitClick}
        >
          Home
        </Button>
        </div>
        {/* </div> */}
      </Row>
      <Row>
        <h3
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "2%",
          }}
        >
          Reward Points compensation
        </h3>
      </Row>
      <Row>
        <h4
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "2%",
            marginLeft: "5%",
          }}
        >
          User complaints
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "5%",
          }}
        >
          <Table
            style={{ width: "100%", textAlign: "center", fontSize: "larger" }}
            responsive
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Slot</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {/* {pickups.map((pickup, index) => {
                return (
                  <tr key={index}>
                    <td>{pickup.date}</td>
                    <td>{pickup.slot}</td>
                    <td>{pickup.points}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row style={{ marginTop: "1%" }} className="text-center">
        <Button
          style={{
            maxWidth: "30%",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
            margin: "0 auto",
            marginTop: "3%",
          }}
          variant="success"
          // onClick={submitClick}
        >
          Home
        </Button>
      </Row>
    </Row>
  );
}
// /profile
export default AdminRewards;
