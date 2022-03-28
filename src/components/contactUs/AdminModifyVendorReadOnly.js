import { Button } from "react-bootstrap";
import React from "react";

function AdminModifyVendorReadOnly({
  vendor,
  index,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{vendor.name}</td>
      <td>{vendor.address}</td>
      <td>{vendor.phoneNumber}</td>
      <td>{vendor.email}</td>
      <td>
        <Button
          variant="primary"
          type="button"
          onClick={(event) => handleEditClick(event, vendor)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={() => handleDeleteClick(vendor.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default AdminModifyVendorReadOnly;
