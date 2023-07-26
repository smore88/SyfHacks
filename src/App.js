import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";

import AddApplicant from "./components/add-tutorial.component";

class App extends Component {
  render() {
    return (
        <div className="app-container">
          <NavBar></NavBar> 
          <Routes>
            <Route path="/add" element={<AddApplicant/>} />
          </Routes>
        </div>
    );
  }
}

export default App;

// <Route path="/" element={<ApplicantList/>} />
// <Route path="/applicants" element={<ApplicantList/>} />
// <Route path="/add" element={<AddApplicant/>} />
// <Route path="/applicants:id" element={<Applicant/>} />


{/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/applicants" className="navbar-brand">
            Test
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/applicants"} className="nav-link">
                Applicants
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav> */}