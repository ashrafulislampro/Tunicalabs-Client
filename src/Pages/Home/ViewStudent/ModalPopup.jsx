import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import popupSuccess from "../../Popup/popupSuccess";
const ModalPopup =({show, handleClose, eventId, singleData})=> {
  
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
    // console.log(data);
    axios
    .put(`https://obscure-tundra-19737.herokuapp.com/update_info/${eventId}`, newEvent)
    .then((data) => {
      console.log(data)
      const isUpdated = data.data.modifiedCount;
      if(isUpdated){
        popupSuccess("update");
        reset();
        handleClose();
      }
    })
    .catch((err) => console.log(err.message));
    // reset();
  }
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontWeight: "700", textTransform: "uppercase"}}>Edit Student Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  defaultValue={singleData?.date}
                  className="input-fields"
                  {...register("date", { required: true })}
                />
                {errors.date?.type === "required" && (
                  <small className="required-text text-center">Date is required</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: "600" }}>School</Form.Label>
                <Form.Select name="school" className="input-fields" aria-label="Default select example" {...register("school", { required: true })}>
                  <option >{singleData?.school}</option>
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
                  <option >{singleData?.class}</option>
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
                  <option>{singleData?.divison}</option>
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
{/* onClick={handleClose} */}
              <Button variant="primary" className="w-100 btn-custom" type="submit">
              Save Changes
            </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
export default ModalPopup;