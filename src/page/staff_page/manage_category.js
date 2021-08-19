import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, CardHeader, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

import NavBar from "../../component/structure_global/navbar";

const title = 'หมวดหมู่ทุนการศึกษา - ระบบผู้ดูแล';

const ManageCategory = () => {
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

    const [type, setType] = useState([]);
    const page = () => {
        axios.get("http://localhost:8080/Mback/public/scholarTypeshow")
            .then((response) => {
                setType(response.data);
            });
    }
    useEffect(() => {
        page();
    }, []);
    ////////////////////////type/////////////////////

    const initSchType = {
        sch_typename: "",
    }
    const [SchType, setSchType] = useState(initSchType);

    const inputdata = (event) => {
        let { name, value } = event.target;
        setSchType({ ...SchType, [name]: value });


    }

    const saveType = (e) => {
        e.preventDefault()

        var data = {
            sch_typename: SchType.sch_typename,

        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data['sch_typename'] === "") {
            Swal.fire(

                'เกิดข้อผิดพลาด',
                'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                'error'
            )

        } else {
            axios.post("http://localhost:8080/Mback/public/addScholarType", data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เพิ่มหน่วยหมวดหมู่ทุนการศึกษาสำเร็จ',
                            'สามารถจัดการเกี่ยวกับหมวดหมู่ทุนการศึกษาได้ในหน้า หมวดหมู่ทุนการศึกษา',
                            'success'
                        )
                            .then(() => window.location.assign("/staff/manage_category"))

                    } else {

                        Swal.fire(
                            'เพิ่มหมวดหมู่ทุนการศึกษาล้มเหลว',
                            'ชื่อหมวดหมู่นี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อหมวดหมู่ แล้วลองใหม่อีกครั้ง',
                            'error'
                        )

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        };
    }
    const delectType = async (a) => {


        axios.delete("http://localhost:8080/Mback/public/delectType/" + a)
            .then((response) => {
                Swal.fire(
                    'Delect Success',
                    '',
                    'success'
                )
                page();

            })

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
                                    <li className="breadcrumb-item active" aria-current="page">หมวดหมู่ทุนการศึกษา</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/list.png" />
                                    หมวดหมู่ทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                จัดการเกี่ยวกับหมวดหมู่ทุนการศึกษา
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h6 style={{ margin: '0px' }}>
                                    <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/add_circle.png" />
                                    เพิ่มหมวดหมู่ทุนการศึกษา
                                </h6>
                                <div className="borderline" />
                                <div align="center">
                                    <Form style={{ maxWidth: '700px' }} onSubmit={saveType}>
                                        <FormGroup align="left">
                                            <Label for="sch_typename">ชื่อหมวดหมู่ทุนการศึกษา</Label>
                                            <Input type="text" name="sch_typename" id="sch_typename" placeholder="ชื่อหมวดหมู่ทุนการศึกษา" onChange={inputdata} required />
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
                                {type == "" ?

                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบข้อมูล
                                    </div>
                                    :
                                    <div className="EdgeRow-1">
                                        <Row>
                                            {type.map((stype) => {

                                                return (
                                                    <>
                                                        <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                            <div key={stype.sch_type_id} >
                                                                <Card className="CardBackground-2">
                                                                    <a href="#">
                                                                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                                <b>{stype.sch_typename}</b>
                                                                            </h6>
                                                                        </CardHeader>
                                                                    </a>
                                                                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                                        <div align="left">
                                                                            <Button className="Button-Style" color="secondary" size="sm" onClick={() => delectType(stype.sch_type_id)} style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href="" >
                                                                                <img className="Button-icon" style={{ height: "17px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/delete_forever_white.png" />
                                                                            </Button>
                                                                            <Button className="Button-Style" outline color="secondary" size="sm" onClick={() => delectType(stype.sch_type_id)} style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px" }} href="" >
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

export default ManageCategory;
