import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./Pages/context/AuthProvider";
import EditComponent from "./Pages/EditComponent/EditComponent";
import Form from "./Pages/Form/Form";
import SignIN from "./Pages/Form/Sign_IN/Sign_IN";
import SignUP from "./Pages/Form/Sign_UP/Sign_UP";
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Navbar/Navbar";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 100,
      duration: 900,
      easing: "ease",
    });
  });
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* <ParticleBackground /> */}
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/edit/:id">
            <EditComponent />
          </PrivateRoute>
          <Route exact path="/form/signin">
            <Form>
              <SignIN></SignIN>
            </Form>
          </Route>
          <Route exact path="/form/signup">
            <Form>
              <SignUP></SignUP>
            </Form>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
