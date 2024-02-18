import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import "./ModelPopup.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BASE_URL, postRecords, putRecords } from "../../helper";

const EditDetailsModal = ({ showModal, closeModal, empById, setEditModal }) => {
  const { name, email, password, role, profilePic, createdAt } = empById;
  const [isUpdatedDp, setIsUpdatedDp] = useState(false);
  const [profilePicState, setProfilePicState] = useState(null);

  const formikFormData = useFormik({
    initialValues: {
      name: empById?.name,
      email: empById?.email,
      profilePic: null,
      password: empById?.password,
      role: empById?.role,
    },
    onSubmit: (values) => {
      handleUpdate(values);
    },
  });

  const {
    values,
    setValues,
    handleChange,
    setFieldValue,
    handleBlur,
    resetForm,
    handleSubmit,
  } = formikFormData;

  console.log(formikFormData);

  const handleUpdate = async (values) => {
    try {
      const response = await postRecords(`/employee/${empById?._id}`, values);
      if (response?.data?.status) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("profilePic", file);
      setIsUpdatedDp(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        className="ftcModalPopup editProfileModalPopup suProfileEdit"
      >
        <form action="" onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="modalContainer">
              <div className="modalBox">
                <center className="mt-28">
                  <div className="dp-container mt-3">
                    <img
                      src={
                        isUpdatedDp ? profilePicState : BASE_URL + profilePic
                      }
                      alt=""
                      className="objectFit"
                    />
                  </div>
                </center>
                <div className="modalInner mt-0 ">
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={name}
                        onChange={handleChange}
                        values={values?.name}
                      />
                    </div>
                  </div>
                  <div className="input-box cr-pointer">
                    <label htmlFor="">Profile Picture</label>
                    <input
                      type="file"
                      name="profilepic"
                      onChange={handleChangeImage}
                    />
                  </div>
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        defaultValue={email}
                        onChange={handleChange}
                        values={values?.email}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="">Password</label>
                      <input
                        type="text"
                        name="password"
                        required
                        defaultValue={password}
                        onChange={handleChange}
                        values={values?.password}
                      />
                    </div>
                  </div>
                  <div className="input-box">
                    <label htmlFor="">Job-position</label>
                    <input
                      type="text"
                      name="role"
                      required
                      onChange={handleChange}
                      values={values?.role}
                    />
                  </div>
                  <div className="input-box">
                    <label htmlFor="">Date of Joining</label>
                    <input
                      type="text"
                      name="createdAt"
                      required
                      onChange={handleChange}
                      value={moment(createdAt).format("LLL")}
                      disabled
                    />
                  </div>
                  <div className="footerButtons">
                    <Modal.Footer className="footerButtonsGap">
                      <Button className="cancel-btn" onClick={closeModal}>
                        Close
                      </Button>
                      <Button className="primary-btn" type="submit">
                        Update
                      </Button>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
};

export default EditDetailsModal;
