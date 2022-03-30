// Author: Vivekkumar Patel (B00896765)
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHeader from "./TableHeader";
import Row from "./Row";
import { useEffect, useState } from "react";

const CollapsibleTable = () => {
  const [pickupData, setPickupData] = useState([]);
  const API_URL = "http://localhost:8080/api/user/pickups/";

  const getPickups = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((res) => {
        setPickupData(res.pickups);
      });
  };

  useEffect(() => {
    getPickups();
  }, []);

  return (
    <Table aria-label="collapsible table" className="table">
      <TableHeader align="left" />
      <TableBody>
        {pickupData.map((row) => (
          <Row key={row.pickupId} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CollapsibleTable;
