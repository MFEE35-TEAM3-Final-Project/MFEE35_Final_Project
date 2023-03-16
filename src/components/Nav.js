import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function HomepageNav() {
  return (
    <div id="header">
      <Nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
        <div className="w-100">
          <div className="nav_head">
            <a
              className="navbar-brand me-auto me-lg-0 col-lg-1 ps-lg-4"
              href="/"
            >
              <img src={"/img/Kessoku_Band_Logo.svg"} alt="" />
            </a>
            <div className="d-none d-lg-flex justify-content-lg-around col-lg-11">
              <div className="nav-item">
                <a href="#intro_selection" className="nav-link">
                  INTRODUCTION
                </a>
              </div>
              <div className="nav-item">
                <a href="#live_section" className="nav-link">
                  LIVE
                </a>
              </div>
              <div className="nav-item">
                <a href="#picture_section" className="nav-link">
                  PICTURE
                </a>
              </div>
              <div className="nav-item">
                <a href="#sns_section" className="nav-link">
                  SNS~
                </a>
              </div>
              <div className="nav-item">
                <a href="https://bocchi.rocks/" className="nav-link">
                  OFFICIAL
                </a>
              </div>
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Nav>
    </div>
  );
}

export default HomepageNav;
