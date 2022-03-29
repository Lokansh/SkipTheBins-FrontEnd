import React, { useEffect, useState } from "react";

import PendingCreation from "./PendingCreation";
import PendingDeletion from "./PendingDeletion";

const AdminProfile = () => {
  return (
    <div>
      <PendingCreation />
      <PendingDeletion />
    </div>
  );
};

export default AdminProfile;
