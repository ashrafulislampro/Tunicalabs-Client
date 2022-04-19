import { useState } from "react";
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./StudentTable.css";


const StudentTable = ({ stInfo, handleEditButton, handleDeleteButton }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);

  const lastIndex = currentPage * userPerPage;
  const fastIndex = lastIndex - userPerPage;

  console.log(currentPage, lastIndex, fastIndex);

  const allUser = stInfo.slice(fastIndex, lastIndex);

  console.log(currentPage);



  const numbers = [];
  for(let i = 1; i< stInfo.length / userPerPage;  i++){
     numbers.push(i);
  }
  
  return (
    <div>
      <Table id="table-to-xls" striped bordered hover>
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
          {allUser &&
            allUser.map((data, index) => (
              <tr key={index}>
                  {currentPage === 1 && <td>{(index + 1)}</td>}
                  {currentPage === 2 && <td>{(index + 1) + 10}</td>}
                  {currentPage === 3 && <td>{(index + 1) + 20}</td>}
                  {currentPage === 4 && <td>{(index + 1) + 30}</td>}
                  {currentPage === 5 && <td>{(index + 1) + 40}</td>}
                  {currentPage === 6 && <td>{(index + 1) + 50}</td>}
                  {currentPage === 8 && <td>{(index + 1) + 60}</td>}
                  {currentPage === 9 && <td>{(index + 1) + 70}</td>}
                  {currentPage === 10 && <td>{(index + 1) + 80}</td>}
                <td>{data.name}</td>
                <td>{data.date}</td>
                <td>{data.school}</td>
                <td>{data.class}</td>
                <td>{data.divison}</td>
                <td>{data.radio}</td>
                <td onClick={() => handleEditButton(data._id)} className="edit">
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

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            
          {numbers.map((number, index)=> (
            <li onClick={()=> setCurrentPage(number)} className={ number === currentPage ? "page-item active" : "page-item"} key={index}>
              <p className="page-link">{number}</p>
          </li>
          )
          )}
            
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default StudentTable;
