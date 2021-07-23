import React, { useState, useEffect } from 'react';
import { Container, Card, Button, CardTitle, CardText, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';

import NavBar from "../../component/structure_global/navbar";
import StaffLeftMenu from '../../component/staff_page/left_menu';
import Listname from '../../page/staff_page/modal/listnameuser';
const title = 'ผู้ใช้งานในระบบ - ระบบผู้ดูแล';

const ManageUser = () => {
    const [Userlist, setUserlist] = useState([]);
    // ใช้ useState เก็บ สร้าง Userlist
    const updateUserlist = () => {
        axios.get("http://localhost:8080/Mback/public/manageuser").then((response) => {
            //   รับตัวแปลมาจาก codeigniter แล้วก็มาเก็บไว้ใน setUserlist
            setUserlist(response.data);
        });
    };
    useEffect(() => {
        updateUserlist();
    }, []);
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <NavBar />

            <Container className="container-fluid TZS-Container">
                <Row>
                    <Col lg="3" className="col-ContentSetting">
                        <StaffLeftMenu />
                    </Col>
                    <Col lg="9" className="col-ContentSetting">

                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                <li className="breadcrumb-item active" aria-current="page">ผู้ใช้งานในระบบ</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                    ผู้ใช้งานในระบบ
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                                จัดการเกี่ยวกับผู้ใช้งานภายในเว็บไซต์
                                <div className="borderline" />
                                <Button className="Button-Style headerButton" outline color="info" size="sm" href="javascript:window.open('http://localhost:8080/Mback/public/Import','_blank','height=550,width=700');">
                                    + เพิ่มรายชื่อนักเรียนจาก Excel
                                </Button>
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ผู้ใช้งาน (นักเรียน)
                                <div className="borderline" />
                                <div className="EdgeRow-1">
                                    <Row>
                                        <Listname classroom="1" />  
                                        <Listname classroom="2" />  
                                        <Listname classroom="3" />  
                                        <Listname classroom="4" />  
                                        <Listname classroom="5" />  
                                        <Listname classroom="6" />
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ผู้ดูแลระบบและอาจาร์ย
                                <div className="borderline" />
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>
                                <div className="EdgeRow-1">
                                    <Row>
                                        
                                    </Row>
                                </div>

                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ผู้ใช้ที่ถูกระงับ
                                <div className="borderline" />
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>
                                <div className="EdgeRow-1">
                                    <Row>
                                        
                                    </Row>
                                </div>

                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ManageUser;
