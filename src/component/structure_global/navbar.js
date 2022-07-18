import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import logo from ".././../img/th.png"

const NavBar = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("fname");
    localStorage.removeItem("conname");
    localStorage.removeItem("uname");
    localStorage.removeItem("status");
    window.location.assign("/");
  };
  const toggle = () => setIsOpen(!isOpen);
  if (session.status === "admin"||session.status==="normal") {
    return (
      <div>
        <Navbar
          className="navbar navbar-expand-lg navbar-dark sticky-top shadow-box-example "
          color="white"
         
          expand="md"
          style={{ maxWidth: "auto" }}
        >
          <Container
            className="container-fluid TZS-Container"
            style={{ maxWidth: "1700px" }}
          >
            <a href="/adminpage"> <img
              className="buttonMenuIcon" 
              src={logo}
              style={{width:"auto", height: "60px" ,marginLeft:"0px" ,paddingLeft:"0px" }}
            /></a>
           

            <NavbarBrand
              href="/adminpage"
              style={{ color: "#0062cb", fontSize: "30px" ,marginTop:"20px" }}
            >
              <b>ระบบวางบิล Online</b>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar></Nav>
              <a href="">
                <NavLink style={{ paddingLeft: "0px", paddingRight: "5px" }}>
                  {session.fname} {session.lname}
                </NavLink>
              </a>
              <NavLink style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                <Button
                  onClick={logout}
                  block
                  color="danger"
                  className="Button-Style"
                  style={{ marginLeft: "10px" }}
                >
                  ออกจากระบบ
                </Button>
              </NavLink>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } else if (session.status === "enable") {
    return (
      <div>
        <Navbar
          className="navbar navbar-expand-lg navbar-light sticky-top shadow-box-example "
          color="white"
          light
          expand="md"
          style={{ maxWidth: "auto" }}
        >
          <Container
            className="container-fluid TZS-Container"
            style={{ maxWidth: "1700px" }}
          >
             <a href="/adminpage"> <img
              className="buttonMenuIcon" 
              src={logo}
              style={{width:"auto", height: "60px" ,marginLeft:"0px" ,paddingLeft:"0px" }}
            /></a>
           

            <NavbarBrand
              href="/adminpage"
              style={{ color: "#0062cb", fontSize: "30px" ,marginTop:"20px" }}
            >
              <b>ระบบวางบิล Online</b>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/"></NavLink>
                </NavItem>
              </Nav>
              {/* <a href="/profile"> */}
                <NavLink style={{ paddingLeft: "0px", paddingRight: "5px" }}>
                  {session.fname} {session.lname}
                </NavLink>
              {/* </a> */}
              <NavLink style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                <Button
                  onClick={logout}
                  block
                  color="danger"
                  className="Button-Style"
                  style={{ marginLeft: "10px" }}
                >
                  ออกจากระบบ
                </Button>
              </NavLink>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  } 
};

export default NavBar;
