import React, { useState } from 'react';

import { Container, Card, CardBody, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

const title = 'เข้าสู่ระบบ';

const Login = () => {
    const log = {
        email: "",
        password: "",


    };



    // const dispatch = useDispatch();



    const [User, setUser] = useState(log);


    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status'),

        img: localStorage.getItem('img')
    }

    const [ses, setSes] = useState(session);

    const inputdata = (event) => {
        let { name, value } = event.target;
        setUser({ ...User, [name]: value });


    }
    const saveStudent = (e) => {
        e.preventDefault()

        var data = {


            email: User.email,
            password: User.password,



        };//เอาค่าที่รับจาก form มาใส่ใน json

        axios.post("http://localhost:8080/Mback/public/Login", data)//ส่งค่าไปแอดใน DB
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "Student") {
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('fname', res.data.fname);
                    localStorage.setItem('lname', res.data.lname);
                    localStorage.setItem('status', res.data.status);
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem('img', res.data.status);



                    Swal.fire(
                        'เข้าสู่ระบบสำเร็จ',
                        'ยินดีต้อนรับ ' + res.data.fname + ' ' + res.data.lname,
                        'success'
                    )

                        .then(() => window.location.assign("/"))

                }
                else if (res.data.message == "Teacher") {
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('fname', res.data.fname);
                    localStorage.setItem('lname', res.data.lname);
                    localStorage.setItem('status', res.data.status);

                    localStorage.setItem('img', res.data.status);

                    Swal.fire(
                        'เข้าสู่ระบบสำเร็จ',
                        'ยินดีต้อนรับ คุณครู ' + res.data.fname + ' ' + res.data.lname,
                        'success'
                    )
                        .then(() => window.location.assign("/"))
                }
                else if (res.data.message == "wait") {

                    Swal.fire(

                        'เข้าสู่ระบบล้มเหลว',
                        'บัญชีของคุณอยู่ระหว่างการตรวจสอบ โปรดรอการตรวจสอบบัญชี'
                        ,
                        'warning'
                    )
                        .then(() => window.location.reload())
                } else {

                    Swal.fire(
                        'เข้าสู่ระบบล้มเหลว',
                        'อีเมลหรือรหัสผ่านผิด โปรดลองใหม่อีกครั้ง',
                        'error'
                    )
                }

            })

            .catch((error) => {
                console.log("error");
            });//ใช้ ดัก Error

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
                                เข้าสู่ระบบ
                            </h4>
                            <div className="borderline" />
                            <form onSubmit={saveStudent} >
                                <FormGroup>
                                    <Label for="exampleEmail">อีเมล</Label>
                                    <Input Type="email" name="email" placeholder="ใส่อีเมลที่นี่" onChange={inputdata} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">รหัสผ่าน</Label>
                                    <Input type="password" name="password" placeholder="ใส่รหัสผ่านที่นี่" onChange={inputdata} required />
                                </FormGroup>
                                <div style={{ marginTop: '20px' }}>
                                    <Row>
                                        <Col md-6>
                                            <Button color="link" href="/Resetpassword" size="md" className="Button-Style">ลืมรหัสผ่าน?</Button>
                                        </Col>
                                        <Col md-6>
                                            <Button color="success" size="lg" className="Button-Style" block>เข้าสู่ระบบ</Button>
                                        </Col>
                                    </Row>
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

export default Login;
