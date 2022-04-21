import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useHistory } from "react-router-dom";
import { RingLoader } from "react-spinners";
import Swal from "sweetalert2";
import popupSuccess from "../../Popup/popupSuccess";
import "./ViewStudent.css";

const ViewStudent = () => {
  const [stInfo, setStInfo] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const [text, setText] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [name, setName] = useState('');

  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    /* -------------------------------------------------------------------------- */
    /*                     LOAD ALL STUDENT INFO FUNCTIONALITY                    */
    /* -------------------------------------------------------------------------- */
    setTimeout(async () => {
      await axios.get("https://obscure-tundra-19737.herokuapp.com/events").then((data) => {
        setStInfo(data.data);
        setPaginatedData(_(data.data).slice(0).take(pageSize).value());
        setLoading(false);
      });
    }, 1500);
  }, []);

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
      if (result.isConfirmed) {
        await axios
          .delete(`https://obscure-tundra-19737.herokuapp.com/remove_info/${id}`)
          .then((data) => {
            console.log(data);
            const isDeleted = data.data.deletedCount;

            if (isDeleted) {
              popupSuccess("removed");
              const remaining = paginatedData.filter(
                (events) => events._id !== id
              );
              setPaginatedData(remaining);
            }
          });
      }
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                     UPDATE A STUDENT INFO FUNCTIONALITY                    */
  /* -------------------------------------------------------------------------- */
  const handleEditButton = (id) => {
    history.push(`/edit/${id}`);
    Swal.fire({
      title: "Do you want to change this Student Info?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
  };

  /* -------------------------------------------------------------------------- */
  /*        SEARCH FIELD FOR FILTERING STUDENT INFO FUNCTIONALITY               */
  /* -------------------------------------------------------------------------- */
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const newEvent = {
      school: data.school,
      class: data.class,
      divison: data.divison,
      age: data.age,
    };
    const dd = parseInt(newEvent.age);
    console.log(typeof dd);
    const result = stInfo.filter(
      (item) => (parseInt(item.age) === parseInt(newEvent.age)) || (item.school.toLowerCase() === newEvent.school.toLowerCase()) || (parseInt(item.class) === parseInt(newEvent.class)) || (item.divison.toLowerCase() === newEvent.divison.toLowerCase()) 
    );
    setPaginatedData(result);
    reset();
  };

  // console.log("h", suggest.slice(0, 10));

  const handleSearchField = async (name) => {
    
    let matches = [];

    if (name.length > 0) {
      matches = stInfo.filter((title) => {
        const regex = new RegExp(`${name}`, "");
        return title.name.match(regex);
      });
    }
    setText(name);
    setSuggest(matches);
  };
  const handleText = (event) =>{
    setName(event);
    const result = stInfo.filter((item) => item.name.toLowerCase() === event.toLowerCase());
    setPaginatedData(result);
    console.log(result)

    if(result.length > 0){
      document.getElementById("suggested_item").style.display= "none";
      document.getElementById("input_search").value=event;
      
    }
  }

  /*-----------------------------------------------------------------------------*/
  /*                                     pagination functionality                */
  /*-----------------------------------------------------------------------------*/

  const pageCount = stInfo ? Math.ceil(stInfo.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const handlePagination = (pageno) => {
    setCurrentPage(pageno);
    const startIndex = (pageno - 1) * pageSize;
    const paginatedData = _(stInfo).slice(startIndex).take(pageSize).value();
    setPaginatedData(paginatedData);
  };

  return (
    <section className="container view_section">
      <h2 className="activeStyle">View Student</h2>
      {loading ? (
        <div className="spinner-box">
          <RingLoader color="#fc5b62" />
        </div>
      ) : (
        <div>
          {/* SEARCH FIELD START */}
          <div className="mb-3">
            <Form className="row row-cols-2 row-cols-md-3 row-cols-lg-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="col mt-2">
                <Form.Group className="" controlId="formGroupEmail">
                  <input
                    type="text"
                    onChange={(e) => handleSearchField(e.target.value)}
                    className="fields form-control"
                    placeholder="Name"
                    defaultValue={name}
                    id="input_search"
                    name=""
                  />
                </Form.Group>
                {text ? suggest.length !== 0 && (
                  <div id="suggested_item" className="details_search_item">
                    {suggest?.slice(0, 10)?.map(({ name, path, index }) => (
                      <div className="input_items " key={index}>
                        <p onClick={()=> handleText(name)} className="pt-2">{name}</p>
                      </div>
                    ))}
                  </div>
                ) : ''}
              </div>
              <Form.Group className="col mt-2" controlId="formGroupPassword">
                <Form.Control
                  type="number"
                  placeholder="Your Age"
                  className="fields"
                  {...register("age")}
                />
              </Form.Group>
              <Form.Group className="col mt-2" controlId="formGroupPassword">
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
              <Form.Group className="col mt-2" controlId="formGroupPassword">
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
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col mt-2" controlId="formGroupPassword">
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
                  <option value="D">D</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col mt-2" controlId="formHorizontalCheck">
                <button className="fields-btn" type="submit">
                  Search
                </button>
              </Form.Group>
            </Form>
          </div>
          {/* SEARCH FIELD END */}

          {/* TABLE IS START */}
          <Table id="table-to-xls" striped bordered responsive hover>
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
              {paginatedData &&
                paginatedData.map((data, index) => (
                  <tr key={index}>
                    {currentPage === 1 && <td>{index + 1}</td>}
                    {currentPage === 2 && <td>{index + 1 + 10}</td>}
                    {currentPage === 3 && <td>{index + 1 + 20}</td>}
                    {currentPage === 4 && <td>{index + 1 + 30}</td>}
                    {currentPage === 5 && <td>{index + 1 + 40}</td>}
                    {currentPage === 6 && <td>{index + 1 + 50}</td>}
                    {currentPage === 7 && <td>{index + 1 + 60}</td>}
                    {currentPage === 8 && <td>{index + 1 + 70}</td>}
                    {currentPage === 9 && <td>{index + 1 + 80}</td>}
                    {currentPage === 10 && <td>{index + 1 + 90}</td>}
                    <td className="text-nowrap">{data.name}</td>
                    <td className="text-nowrap">{data.age}</td>
                    <td className="text-nowrap">{data.school}</td>
                    <td className="text-nowrap">{data.class}</td>
                    <td className="text-nowrap">{data.divison}</td>
                    <td className="text-nowrap">{data.radio}</td>
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
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download_btn"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download Excel  ⬇️"
            ></ReactHTMLTableToExcel>

            <nav>
              <ul className="pagination">
                {pages.map((number, index) => (
                  <li
                    onClick={() => handlePagination(number)}
                    className={
                      number === currentPage ? "page-item active" : "page-item"
                    }
                    key={index}
                  >
                    <p className="page-link">{number}</p>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* TABLE IS END */}
        </div>
      )}
    </section>
  );
};

export default ViewStudent;
