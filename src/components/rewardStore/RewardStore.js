// Author : Lokansh Gupta
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RewardStore.css";
import { Card, Button } from "react-bootstrap";
import { WEB_API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

function RewardStore() {
  const navigate = useNavigate();

  const [voucherData, setvoucherData] = useState([]);
  const [rewardPoints, setRewardPoints] = useState();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [redeemButtomDisabled, setRedeemButtomDisabled] = useState(false);

  useEffect(() => {
    getAllVoucherDetailsApiCall();
    getRewardPointsApiCall();
  }, []);

  const getAllVoucherDetailsApiCall = () => {
    axios
      .get(WEB_API_URL + "/voucher/allDetails")
      .then((res) => {
        setvoucherData(res.data.voucherData);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const getRewardPointsApiCall = () => {
    axios
      .get(WEB_API_URL + "/reward/getPoints", {
        params: {
          customerId: "1234", ////////UPDATEEEEEEE
        },
      })
      .then((res) => {
        if (res.data.rewardData.length != 0) {
          setRewardPoints(res.data.rewardData[0].points);
          setRedeemButtomDisabled(false);
        } else {
          toast.error("You don't have any reward points.");
          setRedeemButtomDisabled(true);
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const handleRedeem = (voucher) => {
    console.log("voucher---", voucher);

    if (rewardPoints - parseInt(voucher.points) < 0) {
      toast.error("You don't have sufficient points to redeem this voucher.");
    } else {
      var leftRewardPoints = rewardPoints - parseInt(voucher.points);
      setRewardPoints(leftRewardPoints);
      updateRewardPointsApiCall(leftRewardPoints);
      createVoucherPurchased(voucher);
    }
  };

  const updateRewardPointsApiCall = (updatedRewardPoints) => {
    console.log("Inside api call---" + updatedRewardPoints);
    axios
      .post(WEB_API_URL + "/reward/updatePoints", {
        _id: "624d2a2e3af23056bed6fb88", ////////UPDATEEEEEEEE
        points: updatedRewardPoints,
      })
      .then((res) => {
        if (res.data.success) {
          console.log("Reward Points Edited");
          setSubmitSuccess(true);
        } else {
          toast.error("Reward Points not edited");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const createVoucherPurchased = (voucher) => {
    var newVoucherObj = {
      companyName: voucher.companyName,
      value: voucher.value,
      points: voucher.points,
      customerId: "1234", /////UPDAAATEEEEEEEEEE
      datePurchased: moment().format("LL"),
    };
    axios
      .post(WEB_API_URL + "/voucher/purchase", newVoucherObj)
      .then((res) => {
        if (res.data.success) {
          setSubmitSuccess(true);
        } else {
          toast.error("Voucher not purchased");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const handleGoBack = (e) => {
    navigate("/");
  };

  const voucherCard = (card, index) => {
    return (
      <Card
        style={{
          width: "15rem",
          margin: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        key={index}
      >
        <Card.Body>
          <Card.Title className="cardTitle">{card.companyName}</Card.Title>
          <Card.Text className="cardDesc">
            <b>Voucher Value - </b>${card.value} <br />
            <b>Points Required - </b>
            {card.points} <br />
          </Card.Text>
          <div className="col text-center">
            <Button
              className="cardButton"
              variant="success"
              disabled={redeemButtomDisabled}
              onClick={() => handleRedeem(card)}
            >
              Redeem Voucher
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
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
      <h6
        style={{
          textAlign: "right",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Points - {rewardPoints}
      </h6>

      {!submitSuccess && (
        <div>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Voucher Details
          </h4>
          <div className="grid">{voucherData.map(voucherCard)}</div>
        </div>
      )}

      {submitSuccess && (
        <div>
          <h6
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            Your voucher redeem request has been successfully submitted and you
            will receive voucher details via registered email within 1 working
            day.
          </h6>
          <div
            style={{ marginTop: "1%", justifyContent: "center" }}
            className="text-center d flex"
          >
            <Button variant="primary" type="submit" onClick={handleGoBack}>
              Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardStore;
