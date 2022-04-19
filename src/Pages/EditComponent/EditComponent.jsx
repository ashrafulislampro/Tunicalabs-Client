import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaUserFriends } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useHistory, useParams } from "react-router-dom";
import popupSuccess from "../Popup/popupSuccess";



const EditComponent = () => {
  const [singleData, setSingleData] = useState({});
  const {id} = useParams();
  const history = useHistory();


  const activeStyle = {
    color: "#fc5b62",
    fontWeight: "600",
    backgroundColor: "transparent",
    cursor: "pointer",
  };


  useEffect(() => {
    const singleStu = async () =>{
    await axios
    .get(`https://obscure-tundra-19737.herokuapp.com/singleData/${id}`)
    .then((data)=> {
      console.log(data.data)
      setSingleData(data.data);
    })
    .catch((err) => console.log(err.message));
    }
    singleStu();
  },[id])

  const handleButton = () => {
    history.push("/");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newEvent = {
    name : data.name,
    school : data.school,
    class : data.class,
    radio : data.radio,
    divison : data.divison,
    age : data.age
  }
  
  await axios
  .put(`https://obscure-tundra-19737.herokuapp.com/update_info/${id}`, newEvent)
  .then((data) => {
    console.log(data)
    const isUpdated = data.data.modifiedCount;
    if(isUpdated){
      popupSuccess("update");
      setSingleData({});
      reset();
    }
  });
  
  
}
const School = "School";
const Class = "Class";
const Divison = "Divison";




  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-2 col-lg-2 my-4">
          <div>
            <div className="d-flex justify-content-between">
              <h4 className="fw-bold">STUDENT</h4>
              <span className="fw-bold">
                <IoIosArrowDown />
              </span>
            </div>
            <div
              onClick={handleButton}
              style={activeStyle}
              className="d-flex mt-4"
            >
              <span className="me-3">
                <FaUserFriends />
              </span>
              <p>View Student</p>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-10 col-lg-10 my-4 border-start">
            <div className="col-6">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: "600" }}>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  defaultValue={singleData?.name}
                  className="input-fields"
                  autoFocus
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <small className="required-text text-center">Name is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: "600" }}>Date Of Birth</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Your Age"
                  defaultValue={singleData?.age}
                  className="input-fields"
                  {...register("age", { required: true })}
                />
                {errors.date?.type === "required" && (
                  <small className="required-text text-center">Date is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: "600" }}>School</Form.Label>
                <Form.Select name="school" className="input-fields" aria-label="Default select example" {...register("school", { required: true })}>
                  <option >{singleData?.school ? singleData?.school : School }</option>
                  <option value="Daripura Model School">Daripura Model School</option>
                  <option value="Shibpur Model School">Shibpur Model School</option>
                  <option value="Narsingdi Model School">Narsingdi Model School</option>
                  <option value="Dhaka Model School">Dhaka Model School</option>
                </Form.Select>
                {errors.select?.type === "required" && (
                  <small className="required-text text-center">Selection is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: "600" }}>Class</Form.Label>
                <Form.Select name="class" className="input-fields" aria-label="Default select example" {...register("class", { required: true })}>
                  <option >{singleData?.class? singleData?.class : Class}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                </Form.Select>
                {errors.select?.type === "required" && (
                  <small className="required-text text-center">Selection is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: "600" }}>Divison</Form.Label>
                <Form.Select name="divison" className="input-fields" aria-label="Default select example" {...register("divison", { required: true })}>
                  <option>{singleData?.divison? singleData?.divison : Divison}</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="C">D</option>
                </Form.Select>
                {errors.select?.type === "required" && (
                  <small className="required-text">Selection is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-5 d-flex justify-content-between" controlId="formHorizontalCheck">
              <Form.Label style={{ fontWeight: "600" }} className="pt-3">Status</Form.Label>
              <div name="radio" className="mt-3 d-flex justify-content-around w-75" >
                <Form.Check type="radio" name="radio" className="form-label" label="Active"  value="Active" {...register("radio")}/>
                <Form.Check type="radio" name="radio" className="form-label" label="Invoice" value="Invoice" {...register("radio")}/>
              </div>
              </Form.Group>
              <Button variant="primary" className="w-100 btn-custom" type="submit">
              Save Changes
            </Button>
            </Form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
