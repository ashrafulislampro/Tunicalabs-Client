import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { GiSaveArrow } from "react-icons/gi";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { RingLoader } from "react-spinners";
import Swal from "sweetalert2";
import popupSuccess from "../../Popup/popupSuccess";
import ModalPopup from "./ModalPopup";
import "./ViewStudent.css";

const ViewStudent = () => {
  const [stInfo, setStInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [eventId, setEventId] = useState(null);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setLoading(true);
    /* -------------------------------------------------------------------------- */
    /*                     LOAD ALL STUDENT INFO FUNCTIONALITY                    */
    /* -------------------------------------------------------------------------- */
    setTimeout(() => {
      axios.get("http://localhost:5000/events").then((data) => {
        setStInfo(data.data);
        setLoading(false);
      });
    }, 1500);
  }, []);
  //
  const activeStyle = {
    color: "#fc5b62",
    fontWeight: "800",
    backgroundColor: "transparent",
    marginBottom: "10px",
  };

  /* -------------------------------------------------------------------------- */
  /*                     DELETE A STUDENT INFO FUNCTIONALITY                    */
  /* -------------------------------------------------------------------------- */
  const handleDeleteButton = (id) => {
    console.log("Delete Id", id);
    Swal.fire({
      title: "Do you want to delete this student info?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/remove_info/${id}`).then((data) => {
          console.log(data);
          const isDeleted = data.data.deletedCount;

          if (isDeleted) {
            popupSuccess("removed");
            const remaining = stInfo.filter((events) => events._id !== id);
            setStInfo(remaining);
          }
        });
      }
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                     UPDATE A STUDENT INFO FUNCTIONALITY                    */
  /* -------------------------------------------------------------------------- */
  const handleEditButton = (id) => {
    setEventId(id);

    Swal.fire({
      title: "Do you want to change this Student Info?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setShow(true);
      }
    });
  };

  return (
    <section>
      <h2 style={activeStyle}>View Student</h2>
      <ModalPopup
        eventId={eventId}
        handleClose={handleClose}
        show={show}
      ></ModalPopup>
      {loading ? (
        <div className="spinner-box">
          <RingLoader color="#fc5b62" />
        </div>
      ) : (
        <div className="">
          <div className=" mb-3">
            <Form className="d-flex">
              <Form.Group className="mb-3 me-3" controlId="formGroupEmail">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="fields"
                />
              </Form.Group>
              <Form.Group className="mb-3 me-3" controlId="formGroupPassword">
                <Form.Control
                  type="number"
                  placeholder="Your Age"
                  className="fields"
                />
              </Form.Group>
              <Form.Group className="mb-3 me-3" controlId="formGroupPassword">
                <Form.Select
                  name="school"
                  className="fields"
                  aria-label="Default select example"
                >
                  <option>School</option>
                  <option value="Daripura Model School">
                    Daripura Model School
                  </option>
                  <option value="Shibpur Model School">
                    Shibpur Model School
                  </option>
                  <option value="Narsingdi Model School">
                    Narsingdi Model School
                  </option>
                  <option value="Dhaka Model School">Dhaka Model School</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 me-3" controlId="formGroupPassword">
                <Form.Select
                  name="class"
                  className="fields"
                  aria-label="Default select example"
                >
                  <option>Class</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 me-3 " controlId="formGroupPassword">
                <Form.Select
                  name="divison"
                  className="fields"
                  aria-label="Default select example"
                >
                  <option>Divison</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="C">D</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formHorizontalCheck">
                <button className="fields-btn">Search</button>
              </Form.Group>
            </Form>
          </div>

          {/* TABLE IS START */}

          <Table striped bordered hover>
            <thead className="table_header">
              <tr>
                <th>ID'V</th>
                <th>Name</th>
                <th>Age</th>
                <th>School</th>
                <th>Class</th>
                <th>Divison</th>
                <th colSpan={3}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stInfo.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.date}</td>
                  <td>{data.school}</td>
                  <td>{data.class}</td>
                  <td>{data.divison}</td>
                  <td>{data.radio}</td>
                  <td
                    onClick={() => handleEditButton(data._id)}
                    className="edit"
                  >
                    Edit
                  </td>
                  <td
                    onClick={() => handleDeleteButton(data._id)}
                    className="delete"
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <button className="download_btn">
              Download Excel{" "}
              <span className="icons">
                {" "}
                <GiSaveArrow />
              </span>
            </button>
            <div className="d-flex">
              <span className="icon me-3">
                <RiArrowLeftSLine />
              </span>
              <div className="number d-flex justify-content-between">
                <p className="number1">1</p>
                <p className="number2">2</p>
                <p className="number3">3</p>
              </div>
              <span className="icon">
                <RiArrowRightSLine />
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewStudent;
