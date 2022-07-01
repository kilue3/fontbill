import React, { useState } from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,

    Button
} from 'reactstrap';

import Manage_systemShow from '../../page/staff_page/setup_nameSystem/manage_systemShow';


const NavBar = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }

    const [ses, setSes] = useState(session);
    const [isOpen, setIsOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('fname');
        localStorage.removeItem('lname');
        localStorage.removeItem('status');
        window.location.assign("/")

    }
    const toggle = () => setIsOpen(!isOpen);
    if (session.id === null) {
        return (
            <div>
                <Navbar className="navbar navbar-expand-lg navbar-light sticky-top shadow-box-example " color="white" light expand="md" style={{ maxWidth: "auto" }}>
                    <Container className="container-fluid TZS-Container" style={{ maxWidth: "1700px" }}>
                        <NavbarBrand href="/" style={{ color: "#f8813a" }}>
                        {/* ระบบการให้บริการสารสนเทศทุนการศึกษา */}
                            <Manage_systemShow/>
                    </NavbarBrand>
                        < NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar >
                            <Nav className="mr-auto" navbar>

                                <NavItem >
                                    <NavLink href="/" ></NavLink>
                                </NavItem>
                            </Nav >
                            <NavLink style={{ paddingLeft: "0px", paddingRight: "5px" }}>
                                <Button href="/register" outline color="secondary" className="Button-Style" style={{ border: "0px" }}>ลงทะเบียน</Button>
                            </NavLink>
                            <NavLink style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                <Button href="/login" outline color="primary" className="Button-Style">เข้าสู่ระบบ</Button>
                            </NavLink>

                        </ Collapse >
                    </Container>
                </ Navbar>
            </div >
        );
    } else {
        return (
            <div>
                <Navbar className="navbar navbar-expand-lg navbar-light sticky-top shadow-box-example " color="white" light expand="md" style={{ maxWidth: "auto" }}>
                    <Container className="container-fluid TZS-Container" style={{ maxWidth: "1700px" }}>
                        <NavbarBrand href="/" style={{ color: "#f8813a" }}>
                        {/* ระบบการให้บริการสารสนเทศทุนการศึกษา */}
                            <Manage_systemShow/>
                    </NavbarBrand>
                        < NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar >
                            <Nav className="mr-auto" navbar>

                                <NavItem >
                                    <NavLink href="/" ></NavLink>
                                </NavItem>
                            </Nav >
                            <a href="/profile"><NavLink style={{ paddingLeft: "0px", paddingRight: "5px" }}>
                                {session.fname}{" "}{session.lname}
                            </NavLink></a>
                            <NavLink style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                                <Button onClick={logout} outline color="danger" className="Button-Style" style={{ marginLeft: "10px" }}>
                                    ออกจากระบบ
                                </Button>
                            </NavLink>

                        </ Collapse >
                    </Container>
                </ Navbar>
            </div >
        );
    }
}


export default NavBar;