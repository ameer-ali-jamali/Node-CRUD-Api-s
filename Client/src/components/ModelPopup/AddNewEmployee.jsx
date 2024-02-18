import React, { useState } from "react";
import "./ModelPopup.css";
import { useFormik } from "formik";
import { postRecords } from "../../helper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import ImageUpload from "./ImageUpload";

const ModelPopup = ({ showModal, closeModal }) => {
  const [isProfilePic, setIsProfilePic] = useState(false);

  const createEmployee = async (values) => {
    try {
      const res = await postRecords("/employee", values);
      if (res?.data?.status) {
        window.location.reload();
      } else if (
        res?.data?.status === false &&
        res?.data?.message ===
          "Email already exists. Please choose a different email."
      ) {
        window.alert(res?.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formikFormData = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      profilePic: "/uploads/default-dp.png",
      role: "",
    },
    onSubmit: (values) => {
      createEmployee(values);
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

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setFieldValue("profilePic", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsProfilePic(reader.result);
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
                {isProfilePic ? (
                  <center className="mt-28">
                    <div className="dp-container mt-3">
                      <img src={isProfilePic} alt="" className="objectFit" />
                    </div>
                  </center>
                ) : null}
                <div className="modalInner mt-0 ">
                  <div className="input-container">
                    <div className="input-box">
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
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
                  <div className="footerButtons">
                    <Modal.Footer className="footerButtonsGap">
                      <Button className="cancel-btn" onClick={closeModal}>
                        Close
                      </Button>
                      <Button className="primary-btn" type="submit">
                        Submit
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

export default ModelPopup;
