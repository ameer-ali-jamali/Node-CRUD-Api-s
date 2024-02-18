import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteRecords, BASE_URL } from "../../../helper";

const Card = ({ empData, handleEdit, handleReRender }) => {
  const [employeeDataState, setEmployeeDataState] = useState(empData);

  const [dropDown, setDropdown] = useState(false);

  const handleDelete = async (id) => {
    try {
      const res = await deleteRecords(`/employee/${id}`);
      handleReRender();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card-component">
      <div className="card-inner">
        <div className="dropdownContainer">
          <BsThreeDotsVertical
            size={20}
            onClick={() => setDropdown(!dropDown)}
          />
          {dropDown && (
            <ul className="dropdown" onMouseLeave={() => setDropdown(false)}>
              <li onClick={() => handleEdit(empData._id)}>Edit</li>
              <li onClick={() => handleDelete(empData._id)}>Delete</li>
            </ul>
          )}
        </div>
        <div className="profileImage">
          <img
            src={BASE_URL + employeeDataState?.profilePic}
            alt={employeeDataState?.name}
          />
        </div>
        <div className="emp-detail">
          <h3>{employeeDataState?.name}</h3>
          <p>{employeeDataState?.email}</p>
        </div>
      </div>
      <div className="job-role">
        <p>{employeeDataState?.role}</p>
      </div>
    </div>
  );
};

export default Card;
