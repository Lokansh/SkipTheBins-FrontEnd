import React from "react";
import DispCard from "../Card";
import schedule from "../../../assets/images/schedule.jpeg";
import view from "../../../assets/images/view.jpeg";
import edit from "../../../assets/images/edit.png";
import cancel from "../../../assets/images/cancel.png";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

export default function PickupHomeVendor() {
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
        Manage your Schedule
      </h2>
      <Row>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Create Schedule"
            desc="You want waste, start scheduling here !"
            img={schedule}
            btnClick={() => navigate("/vendor/pickups/schedule")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="View Schedule"
            desc="You want to view schedule details, go here !"
            img={view}
            btnClick={() => navigate("/vendor/pickups/view")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Edit Schedule"
            desc="You want to make changes to your schedule, here you go !"
            img={edit}
            btnClick={() => navigate("/vendor/pickups/edit")}
          />
        </div>
        <div style={{ justifyContent: "center" }} className="col d-flex">
          <DispCard
            title="Cancel Schedule"
            desc="You want to cancel a schedule, not a problem !"
            img={cancel}
            btnClick={() => navigate("/vendor/pickups/delete")}
          />
        </div>
      </Row>
    </div>
  );
}
