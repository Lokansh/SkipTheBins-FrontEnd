// @author : Vasu Gamdha (Group 14)

import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import PendingCreation from "./PendingCreation";
import PendingDeletion from "./PendingDeletion";

const Requests = () => {
  return (
    <div>
      <Tabs
        fill
        justify
        defaultActiveKey="pendingCreation"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pendingCreation" title="Creation Requests">
          <PendingCreation />
        </Tab>
        <Tab eventKey="pendingDeletion" title="Deletion Requests">
          <PendingDeletion />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Requests;
