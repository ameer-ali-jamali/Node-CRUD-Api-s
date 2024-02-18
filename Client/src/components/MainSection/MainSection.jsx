import React, { useEffect, useState } from "react";
import "./MainSection.css";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Card from "./components/Card";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getRecords, deleteRecords, BASE_URL } from "../../helper";
import EditDetailsModal from "../ModelPopup/EditDetailsModal";
import AddNewEmployee from "../ModelPopup/AddNewEmployee";

const MainSection = () => {
  const [isEditModel, setIsEditModal] = useState(false);
  const [isAddNewEmployeeModel, setIsAddNewEmployeeModel] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [searchState, setSearchState] = useState("");
  const [dropDown, setDropdown] = useState(false);
  const [dropdownStates, setDropdownStates] = useState(
    Array(employees?.length).fill(false)
  );

  const getAllEmployee = async () => {
    try {
      const result = await getRecords("/employee");
      setEmployees(result?.data?.data);
      setAllRecords(result?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditEmployeeDetails = (e, row) => {
    e?.preventDefault();
    setIsEditModal(row);
  };
  const handleAddNewEmployee = (e) => {
    e?.preventDefault();
    setIsAddNewEmployeeModel(true);
  };

  const handleCloseEditEmployeeDetails = (e) => {
    e?.preventDefault();
    setIsEditModal(false);
  };

  const handleCloseAddNewEmployeeModel = (e) => {
    e?.preventDefault();
    setIsAddNewEmployeeModel(false);
  };

  const handleDelete = async (row) => {
    try {
      await deleteRecords(`/employee/${row?._id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteModel = async (e, row) => {
    e?.preventDefault();
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      console.log("Deleting...");
      handleDelete(row);
    } else {
      console.log("Deletion canceled.");
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  useEffect(() => {
    if (searchState !== "") {
      const filteredEmployees = allRecords?.filter((record) =>
        record?.name?.toLowerCase().includes(searchState?.toLowerCase())
      );
      console.log("Filtered employees:", filteredEmployees);
      setEmployees(filteredEmployees);
    } else {
      setEmployees(allRecords);
    }
  }, [searchState, allRecords]);

  const handleSearchChange = (event) => {
    setSearchState(event.target.value);
  };

  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      {isEditModel && (
        <EditDetailsModal
          showModal={isEditModel}
          closeModal={handleCloseEditEmployeeDetails}
          empById={isEditModel}
        />
      )}
      {isAddNewEmployeeModel && (
        <AddNewEmployee
          showModal={isAddNewEmployeeModel}
          closeModal={handleCloseAddNewEmployeeModel}
        />
      )}

      <div className="mainWrapper">
        <h1>
          Employees <span className="emp-count">{employees?.length}</span>
        </h1>
        <div>
          <div className="employeeHeader">
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search by name"
                value={searchState}
                onChange={(e) => handleSearchChange(e)}
              />
              <BiSearch size={20} />
            </div>
            <button
              className="add-btn"
              onClick={(e) => handleAddNewEmployee(e)}
            >
              <IoMdAdd size="20" color="#fffff" />
              Add Employee
            </button>
          </div>
        </div>
        <div className="pd-30">
          <div className="d-grid- mt-35">
            {/* {employees &&
              employees?.map((emp) => {
                return (
                  <div className="card-component" key={emp?._id}>
                    <div className="card-inner">
                      <div className="dropdownContainer">
                        <BsThreeDotsVertical
                          size={20}
                          onClick={() => setDropdown(!dropDown)}
                        />
                        {dropDown && (
                          <ul
                            className="dropdown"
                            onMouseLeave={() => setDropdown(false)}
                          >
                            <li
                              onClick={(e) => handleEditEmployeeDetails(e, emp)}
                            >
                              Edit
                            </li>
                            <li onClick={(e) => handleDeleteModel(e, emp)}>
                              Delete
                            </li>
                          </ul>
                        )}
                      </div>
                      <div className="profileImage">
                        <img src={BASE_URL + emp?.profilePic} alt={emp?.name} />
                      </div>
                      <div className="emp-detail">
                        <h3>{emp?.name}</h3>
                        <p>{emp?.email}</p>
                      </div>
                    </div>
                    <div className="job-role">
                      <p>{emp?.role}</p>
                    </div>
                  </div>
                );
              })} */}

            {employees?.map((emp, index) => (
              <div className="card-component" key={emp?._id}>
                <div className="card-inner">
                  <div className="dropdownContainer">
                    <BsThreeDotsVertical
                      size={20}
                      onClick={() => toggleDropdown(index)}
                    />
                    {dropdownStates[index] && (
                      <ul
                        className="dropdown"
                        onMouseLeave={() => toggleDropdown(index)}
                      >
                        <li onClick={(e) => handleEditEmployeeDetails(e, emp)}>
                          Edit
                        </li>
                        <li onClick={(e) => handleDeleteModel(e, emp)}>
                          Delete
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="profileImage">
                    <img src={BASE_URL + emp?.profilePic} alt={emp?.name} />
                  </div>
                  <div className="emp-detail">
                    <h3>{emp?.name}</h3>
                    <p>{emp?.email}</p>
                  </div>
                </div>
                <div className="job-role">
                  <p>{emp?.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;
