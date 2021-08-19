import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, Button, Row, Col, CardBody, Form } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

import NavBar from "../../component/structure_global/navbar";

const title = 'อนุมัติผู้ใช้งาน - ระบบผู้ดูแล';

const ApproveUserDetail = ({ id }) => {

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

    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/finduser/" + id)//ส่งค่าไปแอดใน DB
            .then((response) => {
                setInfo(response.data);
            });
    }, [id]);

    //////////////////////////////////////////////
    const saveUser = (e, a) => {
        e.preventDefault()

        const setApproveuser = a;

        console.log(setApproveuser)

        if (setApproveuser === "Yes") {
            var data = {
                allow: setApproveuser,
                user_id: id
            };


            axios.post("http://localhost:8080/Mback/public/manageuser", data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'อนุมัติผู้ใช้สำเร็จ',
                            'ผู้ใช้สามารถใช้งานระบบ ในฐานะ' + res.data.status + 'ได้',
                            'success'
                        )
                            .then(() => window.location.assign("/staff/approve_user"))

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        } else {

            var data = {
                allow: setApproveuser,
                user_id: id
            };


            axios.post("http://localhost:8080/Mback/public/manageuser", data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "Deny") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'ไม่อนุมัติผู้ใช้',
                            'ระบบจะลบข้อมูลผู้ใช้นี้',
                            'warning'
                        )
                            .then(() => window.location.assign("/staff/approve_user"))

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        }
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


                                <Row>
                                    <div className="col-6" align="right">
                                        ชื่อ :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.username}
                                        </b>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-6" align="right">
                                        นามสกุล :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.userlastname}
                                        </b>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-6" align="right">
                                        อีเมล :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.useremail}
                                        </b>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-6" align="right">
                                        เบอร์โทรศัพท์ :
                                    </div>
                                    <div className="col-6" align="left">
                                        <b>
                                            {info.usertel}

                                        </b>
                                    </div>
                                </Row>
                                {info.status == "นักเรียน" ?
                                    <Row>
                                        <div className="col-6" align="right">
                                            ระดับชั้นการศึกษา :
                                        </div>
                                        <div className="col-6" align="left">
                                            <b>
                                                {info.class}

                                            </b>
                                        </div>
                                    </Row> : <div></div>}
                                <div className="borderline" />
                                <Form >
                                    <div align="center">
                                        <Button className="Button-Style" color="success" outline onClick={(e, a) => saveUser(e, "Yes")} style={{ marginRight: "5px" }}>
                                            อนุมัติ
                                        </Button>
                                        <Button className="Button-Style" color="danger" outline onClick={(e, a) => saveUser(e, "NO")} outline>
                                            ปฎิเสธ
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ApproveUserDetail;
