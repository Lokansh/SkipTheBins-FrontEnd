// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RewardStore.css";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WEB_API_URL } from "../../constants";
import API from "../../api";

function AdminViewPurchVouchers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [purchasedVouchers, setpurchasedVouchers] = useState([]);

  useEffect(() => {
    getAllPurchasedVouchersApiCall();
  }, []);

  const getAllPurchasedVouchersApiCall = () => {
    axios
      .get(WEB_API_URL + "/voucher/getPurchaseVouchers")
      .then((res) => {
        console.log(JSON.stringify(res));
        setpurchasedVouchers(res.data.voucherData);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const renderRowData = (query, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{query.companyName}</td>
        <td>{query.value}</td>
        <td>{query.points}</td>
        <td>{query.customerId}</td>
        <td>{query.datePurchased}</td>
      </tr>
    );
  };
  const handleModifyVouchers = (e) => {
    navigate("/rewardstore/modifyvouchers");
  };
  return (
    <div className="rewardContainer">
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Reward Store
      </h1>
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Purchased Voucher List
      </h4>
      <Table
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
        responsive="sm"
        bordered="true"
        size="sm"
        striped="true"
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Company Name</th>
            <th>Value</th>
            <th>Points</th>
            <th>Customer Id</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>{purchasedVouchers.map(renderRowData)}</tbody>
      </Table>
      <div
        style={{ marginTop: "1%", justifyContent: "center" }}
        className="text-center d flex"
      >
        <Button variant="primary" onClick={handleModifyVouchers}>
          Modify Voucher Details
        </Button>
      </div>
    </div>
  );
}

export default AdminViewPurchVouchers;
