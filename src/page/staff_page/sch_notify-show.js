import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardHeader, Button, Row, Col, CardBody, Badge } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Delectresult from '../component/Delectresult';
import NavBar from "../../component/structure_global/navbar";

const title = 'ประกาศทุนการศึกษา - ระบบผู้ดูแล';

const Result_pagestaff = () => {
    const [Mscholar, setMscholar] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/ResultAndUsername")
            .then((response) => {
                setMscholar(response.data);
            });
    }, []);

    /////////////////////////////Modal/////////////////////////////////////////

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    ////////////////////////////////////////////////////////

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
                                    <li className="breadcrumb-item active" aria-current="page">ประกาศทุนการศึกษา</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/campaign.png" />
                                    ประกาศทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                                จัดการเกี่ยวกับประกาศทุนการศึกษา
                                <div className="borderline" />
                                <Button className="Button-Style headerButton" outline color="info" size="sm" href="/staff/NewResultpage">
                                    + เพิ่มประกาศทุนการศึกษา
                                </Button>
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ประกาศทุนการศึกษา
                                <div className="borderline" />

                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>

                                <div className="EdgeRow-1">
                                    <Row>
                                        {Mscholar.map((scholar) => {
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                        <div key={scholar.result_id}  >
                                                            <Card className="CardBackground-2" style={{ minHeight: '215px' }}>
                                                                <a href={"/result/" + scholar.result_id}>
                                                                    <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                                        <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                            <Badge color="danger">ใหม่</Badge><b> {scholar.result_name}</b>
                                                                        </h6>
                                                                    </CardHeader>
                                                                </a>
                                                                <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" />
                                                                            สร้างเมื่อ : {scholar.adate}
                                                                    </h6>
                                                            
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                                                            เพิ่มโดย : {scholar.st_fname} {"  "} {scholar.st_lname}
                                                                    </h6>
                                                                    <div className="borderline" />
                                                                    <div align="left">
                                                                        {/* ------------------ */}
                                                                        <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href={"/staff/MainEditSunsholar/" + scholar.result_id} >
                                                                            <img className="Button-icon" style={{ height: "18px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/edit_white.png" />
                                                                        </Button>
                                                                        <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px", marginRight: "5px" }} href={"/staff/editresult/" + scholar.result_id} >
                                                                            แก้ไขข้อมูล
                                                                        </Button>
                                                                       
                                                                        {/* ------------------ */}
                                                                    </div>
                                                                    <div className="borderline" />
                                                                    <div align="left">
                                                                        {/* ------------------ */}
                                                                        <Delectresult scholar={scholar} />
                                                                        {/* ------------------ */}
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
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

export default Result_pagestaff;
