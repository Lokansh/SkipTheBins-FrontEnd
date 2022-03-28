import React, { useState, Fragment } from "react";
import "./ContactUs.css";
//import { nanoid } from "nanoid";
import allVendorData from "../../assets/data/contactUsVendors.json";
import { Table, Form, Button } from "react-bootstrap";
import AdminModifyVendorReadOnly from "./AdminModifyVendorReadOnly";
import AdminModifyVendorEditable from "./AdminModifyVendorEditable";
import ContactUs from "./ContactUs";

function AdminModifyVendors() {
  const [vendors, setVendors] = useState(allVendorData.vendorData);
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
      //id: nanoid(),
      name: addFormData.name,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newVendors = [...vendors, newVendor];
    setVendors(newVendors);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedVendor = {
      id: editVendorId,
      name: editFormData.name,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newVendors = [...vendors];

    const index = vendors.findIndex((vendor) => vendor.id === editVendorId);

    newVendors[index] = editedVendor;
    setVendors(newVendors);
    setEditVendorId(null);
  };

  const handleEditClick = (e, vendor) => {
    e.preventDefault();
    setEditVendorId(vendor.id);

    const formValues = {
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

  const handleDeleteClick = (vendorId) => {
    const newVendors = [...vendors];

    const index = vendors.findIndex((vendor) => vendor.id === vendorId);

    newVendors.splice(index, 1);

    setVendors(newVendors);
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
              <Fragment>
                {editVendorId === vendor.id ? (
                  <AdminModifyVendorEditable
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <AdminModifyVendorReadOnly
                    vendor={vendor}
                    index={index}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
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
