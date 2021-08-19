import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import Editimg from './modal/edit_scholar_img';
import NavBar from "../../component/structure_global/navbar";

const title = 'เเก้ไขข้อมูลทุนการศึกษา - ระบบผู้ดูแล';

const Medit = ({ id }) => {



    ///////////////////////////agen//////////////////////////
    const [Mscholar, setMscholar] = useState([]);

    const [Agen, setAgen] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/addAgency")
            .then((response) => {
                setAgen(response.data);
            });
        axios.get("http://localhost:8080/Mback/public/scholarTypeshow")
            .then((response) => {
                setType(response.data);
            });
        axios.get("http://localhost:8080/Mback/public/findMshcholarship/" + id)
            .then((response) => {
                setMscholar(response.data);
            });
    }, [id]);
    ////////////////////////type/////////////////////
    const [type, setType] = useState([]);
    // ////////////////
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


    const inputdata = (event) => {
        let { name, value } = event.target;
        setMscholar({ ...Mscholar, [name]: value });


    }


    const saveStudent = (e) => {
        e.preventDefault()

        var data = {
            msch_name: Mscholar.name,
            msch_detail: Mscholar.content,
            ag_id: Mscholar.agen_id,
            sch_type_id: Mscholar.sch_type_id,
            EditBy: session.id,
            msch_year: Mscholar.year,



        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data)
            if (data['msch_name'] == "" || data['msch_detail'] == "" || data['ag_id'] == "" || data['sch_type_id'] == "" || data['yearbudged'] == "") {
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )

            } else {
                axios.put("http://localhost:8080/Mback/public/editMshcholarship/" + id, data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////ต่อตรงนี้
                            Swal.fire(
                                'แก้ไขทุนสำเร็จ',
                                'สามารถจัดการเกี่ยวกับทุนได้ในหน้า ทุนการศึกษา',
                                'success'
                            )
                                .then(() => window.location.assign("/staff/scholarship"))

                        } else if (res.data.message == "duplicate") {

                            Swal.fire(
                                'แก้ไขทุนล้มเหลว',
                                'ชื่อทุนนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุน แล้วลองใหม่อีกครั้ง',
                                'error'
                            )


                        } else if (res.data.message == "error") {

                            Swal.fire(
                                'แก้ไขทุนล้มเหลว',
                                'กรุณากรอกชื่อหน่วยงาน หรือ กรุณากรอกชื่อประเภทของทุน  แล้วลองใหม่อีกครั้ง',
                                'error'
                            )

                        }

                    })

                    .catch((error) => {
                        console.log("error");
                    });//ใช้ ดัก Error

            };
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

                    <Col md="9" className="col-ContentSetting">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb CardBackground-1">
                                <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                <li className="breadcrumb-item"><a href="/staff/scholarship">ทุนการศึกษา</a></li>
                                <li className="breadcrumb-item"><a href="/staff/scholarshipMain">{Mscholar.name}</a></li>
                                <li className="breadcrumb-item active" aria-current="page">เเก้ไขข้อมูล</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/edit.png" />
                                    เเก้ไขข้อมูล
                                </h5>
                                <h6 className="text-secondary" style={{ margin: '0px', marginLeft: "35px" }}>
                                    {Mscholar.name}
                                </h6>
                                <div className="borderline" />
                                <div align="center">
                                    <img src={Mscholar.m_img} alt="รูปทุนหลัก" style={{ height: '300px', width: '350' }} />
                                    <br />
                                    <Editimg msch_id={id} />

                                    <form style={{ maxWidth: '700px' }} onSubmit={saveStudent} >
                                        <FormGroup align="left">
                                            <Label for="ssch_name_main">ชื่อทุนการศึกษา</Label>
                                            <Input type="text" name="name" id="ssch_name_main" value={Mscholar.name} onChange={inputdata} required />
                                        </FormGroup>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="category">หมวดหมู่ </Label> <span style={{ color: "red" }}>*{" "}{Mscholar.Tname}</span>
                                                    <Input type="select" name="sch_type_id" id="category" onChange={inputdata} placeholder="กรุณาเลือกหมวดหมู่" required>
                                                        <option >กรุณาเลือกหมวดหมู่</option>

                                                        {type.map((stype) => {

                                                            return (

                                                                <option key={stype.sch_type_id} value={stype.sch_type_id}>{stype.sch_typename}</option>

                                                            );

                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="agency">หน่วยงาน </Label><span style={{ color: "red" }}>*{" "}{Mscholar.aname}</span>
                                                    <Input type="select" name="agen_id" id="agency" onChange={inputdata} required>
                                                        <option >กรุณาเลือกหน่วยงาน</option>

                                                        {Agen.map((agen) => {

                                                            return (

                                                                <option key={agen.agen_id} value={agen.agen_id}>{agen.agen_name}</option>

                                                            );

                                                        })}

                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={12}>
                                                <FormGroup align="left">
                                                    <Label for="category">ปีงบประมาณ</Label>
                                                    <Input type="number" name="year" id="category" onChange={inputdata} value={Mscholar.year} required>

                                                    </Input>

                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <FormGroup align="left">
                                            <Label for="first_name">รายละเอียดเพิ่มเติม</Label>
                                            <Input type="textarea" rows="8" name="content" id="first_name" value={Mscholar.content} onChange={inputdata} required />
                                        </FormGroup>
                                        <div className="borderline" />
                                        <div style={{ maxWidth: "300px" }} align="left">
                                            <Button className="Button-Style" block color="success" size="md" >
                                                <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default Medit;
