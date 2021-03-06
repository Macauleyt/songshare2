import React from "react";
import { Link } from "react-router-dom";

const MainActions = () => {
  return (
    <div class="dash-buttons">
      <Link to="edit-profile" class="btn btn-light">
        <i class="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
    </div>
  );
};

export default MainActions;
