import React from "react";
import { Link } from "react-router-dom";
const UserSelfies = () => {
  return (
    <div>
      <h2 className="text-white">This is UserSelfies</h2>
      <Link className="btn btn-primary" to="/user/profile">
        /user/profile
      </Link>
    </div>
  );
};

export default UserSelfies;
