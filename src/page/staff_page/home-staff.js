import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, Button, CardTitle, CardText, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';

import NavBar from "../../component/structure_global/navbar";

const title = 'หน้าหลักระบบผู้ดูแล';

const StaffPage = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [ses, setSes] = useState(session);
    if (ses.status == "นักเรียน") {
        window.location.assign("/");

    }


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
                                    <li className="breadcrumb-item active" aria-current="page">หน้าหลักระบบผู้ดูแล</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/house.png" />
                                    หน้าหลักระบบผู้ดูแล
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                ดูภาพรวมของระบบ
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                Head
                                <div className="borderline" />
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default StaffPage;
