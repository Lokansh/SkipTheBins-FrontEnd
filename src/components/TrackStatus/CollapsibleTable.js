// Author: Vivekkumar Patel (B00896765)
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHeader from "./TableHeader";
import Row from "./Row";
import { useEffect, useState } from "react";
import { WEB_API_URL } from "../../constants";

const CollapsibleTable = () => {
  const [pickupData, setPickupData] = useState([]);

  const getPickups = () => {
    fetch(WEB_API_URL+"/user/pickups/")
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
