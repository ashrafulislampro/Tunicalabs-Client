import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import popupSuccess from "../../Popup/popupSuccess";
import "./AddStudent.css";

const AddStudent = () => {
  const activeStyle = {
    color: "#fc5b62",
    fontWeight: "800",
    backgroundColor: "transparent",
    marginBottom: "10px"
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newEvent = {
    name : data.name,
    school : data.school,
    class : data.class,
    radio : data.radio,
    divison : data.divison,
    date : data.date
  }
    console.log(data);
    
    axios
    .post("http://localhost:5000/addEvent", newEvent)
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
        <div className="col-6">
          <h2 style={activeStyle}>Add Student</h2>
          <div className="">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="mb-3"
                controlId="formGroupEmail"
              >
                <div className="d-flex justify-content-between">
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
                <div className="d-flex justify-content-between">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">
                  Date Of Birth
                </Form.Label>
                <Form.Control
                  type="number"
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
              <div className="d-flex justify-content-between">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">School</Form.Label>
                <Form.Select name="school" className="input-field" aria-label="Default select example" {...register("school", { required: true })}>
                  <option >Select menu</option>
                  <option value="Daripura Model School">Daripura Model School</option>
                  <option value="Shibpur Model School">Shibpur Model School</option>
                  <option value="Narsingdi Model School">Narsingdi Model School</option>
                  <option value="Dhaka Model School">Dhaka Model School</option>
                </Form.Select>
                </div>
                {errors.select?.type === "required" && (
                  <small className="required-text text-center">Selection is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
              <div className="d-flex justify-content-between">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">Class</Form.Label>
                <Form.Select name="class" className="input-field" aria-label="Default select example" {...register("class", { required: true })}>
                  <option >Select menu</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                </Form.Select>
                </div>
                {errors.select?.type === "required" && (
                  <small className="required-text text-center">Selection is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <div className="d-flex justify-content-between">
                <Form.Label style={{ fontWeight: "600" }} className="pt-3">Divison</Form.Label>
                <Form.Select name="divison" className="input-field" aria-label="Default select example" {...register("divison", { required: true })}>
                  <option >Select menu</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="C">D</option>
                </Form.Select>
                </div>
                {errors.select?.type === "required" && (
                  <small className="required-text">Selection is required</small>
                )}
              </Form.Group >
              <Form.Group className="mb-5 d-flex justify-content-between" controlId="formHorizontalCheck">
              <Form.Label style={{ fontWeight: "600" }} className="pt-3">Status</Form.Label>
              <div name="radio" className="mt-3 d-flex justify-content-around w-75" >
                <Form.Check type="radio" name="radio" className="form-label" label="Active" value="Active" {...register("radio")}/>
                <Form.Check type="radio" name="radio" className="form-label" label="Invoice" value="Invoice" {...register("radio")}/>
              </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formHorizontalCheck">
                <button className="w-100 btn-custom" type="submit">
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
