import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RingLoader } from "react-spinners";
import Swal from "sweetalert2";
import popupSuccess from "../../Popup/popupSuccess";
import ModalPopup from "./ModalPopup";
import StudentTable from "./StudentTable/StudentTable";
import "./ViewStudent.css";


const ViewStudent = () => {
  const [stInfo, setStInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [singleData, setSingleData] = useState({});
  const handleClose = () => setShow(false);

  useEffect(() => {
    setLoading(true);
    /* -------------------------------------------------------------------------- */
    /*                     LOAD ALL STUDENT INFO FUNCTIONALITY                    */
    /* -------------------------------------------------------------------------- */
    setTimeout(() => {
      axios.get("https://obscure-tundra-19737.herokuapp.com/events").then((data) => {
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
    }).then(async (result) => {
      if(result.isConfirmed) {
        await axios
        .delete(`https://obscure-tundra-19737.herokuapp.com/remove_info/${id}`)
        .then((data) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
      await axios
        .get(`https://obscure-tundra-19737.herokuapp.com/singleData/${id}`)
        .then((data)=> {
          console.log(data.data)
          setSingleData(data.data);
        })
        .catch((err) => console.log(err.message));

        setShow(true);
      }
    });
  };
  /* -------------------------------------------------------------------------- */
  /*                     SEARCH FIELD FOR FILTERING STUDENT INFO FUNCTIONALITY                    */
  /* -------------------------------------------------------------------------- */
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const newEvent = {
    name : data.name,
    school : data.school,
    class : data.class,
    divison : data.divison,
    date : data.date
  }
  const result = stInfo.filter((item) => item.name.toLowerCase() === newEvent.name.toLowerCase())
  // const result = await axios(`http://localhost:5000/search?value=${newEvent.name}`);
  // https://obscure-tundra-19737.herokuapp.com/
  setStInfo(result);
  // console.log(result);
  reset();
}
 

console.log(stInfo)
  return (
    <section>
      <h2 style={activeStyle}>View Student</h2>
      <ModalPopup
        singleData={singleData}
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
            <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 me-3" controlId="formGroupEmail">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="fields"
                  {...register("name")}
                />
              </Form.Group>
              <Form.Group className="mb-3 me-3" controlId="formGroupPassword">
                <Form.Control
                  type="number"
                  placeholder="Your Age"
                  className="fields"
                  {...register("date")}
                />
              </Form.Group>
              <Form.Group className="mb-3 me-3" controlId="formGroupPassword">
                <Form.Select
                  name="school"
                  className="fields"
                  aria-label="Default select example"
                  {...register("school")}
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
                  {...register("class")}
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
                  {...register("divison")}
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
                <button className="fields-btn" type="submit">Search</button>
              </Form.Group>
            </Form>
          </div>

          {/* TABLE IS START */}
          <StudentTable stInfo={stInfo} handleEditButton={handleEditButton} handleDeleteButton={handleDeleteButton}></StudentTable>
          {/* TABLE IS END */}
          
        </div>
      )}
    </section>
  );
};

export default ViewStudent;
