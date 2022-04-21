import React from 'react';
import AddStudent from './AddStudent/AddStudent';
import Sidebar1 from './AddStudent/Sidebar1';
import Sidebar from './ViewStudent/Sidebar';
import ViewStudent from './ViewStudent/ViewStudent';

const Home = () => {
    const [toggle, setToggle] = React.useState("view");
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-3 col-lg-2 my-4">
                    {toggle === "view" && <Sidebar setToggle={setToggle}></Sidebar>}                   
                    {toggle === "add" && <Sidebar1 setToggle={setToggle}></Sidebar1>}
                </div>
                
                <div className="col-sm-12 col-md-9 col-lg-10 my-4 border_style">
                    {toggle === "view" && <ViewStudent/>}                   
                    {toggle === "add" && <AddStudent/>}
                </div>
            </div>
        </div>
    );
};

export default Home;