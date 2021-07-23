import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, FormText, Button, Alert, Modal, FormFeedback, ModalBody, ModalFooter } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

import NavBar from "../../component/structure_global/navbar";

const title = 'เพิ่มทุนการศึกษา - ระบบผู้ดูแล';

const ScholarshipCreateMain = () => {
    ///////////////////////////agen///////////////
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
    }, []);
    ////////////////////////type/////////////////////
    const [type, setType] = useState([]);

    /////////////////////////////////////////////////////
    const initScholar = {

        msch_name: "",

        msch_detail: "",
        ag_id: "",

        sch_type_id: "",
        yearbudged: /^[0-9\b]+$/,


    };
    const [Falsepass, setFalsepass] = useState(false);

    const [Scholar, setScholar] = useState(initScholar);
    //    mr drop
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }



    const inputdata = (event) => {
        let { name, value } = event.target;
        setScholar({ ...Scholar, [name]: value });


    }


    const saveStudent = (e) => {
        e.preventDefault()

        var data = {
            msch_name: Scholar.msch_name,

            msch_detail: Scholar.msch_detail,
            ag_id: Scholar.ag_id,

            sch_type_id: Scholar.sch_type_id,
            addby: session.id,
            yearbudged: Scholar.yearbudged,



        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data)
            if (data['msch_name'] === "" || data['msch_detail'] === "" || data['ag_id'] === "" || data['sch_type_id'] === "" || data['yearbudged'] === "") {
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )

            } else {
                axios.post("http://localhost:8080/Mback/public/addMshcholarship", data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////ต่อตรงนี้
                            Swal.fire(
                                'เพิ่มทุนสำเร็จ',
                                'สามารถจัดการเกี่ยวกับทุนได้ในหน้า ทุนการศึกษา',
                                'success'
                            )
                                .then(() => window.location.assign("/staff/MainAddSunsholar/" + res.data.id))

                        } else {

                            Swal.fire(
                                'เพิ่มทุนล้มเหลว',
                                'ชื่อทุนนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุน แล้วลองใหม่อีกครั้ง',
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
                                <li className="breadcrumb-item active" aria-current="page">เพิ่มทุนการศึกษา</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/add_circle.png" />
                                    เพิ่มทุนการศึกษา
                                </h5>
                                <div className="borderline" />
                                <div align="center">
                                    <Form style={{ maxWidth: '700px' }} onSubmit={saveStudent} >
                                        <FormGroup align="left">
                                            <Label for="ssch_name_main">ชื่อทุนการศึกษา</Label>
                                            <Input type="text" name="msch_name" id="ssch_name_main" placeholder="ชื่อทุนการศึกษา" onChange={inputdata} required />
                                        </FormGroup>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="category">หมวดหมู่</Label>
                                                    <Input type="select" name="sch_type_id" id="category" onChange={inputdata} required>
                                                        <option >กรุณาเลือกหมวดหมู่</option>

                                                        {type.map((stype) => {

                                                            return (

                                                                <option key={stype.stype_id} value={stype.sch_type_id}>{stype.sch_typename}</option>

                                                            );

                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="agency">หน่วยงาน</Label>
                                                    <Input type="select" name="ag_id" id="agency" onChange={inputdata} required>
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
                                                    <Input type="number" name="yearbudged" id="category" onChange={inputdata} Yearb required>

                                                    </Input>

                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <FormGroup align="left">
                                            <Label for="first_name">รายละเอียดเพิ่มเติม</Label>
                                            <Input type="textarea" rows="8" name="msch_detail" id="first_name" placeholder="รายละเอียดเพิ่มเติม" onChange={inputdata} required />
                                        </FormGroup>
                                        <div className="borderline" />
                                        <div style={{ maxWidth: "300px" }} align="left">
                                            <Button className="Button-Style" block color="success" size="md" >
                                                <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default ScholarshipCreateMain;
