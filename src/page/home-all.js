import React, { useState } from "react";

import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { AiFillCheckSquare } from "react-icons/ai";
import API from './API/API'

const title = "เข้าสู่ระบบ";

const Login = () => {
  const log = {
    username: "",
    password: "",
  };

  // const dispatch = useDispatch();

  const [User, setUser] = useState(log);

  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    lname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };

  const [ses, setSes] = useState(session);

  const inputdata = (event) => {
    let { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };
  const Login = (e) => {
    e.preventDefault();

    var data = {
      username: User.username,
      password: User.password,
    }; //เอาค่าที่รับจาก form มาใส่ใน json
    console.log(data);
    axios.post(API("Login"), data) //ส่งค่าไปแอดใน DB
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message == "success") {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("fname", res.data.fullname);
          localStorage.setItem("lname", res.data.username);
          localStorage.setItem("status", res.data.status);

          Swal.fire(
            "เข้าสู่ระบบสำเร็จ",
            "ยินดีต้อนรับ " + res.data.fullname,
            "success"
          )
          .then(() => window.location.assign("/adminpage"));
        } else{
          Swal.fire(
            "เข้าสู่ระบบล้มเหลว",
            "ชื่อผู้ใช้หรือรหัสผ่านผิด โปรดลองใหม่อีกครั้ง ",
            "warning"
          );
          // .then(() => window.location.reload())
        } 
      })

      .catch((error) => {
        console.log("error");
      }); //ใช้ ดัก Error
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Container className="container-fluid TZS-Container">
        <div align="center" style={{ marginTop: "100px" }}>
          {/* <a href="/home">
                        <h4>ระบบวางบิลออนไลน์</h4>

                    </a> */}
        </div>
        <div align="center" style={{ marginTop: "30px" }}>
          <Card
            className="CardBackground-1"
            style={{ maxWidth: "500px" }}
            align="left"
          >
            <CardBody className="">
              <h4 align="center">
                <AiFillCheckSquare />
                ระบบวางบิล<h5>Online</h5>
              </h4>
              <div className="borderline" />
              <form onSubmit={Login}>
                <FormGroup>
                  <Label for="exampleEmail">ชื่อผู้ใช้</Label>
                  <Input
                    Type="email"
                    name="username"
                    placeholder="ใส่ชื่อผู้ใช้"
                    onChange={inputdata}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">รหัสผ่าน</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="ใส่รหัสผ่านที่นี่"
                    onChange={inputdata}
                    required
                  />
                </FormGroup>
                <div style={{ marginTop: "20px" }}>
                  <Row>
                    {/* <Col md-6>
                                            <Button color="link" href="/Resetpassword" size="md" className="Button-Style">ลืมรหัสผ่าน?</Button>
                                        </Col> */}
                    <Col md-6>
                      <Button
                        color="success"
                        size="lg"
                        className="Button-Style"
                        block
                      >
                        เข้าสู่ระบบ
                      </Button>
                    </Col>
                  </Row>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Login;
