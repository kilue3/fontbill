import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, Button, Form, Row, Col, CardBody, Input } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

import NavBar from "../../component/structure_global/navbar";

const title = 'อนุมัติผู้ใช้งาน - ระบบผู้ดูแล';

const ApproveUser = () => {
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
                                    <li className="breadcrumb-item active" aria-current="page">อนุมัติผู้ใช้งาน</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind.png" />
                                    อนุมัติผู้ใช้งาน
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                อนุมัติหรือปฎิเสธผู้ใช้ที่ลงทะเบียนเข้ามาในระบบ
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                ผู้ใช้ที่ส่งคำขออนุมัติ
                                <div className="borderline" />
                                {Userlist == "" ?

                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบข้อมูล
                                    </div>
                                    :
                                    <div className="EdgeRow-1">
                                        <Row>
                                            {Userlist.map((user) => {
                                                //   ต้องใช้ key กับ id
                                                return (
                                                    <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">
                                                        <div key={user.user_id}  >
                                                            <Card className="CardBackground-2">
                                                                <CardBody className="">
                                                                    <Row>
                                                                        <div className="col-9">
                                                                            <h6 className="text-primary" style={{ margin: '0px' }}>
                                                                                <a href={"/scholarshipMain/" + user.user_id}>
                                                                                    {user.usertitle}{" "}{user.username}{" "}{user.userlastname}
                                                                                </a>
                                                                            </h6>
                                                                        </div>
                                                                        <div className="col-3">
                                                                            <div align="right" style={{ marginRight: "-20px", marginTop: "-20px" }}>
                                                                                <a href={"/staff/approve_user_detail/" + user.user_id}>

                                                                                    {user.userstatus == "อาจารย์" ?
                                                                                        <Button className="Button-Style" color="primary" style={{ paddingRight: "6px", borderTopLeftRadius: "0px", borderBottomRightRadius: "0px" }}>
                                                                                            {user.userstatus}
                                                                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind_white.png" style={{ marginRight: "0px", marginLeft: "5px" }} />
                                                                                        </Button>
                                                                                        :
                                                                                        <Button className="Button-Style" color="success" style={{ paddingRight: "6px", borderTopLeftRadius: "0px", borderBottomRightRadius: "0px" }}>
                                                                                            {user.userstatus}
                                                                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind_white.png" style={{ marginRight: "0px", marginLeft: "5px" }} />
                                                                                        </Button>
                                                                                    }

                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    </Row>
                                                                    <div className="borderline" />
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/email.png" />
                                                                        {user.useremail}
                                                                    </h6>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" />
                                                                        {user.usertel}
                                                                    </h6>
                                                                    <div className="borderline" />
                                                                    <div align="right">

                                                                        <div align="center">
                                                                            <a href={"/staff/approve_user_detail/" + user.user_id}>

                                                                                <Button className="Button-Style" color="success" outline style={{ marginRight: "5px" }}>
                                                                                    ดูรายละเอียด
                                                                                </Button>
                                                                            </a>

                                                                        </div>

                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    </div>
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

export default ApproveUser;
