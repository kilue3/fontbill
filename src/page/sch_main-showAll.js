import React, { useState, useEffect } from 'react';
import Slide from '../component/home-slide';
import { Container, Card, Row, Col,CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../component/structure_global/navbar";
import Footer from "../component/structure_global/footer";
import RightContent from "../component/structure_global/right_content";
import axios from 'axios';
import AllSchollar from './sch_main-readAll';
const title = 'ทุนการศึกษาทั้งหมด';


const AllSchollarpage = (props) => {


    const [Mscholar, setMscholar] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/Mshcholarship")
            .then((response) => {
                setMscholar(response.data);
            });
    }, []);
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <NavBar />

            <Container className="container-fluid TZS-Container">
                <Row>
                    <Col lg="12" className="col-ContentSetting" style={{ marginBottom: '20px' }}>
                        <Slide />
                    </Col>

                    <Col lg="3" className="col-ContentSetting">
                        <RightContent />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">

                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">ทุนการศึกษา</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                    ทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                            มีทุนการศึกษาทั้งหมด XX รายการ
                                <div className="borderline" />
                                {Mscholar == "" ?
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>:
                                <div className="EdgeRow-1">
                                    <Row>
                                        <AllSchollar/>
                                    </Row>
                                </div>
}
                            </CardBody>
                        </div>
                    </Col>

                </Row>
            </Container>

            <Footer />
        </>
    );
}

export default AllSchollarpage;
