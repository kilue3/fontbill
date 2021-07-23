import React, { useState } from 'react'
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, FormText, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

const title = 'ลงทะเบียนเข้าใช้ระบบ';

const Register = () => {


    const initStudent = {
        title: "ด.ช.",
        name: "",
        lastname: "",

        tel: "",

        email: "",
        password: "",
        repassword: "",
        status: "",
        class:""

    };
    const [Falsepass, setFalsepass] = useState(false);

    const [student, setStudent] = useState(initStudent);
    //    mr drop



    const inputdata = (event) => {
        let { name, value } = event.target;
        setStudent({ ...student, [name]: value });


    }



    const saveStudent = (e) => {
        e.preventDefault()

        var data = {
            title: student.title,

            name: student.name,
            lname: student.lastname,

            tel: student.tel,

            email: student.email,
            password: student.password,
            repassword: student.repassword,
            status: student.status,
            class: student.class


        };//เอาค่าที่รับจาก form มาใส่ใน json
        if(data['status' === "อาจารย์"]){
            var teacher = {
                title: student.title,
    
                name: student.name,
                lname: student.lastname,
    
                tel: student.tel,
    
                email: student.email,
                password: student.password,
                repassword: student.repassword,
                status: student.status,
    
    
            };
            if (teacher['title'] === "" || teacher['name'] === "" || teacher['lname'] === "" || teacher['tel'] === "" || teacher['email'] === "" || teacher['password'] === "" || teacher['repassword'] === "" || teacher['status'] === "") {
                Swal.fire(
    
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )
    
            } else {
                if (teacher['password'] == teacher['repassword']) {
                    axios.post("http://localhost:8080/Mback/public/registeruser", teacher)//ส่งค่าไปแอดใน DB
                        .then((res) => {
                            console.log(res.data.message);
                            if (res.data.message == "success") {
                                Swal.fire(
    
                                    'ลงทะเบียนสำเร็จ',
                                    'บัญชีของคุณอยู่ระหว่างการตรวจสอบ โปรดรอการตรวจสอบบัญชี',
                                    'success'
                                )
                                    .then(() => window.location.assign("/Login"))
    
                            } else {
    
                                Swal.fire(
                                    'เกิดข้อผิดพลาด',
                                    'อีเมลที่ลงทะเบียนมีอยู่แล้วในระบบ โปรดเปลี่ยนอีเมล แล้วลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล',
                                    'error'
                                )
    
                            }
    
                        })
    
                        .catch((error) => {
                            console.log("error");
                        });//ใช้ ดัก Error
                } else {
                    setFalsepass(true);
    
                };
            };
        }else{
            if (data['title'] === "" || data['name'] === "" || data['lname'] === "" || data['tel'] === "" || data['email'] === "" || data['password'] === "" || data['repassword'] === "" || data['status'] === "") {
                Swal.fire(
    
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )
    
            } else {
                if (data['password'] == data['repassword']) {
                    axios.post("http://localhost:8080/Mback/public/registeruser", data)//ส่งค่าไปแอดใน DB
                        .then((res) => {
                            console.log(res.data.message);
                            if (res.data.message == "success") {
                                Swal.fire(
    
                                    'ลงทะเบียนสำเร็จ',
                                    'บัญชีของคุณอยู่ระหว่างการตรวจสอบ โปรดรอการตรวจสอบบัญชี',
                                    'success'
                                )
                                    .then(() => window.location.assign("/Login"))
    
                            } else {
    
                                Swal.fire(
                                    'เกิดข้อผิดพลาด',
                                    'อีเมลที่ลงทะเบียนมีอยู่แล้วในระบบ โปรดเปลี่ยนอีเมล แล้วลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล',
                                    'error'
                                )
    
                            }
    
                        })
    
                        .catch((error) => {
                            console.log("error");
                        });//ใช้ ดัก Error
                } else {
                    setFalsepass(true);
    
                };
            };
        }
      
    }
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <Container className="container-fluid TZS-Container">
                <div align="center" style={{ marginTop: '100px' }}>
                    <a href="/home">
                        <h4>ระบบการให้บริการสารสนเทศทุนการศึกษา ฯ</h4>
                    </a>
                </div>
                <div align="center" style={{ marginTop: '30px' }}>
                    <Card className="CardBackground-1" style={{ maxWidth: '600px' }} align="left">
                        <CardBody className="">
                            <h4>
                                <img className="Button-icon" style={{ marginRight: '10px' }} src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind.png" />
                                ลงทะเบียนเข้าใช้ระบบ
                            </h4>
                            <div className="borderline" />
                            <Form onSubmit={saveStudent} >
                                <Row >
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="title">คำนำหน้า</Label>
                                            <Input type="select" name="title" id="title" onChange={inputdata} required>
                                                <option>ด.ช.</option>
                                                <option>ด.ญ.</option>
                                                <option>นาย</option>
                                                <option>นางสาว</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="first_name">ชื่อ</Label>
                                            <Input type="text" name="name" id="first_name" placeholder="ชื่อจริง" onChange={inputdata} required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="last_name">นามสกุล</Label>
                                            <Input type="text" name="lastname" id="last_name" placeholder="นามสกุล" onChange={inputdata} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="user_phone">เบอร์โทรศัพท์</Label>
                                            <Input Type="number" name="tel" id="user_phone" placeholder="เบอร์โทรศัพท์" onChange={inputdata} required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="position">อาชีพ</Label>
                                            <Input type="select" name="status" id="position" onChange={inputdata} required>
                                                <option>อาจารย์</option>
                                                <option>นักเรียน</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {student.status == "นักเรียน" ?
                                <FormGroup>
                                            <Label for="position">ระดับชั้นการศึกษา</Label>
                                            <Input type="select" name="class" id="position" onChange={inputdata}  required>
                                            <option></option>
                                                     <option>มัธยมศึกษาปีที่ 1</option>
                                                <option>มัธยมศึกษาปีที่ 2</option>
                                                <option>มัธยมศึกษาปีที่ 3</option>
                                                <option>มัธยมศึกษาปีที่ 4</option>
                                                <option>มัธยมศึกษาปีที่ 5</option>
                                                <option>มัธยมศึกษาปีที่ 6</option>
                                            </Input>
                                        </FormGroup>
:<div></div>}
                                <FormGroup>
                                    <Label for="user_email">อีเมล</Label>
                                    <Input type="email" name="email" id="user_email" placeholder="อีเมล" onChange={inputdata} required />
                                </FormGroup>
                                <Row >
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="user_password">รหัสผ่าน</Label>
                                            <Input type="password" name="password" id="user_password" placeholder="รหัสผ่าน" onChange={inputdata} required />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="user_password_confirm">ยืนยันรหัสผ่าน</Label>
                                            <Input type="password" name="repassword" id="user_password_confirm" placeholder="ยืนยันรหัสผ่าน" onChange={inputdata} required />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                {Falsepass ? (
                                    <Alert color="danger">
                                        <a href="#" className="alert-link">รหัสผ่านไม่ตรงกัน </a>โปรดแก้ไขและลองใหม่อีกครั้ง
                                    </Alert>) : ("")}
                                <div style={{ marginTop: '5px' }}>
                                    <Button color="primary" size="lg" className="Button-Style" block>ลงทะเบียน</Button>
                                </div>
                            </Form>
                            <div className="borderline" style={{ marginTop: '20px' }} />
                            <div style={{ marginTop: '20px' }}>
                                <Row>
                                    <Col md-6>
                                        <div style={{ marginTop: '5px' }}>
                                            มีบัญชีแล้วใช่หรือไม่?
                                        </div>
                                    </Col>
                                    <Col md-6>
                                        <Button href="/login" color="secondary" size="md" className="Button-Style" outline block>เข้าสู่ระบบ</Button>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </div>

            </Container>
        </>
    )
}

export default Register;
