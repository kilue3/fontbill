import React, { useState } from 'react';
import { Container, Card, CardBody, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2';
import axios from 'axios';

const Reset_pass = () => {
    const title = 'เปลี่ยนรหัสผ่าน';
    const log = {
        email: "",
        pass: "",
        re_pass: "",

    };



    const [Email, setEmail] = useState(log);

    const [Step, setStep] = useState("1");


    const inputdata = (event) => {
        let { name, value } = event.target;
        setEmail({ ...Email, [name]: value });


    }
    const nextStep = (e) => {
        e.preventDefault()
        setStep('2');
    }
    const backStep = (e) => {
        e.preventDefault()
        setStep('1');
    }
    const saveStudent = (e) => {
        e.preventDefault()

        var data = {
            email: Email.email,
            pass: Email.pass,
            repass: Email.re_pass,
        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data.pass == data.repass) {
            axios.post("http://localhost:8080/Mback/public/Resetpass", data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    if (res.data.message == "suscess") {


                        Swal.fire(
                            'แจ้งเตือน',
                            'เปลี่ยนรหัสผ่านสำเร็จ',
                            'success'
                        )
                            .then(() => window.location.assign("/"))

                    }

                    else {

                        Swal.fire(
                            'เปลี่ยนรหัสผ่านล้มเหลว',
                            'ไม่พบอีเมลที่ระบุ',
                            'error'
                        )
                    }

                })

                .catch((error) => {
                    console.log("error");
                });
        } else {
            Swal.fire(
                'เปลี่ยนรหัสผ่านล้มเหลว',
                'รหัสผ่านทั้งสองไม่ตรงกัน',
                'error'
            )
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
                    <Card className="CardBackground-1" style={{ maxWidth: '500px' }} align="left">
                        <CardBody className="">
                            <h4>
                                <img className="Button-icon" style={{ marginRight: '10px' }} src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                เปลี่ยนรหัสผ่าน
                            </h4>
                            <div className="borderline" />
                            <form onSubmit={saveStudent} >
                                {Step == "1" ?
                                    <FormGroup>
                                        <Label for="exampleEmail">อีเมล</Label>
                                        <Input Type="email" name="email" value={Email.email} placeholder="ใส่อีเมลที่นี่" onChange={inputdata} required />
                                        <br></br>
                                        <Row>
                                            <Col md-6>
                                                <Button color="primary" size="md" className="Button-Style" block onClick={nextStep}>ถัดไป</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    :
                                    <FormGroup>
                                        <Label for="exampleEmail">รหัสผ่าน</Label>
                                        <Input type="password" value={Email.pass} name="pass" placeholder="ใส่รหัสผ่านที่นี่" onChange={inputdata} required />
                                        <Label for="exampleEmail">ยืนยันรหัสผ่าน</Label>
                                        <Input type="password" value={Email.re_pass} name="re_pass" placeholder="ยืนยันรหัสผ่านที่นี่" onChange={inputdata} required />
                                        <br></br>
                                        <Row>
                                            <Col md-6>
                                                <Button color="danger" size="md" className="Button-Style" block onClick={backStep}>ย้อนกลับ</Button>
                                            </Col>

                                            <Col md-6>
                                                <Button color="success" size="md" className="Button-Style" block onClick={saveStudent}>ยืนยัน</Button>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                }
                                <div style={{ marginTop: '20px' }}>

                                </div>
                            </form>
                            <div className="borderline" style={{ marginTop: '20px' }} />
                            <div style={{ marginTop: '20px' }}>
                                <Row>
                                    <Col md-6>
                                        <div style={{ marginTop: '5px' }}>
                                            ยังไม่มีบัญชีใช่หรือไม่?
                                        </div>
                                    </Col>
                                    <Col md-6>
                                        <Button href="/register" color="secondary" size="md" className="Button-Style" outline block>ลงทะเบียน</Button>
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

export default Reset_pass
