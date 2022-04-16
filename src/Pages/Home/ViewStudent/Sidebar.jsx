import React from 'react';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
const Sidebar = ({setToggle}) => {

    const activeStyle = {
        color: "#fc5b62",
        fontWeight: "600",
        backgroundColor: "transparent",
        cursor: "pointer"
      };
      
    return (
        <div>
            <div className="d-flex justify-content-between">
            <h4 className="fw-bold">STUDENT</h4>
            <span className="fw-bold"><IoIosArrowDown/></span>
            </div>
            <div onClick={() => setToggle("view")} style={activeStyle} className="d-flex mt-4">
                        <span className="me-3"><FaUserFriends/></span>
                        <p>View Student</p>
            </div>
            <div onClick={() => setToggle("add")} style={{cursor: "pointer", fontWeight: "600"}} className="d-flex mt-1">
                        <span className="me-3"><FaUserPlus/></span>
                        <p>Add Student</p>
            </div>
        </div>
    );
};

export default Sidebar;