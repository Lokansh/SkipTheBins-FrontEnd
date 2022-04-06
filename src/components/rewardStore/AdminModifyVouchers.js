import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "./RewardStore.css";
import { Table, Form, Button } from "react-bootstrap";
import AdminModifyVoucherReadOnly from "./AdminModifyVoucherReadOnly";
import AdminModifyVoucherEditable from "./AdminModifyVoucherEditable";
import { toast } from "react-toastify";
import API from "../../api";
import { WEB_API_URL } from "../../constants";

import { useNavigate } from "react-router-dom";

function AdminModifyVouchers() {
  const [companyNameErrorMsg, setCompanyNameErrorMsg] = useState("");
  const [valueErrorMsg, setValueErrorMsg] = useState("");
  const [pointsErrorMsg, setPointsErrorMsg] = useState("");
  const [isCompanyName, setIsCompanyName] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [isPoints, setIsPoints] = useState(false);
  const [isData, setIsData] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    getAllVouchersApiCall();
  }, []);

  const getAllVouchersApiCall = () => {
    axios
      .get(WEB_API_URL + "/voucher") /////////////
      .then((res) => {
        setVouchers(res.data.voucherData); /////////////
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const [addFormData, setAddFormData] = useState({
    companyName: "",
    value: "",
    points: "",
  });

  const [editFormData, setEditFormData] = useState({
    companyName: "",
    value: "",
    points: "",
  });

  const [editVoucherId, setEditVoucherId] = useState(null);

  const handleFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    if (fieldName === "companyName") {
      if (fieldValue === "") {
        setCompanyNameErrorMsg(
          "Please provide name in correct alphabet only format (Eg. 'Walmart')"
        );
        setIsCompanyName(false);
      } else {
        setIsData(true);
        setIsCompanyName(true);
        setCompanyNameErrorMsg("");
      }
    }
    if (fieldName === "value") {
      if (fieldValue === "") {
        setValueErrorMsg("Please provide voucher value");
        setIsValue(false);
      } else {
        setIsData(true);
        setIsValue(true);
        setValueErrorMsg("");
      }
    }
    if (fieldName === "points") {
      if (fieldValue === "") {
        setPointsErrorMsg("Please provide voucher points");
        setIsPoints(false);
      } else {
        setIsData(true);
        setIsPoints(true);
        setPointsErrorMsg("");
      }
    }

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newVoucher = {
      companyName: addFormData.companyName,
      value: addFormData.value,
      points: addFormData.points,
    };

    if (
      companyNameErrorMsg.length > 0 ||
      valueErrorMsg.length > 0 ||
      pointsErrorMsg.length > 0
    ) {
      toast.error("Please resolve error");
    } else if (!isData) {
      toast.error("Please enter some data");
    } else if (!isCompanyName || !isValue || !isPoints) {
      toast.error("Please fill data in all fields of the form");
    } else {
      submitVoucherApiCall(newVoucher);
    }
  };

  const submitVoucherApiCall = (newVoucher) => {
    axios
      .post(WEB_API_URL + "/voucher/add", newVoucher)
      .then((res) => {
        if (res.data.success) {
          toast.success("Vendor Added");
          getAllVouchersApiCall();
          setAddFormData({
            companyName: "",
            value: "",
            points: "",
          });
          const form = document.getElementById("my_form");
          form.reset();
        } else {
          toast.error("Voucher not added");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedVoucher = {
      _id: editVoucherId,
      companyName: editFormData.companyName,
      value: editFormData.value,
      points: editFormData.points,
    };

    editVoucherApiCall(editedVoucher);
  };

  const editVoucherApiCall = (editedVoucher) => {
    axios
      .post(WEB_API_URL + "/voucher/update", editedVoucher) ///////
      .then((res) => {
        if (res.data.success) {
          toast.success("Voucher Edited");
          getAllVouchersApiCall();
          setEditVoucherId(null);
        } else {
          toast.error("Voucher not edited");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  };

  const handleEditClick = (e, voucher) => {
    e.preventDefault();
    setEditVoucherId(voucher._id);

    const formValues = {
      _id: voucher._id,
      companyName: voucher.companyName,
      value: voucher.value,
      points: voucher.points,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditVoucherId(null);
  };

  const deleteVoucherApiCall = (voucherId) => {
    const deleteId = {
      _id: voucherId,
    };
    axios
      .post(WEB_API_URL + "/voucher/delete", deleteId) ////////////////
      .then((res) => {
        if (res.data.success) {
          toast.success("Voucher Deleted");
          getAllVouchersApiCall();
        } else {
          toast.error("Voucher not deleted");
        }
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
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
      </h1>{" "}
      <h4
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          color: "rgba(17, 45, 92,0.85)",
          marginBottom: "1%",
        }}
      >
        Voucher List
      </h4>
      <Form onSubmit={handleEditFormSubmit}>
        <Table responsive="sm" bordered="true" size="sm" striped="true">
          <thead
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              color: "rgba(17, 45, 92,0.85)",
              marginBottom: "1%",
            }}
          >
            <tr>
              <th>S.No</th>
              <th>Company Name</th>
              <th>Value</th>
              <th>Points</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody
            style={{
              textAlign: "center",
              color: "rgba(17, 45, 92,0.85)",
            }}
          >
            {vouchers.map((voucher, index) => (
              <Fragment key={index}>
                {editVoucherId === voucher._id ? (
                  <AdminModifyVoucherEditable
                    index={index}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <AdminModifyVoucherReadOnly
                    voucher={voucher}
                    index={index}
                    handleEditClick={handleEditClick}
                    deleteVoucherApiCall={deleteVoucherApiCall}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Form>
      <div>
        <h4
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
          }}
        >
          Add a new voucher
        </h4>
        <Form
          id="my_form"
          style={{
            fontWeight: "bolder",
            color: "rgba(17, 45, 92,0.85)",
            marginBottom: "1%",
          }}
        >
          <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Voucher Company Name"
              onChange={handleFormChange}
            />
            <Form.Text style={{ color: "red" }}>
              {companyNameErrorMsg.length > 0 ? companyNameErrorMsg : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="value">
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              placeholder="Voucher Value"
              onChange={handleFormChange}
            />
            <Form.Text style={{ color: "red" }}>
              {valueErrorMsg.length > 0 ? valueErrorMsg : ""}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="points">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="text"
              placeholder="Voucher Points"
              onChange={handleFormChange}
            />
            <Form.Text style={{ color: "red" }}>
              {pointsErrorMsg.length > 0 ? pointsErrorMsg : ""}
            </Form.Text>
          </Form.Group>

          <div
            style={{ marginTop: "1%", justifyContent: "center" }}
            class="text-center d flex"
          >
            <Button variant="success" type="submit" onClick={handleFormSubmit}>
              Add
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AdminModifyVouchers;
