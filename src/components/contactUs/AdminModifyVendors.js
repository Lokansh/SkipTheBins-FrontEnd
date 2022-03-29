import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "./ContactUs.css";
//import allVendorData from "../../assets/data/contactUsVendors.json";
import { Table, Form, Button } from "react-bootstrap";
import AdminModifyVendorReadOnly from "./AdminModifyVendorReadOnly";
import AdminModifyVendorEditable from "./AdminModifyVendorEditable";

function AdminModifyVendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getAllVendorsApiCall();
  }, []);

  const getAllVendorsApiCall = () => {
    axios
      .get("http://localhost:8080/api/vendor")
      .then((res) => {
        //console.log("vendorData-----" + JSON.stringify(res.data.vendorData));
        setVendors(res.data.vendorData);
      })
      .catch((error) => console.log(error));
  };

  const [addFormData, setAddFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editVendorId, setEditVendorId] = useState(null);

  const handleFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

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
    const newVendor = {
      name: addFormData.name,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    //const newVendors = [...vendors, newVendor];

    submitVendorApiCall(newVendor);

    //setVendors(newVendors);
  };

  const submitVendorApiCall = (newVendor) => {
    axios
      .post("http://localhost:8080/api/vendor/add", newVendor)
      .then((res) => {
        if (res.data.success) {
          ///ADD notification of prashit
          console.log("Inside SUCCESS");
          getAllVendorsApiCall();
        } else {
          alert("Vendor not added");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedVendor = {
      _id: editVendorId,
      name: editFormData.name,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    //const newVendors = [...vendors];

    //const index = vendors.findIndex((vendor) => vendor.id === editVendorId);

    //newVendors[index] = editedVendor;
    //setVendors(newVendors);

    editVendorApiCall(editedVendor);

    //setEditVendorId(null);
  };

  const editVendorApiCall = (editedVendor) => {
    axios
      .post("http://localhost:8080/api/vendor/update", editedVendor)
      .then((res) => {
        if (res.data.success) {
          ///ADD notification of Prashit
          //console.log("res--" + JSON.stringify(res));
          getAllVendorsApiCall();
          setEditVendorId(null);
        } else {
          alert("Vendor not added");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEditClick = (e, vendor) => {
    e.preventDefault();
    setEditVendorId(vendor._id);

    const formValues = {
      _id: vendor._id,
      name: vendor.name,
      address: vendor.address,
      phoneNumber: vendor.phoneNumber,
      email: vendor.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditVendorId(null);
  };

  const deleteVendorApiCall = (vendorId) => {
    const deleteId = {
      _id: vendorId,
    };
    axios
      .post("http://localhost:8080/api/vendor/delete", deleteId)
      .then((res) => {
        if (res.data.success) {
          ///ADD notification of Prashit
          console.log("res--" + JSON.stringify(res));
          console.log("Inside SUCCESS");
          getAllVendorsApiCall();
        } else {
          alert("Vendor not deleted");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contactContainer">
      <span className="contact-heading">Contact Us</span>
      <span>Vendors List</span>
      <Form onSubmit={handleEditFormSubmit}>
        <Table responsive="sm" bordered="true" size="sm" striped="true">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <Fragment key={index}>
                {editVendorId === vendor._id ? (
                  <AdminModifyVendorEditable
                    index={index}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <AdminModifyVendorReadOnly
                    vendor={vendor}
                    index={index}
                    handleEditClick={handleEditClick}
                    deleteVendorApiCall={deleteVendorApiCall}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Form>
      <div>
        <h3>Add a new Vendor</h3>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Name"
              onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Address"
              onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Phone Number"
              onChange={handleFormChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Vendor Email"
              onChange={handleFormChange}
            />
          </Form.Group>
          <Button variant="success" type="submit" onClick={handleFormSubmit}>
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminModifyVendors;
