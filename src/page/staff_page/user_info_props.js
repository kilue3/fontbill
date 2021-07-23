import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, Button, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';

import NavBar from "../../component/structure_global/navbar";

const title = 'อนุมัติผู้ใช้งาน - ระบบผู้ดูแล';

const Userinfoprops = ({ id }) => {


    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/profilestudent/" + id)//ส่งค่าไปแอดใน DB
            .then((response) => {
                setInfo(response.data);
            });
    }, [id]);

    //////////////////////////////////////////////
   

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

        

            <Container className="container-fluid TZS-Container">
                <Row>
                    <Col lg="3" className="col-ContentSetting">
                        <StaffLeftMenu />
                    </Col>
                    <Col lg="9" className="col-ContentSetting">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb CardBackground-1">
                                <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                <li className="breadcrumb-item"><a href="/staff/approve_user">อนุมัติผู้ใช้งาน</a></li>
                                <li className="breadcrumb-item active" aria-current="page">รายละเอียดผู้ใช้ ชื่อ นามสกุล</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind.png" />
                                    อนุมัติผู้ใช้งาน
                                </h5>
                                <div className="borderline" />
                                อนุมัติหรือปฎิเสธผู้ใช้ที่ลงทะเบียนเข้ามาในระบบ
                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="">
                                รายละเอียดผู้ใช้
                                <div className="borderline" />
                                <div align="center" style={{ marginBottom: "10px" }}>
                                    {info.status == "อาจารย์" ?
                                        <Button className="Button-Style" color="primary" style={{ paddingRight: "6px", borderTopLeftRadius: "0px", borderBottomRightRadius: "0px" }}>
                                            อาจารย์
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind_white.png" style={{ marginRight: "0px", marginLeft: "5px" }} />
                                        </Button>
                                        :
                                        <Button className="Button-Style" color="success" style={{ paddingRight: "6px", borderTopLeftRadius: "0px", borderBottomRightRadius: "0px" }}>
                                            นักเรียน
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind_white.png" style={{ marginRight: "0px", marginLeft: "5px" }} />
                                        </Button>
                                    }
                                </div>
                               
                                <img src={info.img} alt="" aingn="left" />
                                    
                                

                                <Row>
                                    <div className="col-6" align="right">
                                        ชื่อ :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.fname}
                                        </b>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-6" align="right">
                                        นามสกุล :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.lname}
                                        </b>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-6" align="right">
                                        อีเมล :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.email}
                                        </b>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-6" align="right">
                                        เบอร์โทรศัพท์ :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.tel}

                                        </b>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-6" align="right">
                                        ระดับชั้นการศึกษา :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.class}

                                        </b>
                                    </div>
                                </Row>
                                <div className="borderline" />
                                
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Userinfoprops;
