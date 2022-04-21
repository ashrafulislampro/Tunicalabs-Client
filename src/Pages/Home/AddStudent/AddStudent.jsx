import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import popupSuccess from "../../Popup/popupSuccess";
import "./AddStudent.css";

const AddStudent = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    const date = new Date();
    const presentYear = date.getFullYear();
    const DOBYear = parseInt(data.date);
    const age = presentYear - DOBYear;
    const newEvent = {
    name : data.name,
    school : data.school,
    class : data.class,
    radio : data.radio,
    divison : data.divison,
    age : age
  }
  console.log(data)
  console.log(newEvent)
    
  await  axios
    .post("https://obscure-tundra-19737.herokuapp.com/addEvent", newEvent)
    .then(data => {
      const isAdded = data.data.insertedId;
      if(isAdded){
        popupSuccess("new event")
        reset();
      }
      
    })
    
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="activeStyle">Add Student</h2>
          <div className="">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="mb-3"
                controlId="formGroupEmail"
              >
                <div className="each_part">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="input-field"
                  {...register("name", { required: true })}
                />
                </div>
                {errors.name?.type === "required" && (
                  <small className="required-text text-center">Name is required</small>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formGroupPassword"
              >
                <div className="each_part">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">
                  Date Of Birth
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Your Age"
                  className="input-field"
                  {...register("date", { required: true })}
                />
                </div>
                {errors.date?.type === "required" && (
                  <small className="required-text text-center">Date is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
              <div className="each_part">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">School</Form.Label>
                <Form.Select name="school" className="input-field" aria-label="Default select example" {...register("school", { required: true })}>
                  <option disabled>Select menu</option>
                  <option value="Daripura Model School">Daripura Model School</option>
                  <option value="Shibpur Model School">Shibpur Model School</option>
                  <option value="Narsingdi Model School">Narsingdi Model School</option>
                  <option value="Dhaka Model School">Dhaka Model School</option>
                </Form.Select>
                </div>
                {errors.school?.type === "required" && (
                  <small className="required-text text-center">School is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
              <div className="each_part">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">Class</Form.Label>
                <Form.Select name="class" className="input-field" aria-label="Default select example" {...register("class", { required: true })}>
                  <option disabled>Select menu</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
                </div>
                {errors.class?.type === "required" && (
                  <small className="required-text text-center">Class is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <div className="each_part">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">Divison</Form.Label>
                <Form.Select name="divison" className="input-field" {...register("divison", { required: true })} aria-label="Default select example">
                  <option disabled>Select menu</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </Form.Select>
                </div>
                {errors.divison?.type === "required" && (
                  <small className="required-text">Divison is required</small>
                )}
              </Form.Group >
              <Form.Group className="mb-5 each_part" {...register("radio", {required: true})} controlId="formHorizontalCheck">
              <Form.Label style={{ fontWeight: "600" }} className="pt-3">Status</Form.Label>
              <div name="radio" className="mt-3 d-flex justify-content-around w-75" >
                <Form.Check type="radio" name="radio" className="form-label" label="Active" value="Active" {...register("radio")}/>
                <Form.Check type="radio" name="radio" className="form-label" label="Invoice" value="Invoice" {...register("radio")}/>
              </div>
              </Form.Group>
              <Form.Group className="text-center" controlId="formHorizontalCheck">
                <button className="btn-customs" type="submit">
                  Save
                </button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
