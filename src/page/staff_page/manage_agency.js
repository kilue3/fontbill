import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, CardHeader, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

import NavBar from "../../component/structure_global/navbar";

const title = 'หน่วยงานทุนการศึกษา - ระบบผู้ดูแล';

const ManageAgency = () => {
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

    /////////////////////////// show agency ///////////////
    const [AgenShow, setAgen] = useState([]);
    const page = () => {
        axios.get("http://localhost:8080/Mback/public/addAgency")
            .then((response) => {
                setAgen(response.data);
            });
    }
    useEffect(() => {
        page()
    }, []);
    //////////////////////////////////////////////////

    const initAgen = { ///สร้างดาต้าเปล่า
        agenname: "",
    }

    const [Agen, setAgency] = useState(initAgen);

    const inputdata = (event) => {
        let { name, value } = event.target;
        setAgency({ ...Agen, [name]: value });


    }

    const saveAgency = (e) => {
        e.preventDefault()

        var data = {
            agen_name: Agen.agen_name,

        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data['agen_name'] === "") {
            Swal.fire(
                'เกิดข้อผิดพลาด',
                'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                'error'
            )

        } else {
            axios.post("http://localhost:8080/Mback/public/addAgency", data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เพิ่มหน่วยงานสำเร็จ',
                            'สามารถจัดการเกี่ยวกับหน่วยงานได้ในหน้า หน่วยงานทุนการศึกษา',
                            'success'
                        )
                            .then(() => window.location.assign("/staff/manage_agency"))

                    } else {

                        Swal.fire(
                            'เพิ่มหน่วยงานล้มเหลว',
                            'ชื่อหน่วยงานนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อหน่วยงาน แล้วลองใหม่อีกครั้ง',
                            'error'
                        )

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        };
    }
    const delectAgen = async (cid) => {

        if (cid) {
            axios.delete("http://localhost:8080/Mback/public/delectAgency/" + cid)
                .then((response) => {
                    Swal.fire(
                        'Delect Success',
                        '',
                        'success'
                    )
                    page();

                })
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

                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">หน่วยงานทุนการศึกษา</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/work.png" />
                                    หน่วยงานทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                จัดการเกี่ยวกับหน่วยงานทุนการศึกษา
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h6 style={{ margin: '0px' }}>
                                    <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/add_circle.png" />
                                    เพิ่มหน่วยงานทุนการศึกษา
                                </h6>
                                <div className="borderline" />
                                <div align="center">
                                    <Form style={{ maxWidth: '700px' }} onSubmit={saveAgency}>
                                        <FormGroup align="left">
                                            <Label for="agen_name">ชื่อหน่วยงานทุนการศึกษา</Label>
                                            <Input type="text" name="agen_name" id="agen_name" placeholder="ชื่อหน่วยงานทุนการศึกษา" onChange={inputdata} required />
                                        </FormGroup>
                                        <div style={{ maxWidth: "300px" }} align="left">
                                            <Button className="Button-Style" block color="success" size="md" >
                                                <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                                <div className="borderline" style={{ marginBottom: '0px' }} />
                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                <h6 style={{ margin: '0px' }}>
                                    หน่วยงานทุนการศึกษา
                                </h6>
                                <div className="borderline" />
                                {AgenShow == "" ?

                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบข้อมูล
                                    </div>
                                    :
                                    <div className="EdgeRow-1">
                                        <Row>
                                            {AgenShow.map((agen) => {

                                                return (
                                                    <>
                                                        <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                            <div key=""  >
                                                                <Card className="CardBackground-2">
                                                                    <a href="#">
                                                                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                                <b>{agen.agen_name}</b>
                                                                            </h6>
                                                                        </CardHeader>
                                                                    </a>
                                                                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                                        <div align="left">
                                                                            <Button className="Button-Style" color="secondary" size="sm" onClick={() => delectAgen(agen.agen_id)} style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href="" >
                                                                                <img className="Button-icon" style={{ height: "17px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/delete_forever_white.png" />
                                                                            </Button>
                                                                            <Button className="Button-Style" outline color="secondary" size="sm" onClick={() => delectAgen(agen.agen_id)} style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px" }} href="" >
                                                                                ลบข้อมูล
                                                                            </Button>
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

export default ManageAgency;
