import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardHeader, Button, Row, Col, CardBody, Badge } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import DelectMs from '../component/DelectMs';
import NavBar from "../../component/structure_global/navbar";

const title = 'ทุนการศึกษา - ระบบผู้ดูแล';

const Scholarship = () => {
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

    const [Mscholar, setMscholar] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/MscholarAndUsername")
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
                                จัดการเกี่ยวกับทุนการศึกษา
                                <div className="borderline" />
                                <Button className="Button-Style headerButton" outline color="info" size="sm" href="/staff/scholarship_create-main">
                                    + เพิ่มทุนการศึกษา
                                </Button>
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ทุนการศึกษา
                                <div className="borderline" />
                                {Mscholar == "" ?
                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบข้อมูล
                                    </div>
                                    : <div className="EdgeRow-1">
                                        <Row>
                                            {Mscholar.map((scholar) => {
                                                return (
                                                    <>
                                                        <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                            <div key={scholar.msch_id}  >
                                                                <Card className="CardBackground-2" style={{ minHeight: '215px' }}>
                                                                    <a href={"/scholarshipMain/" + scholar.msch_id}>
                                                                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                                <Badge color="danger">ใหม่</Badge><b> {scholar.msch_name}</b>
                                                                            </h6>
                                                                        </CardHeader>
                                                                    </a>
                                                                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                                        <h6 style={{ margin: '0px' }}>
                                                                            <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" />
                                                                            สร้างเมื่อ : {scholar.timeadd}
                                                                        </h6>
                                                                        <h6 style={{ margin: '0px' }}>
                                                                            <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/timeline.png" />
                                                                            ปีงบประมาณ : {scholar.msch_year}
                                                                        </h6>
                                                                        <h6 style={{ margin: '0px' }}>
                                                                            <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                                                            เพิ่มโดย : {scholar.st_fname} {"  "} {scholar.st_lname}
                                                                        </h6>
                                                                        <div className="borderline" />
                                                                        <div align="left">
                                                                            {/* ------------------ */}
                                                                            <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href={"/staff/MainEditSunsholar/" + scholar.msch_id} >
                                                                                <img className="Button-icon" style={{ height: "18px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/edit_white.png" />
                                                                            </Button>
                                                                            <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px", marginRight: "5px" }} href={"/staff/MainEditSunsholar/" + scholar.msch_id} >
                                                                                แก้ไขข้อมูล
                                                                            </Button>
                                                                            {/* ------------------ */}
                                                                            <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href={"/staff/ShEditSunsholar/" + scholar.msch_id} >
                                                                                <img className="Button-icon" style={{ height: "18px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/search_white.png" />
                                                                            </Button>
                                                                            <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px", marginRight: "5px" }} href={"/staff/ShEditSunsholar/" + scholar.msch_id} >
                                                                                ดูทุนย่อยทั้งหมด
                                                                            </Button>
                                                                            {/* ------------------ */}
                                                                            <br />
                                                                            <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px", marginTop: "5px" }} href={"/staff/MainAddSunsholar/" + scholar.msch_id} >
                                                                                <img className="Button-icon" style={{ height: "18px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/add_white.png" />
                                                                            </Button>
                                                                            <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px", marginTop: "5px", marginRight: "5px" }} href={"/staff/MainAddSunsholar/" + scholar.msch_id} >
                                                                                เพิ่มทุนการศึกษาย่อยในทุนนี้
                                                                            </Button>
                                                                            {/* ------------------ */}
                                                                        </div>
                                                                        <div className="borderline" />
                                                                        <div align="left">
                                                                            {/* ------------------ */}
                                                                            <DelectMs scholar={scholar} />
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
                                }
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default Scholarship;
