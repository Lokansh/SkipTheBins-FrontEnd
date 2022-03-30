// Author : Prashit Patel - B00896717
import React from "react";
import DispCard from "../Card/Card";
import schedule from "../../../assets/images/schedule.jpeg";
import view from "../../../assets/images/view.jpeg";
import track from "../../../assets/images/track.png";
import edit from "../../../assets/images/edit.png";
import cancel from "../../../assets/images/cancel.png";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

export default function PickupHomeUser() {
  const navigate = useNavigate();
  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "2%",
        }}
      >
        Manage your Pickup
      </h2>
      <Row>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Schedule Pickup"
            desc="You got waste, we can take take it from here !"
            img={schedule}
            btnClick={() => navigate("/user/pickups/schedule")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="View Pickup"
            desc="You want to view pickup details, go here !"
            img={view}
            btnClick={() => navigate("/user/pickups/view")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Edit Pickup"
            desc="You want to make changes, here you go !"
            img={edit}
            btnClick={() => navigate("/user/pickups/edit")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Cancel Pickup"
            desc="You want to cancel on us, that's not a problem !"
            img={cancel}
            btnClick={() => navigate("/user/pickups/cancel")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Track Pickup"
            desc="You want to view where your pickup is, go here !"
            img={track}
            btnClick={() => navigate("/user/pickups/track")}
          />
        </div>
      </Row>
    </div>
  );
}
