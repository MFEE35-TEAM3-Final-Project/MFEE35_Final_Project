import React from "react";
import { Link } from "react-router-dom";

const UserProfiles = () => {
  return (
    <div>
      <div className="fs-1 text-danger">這是個人資料編輯頁</div>
      <Link className="btn btn-success" to="/user/selfies">
        /user/selfies
      </Link>
    </div>
  );
};

export default UserProfiles;
