import React, { useState } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Button, Input, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../API/API";

const title = "หน้าหลักระบบผู้ดูแล";

const Adminpage = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const log = {
    date: "",

  };
  const [billdate, setbilldate] = useState(log);
  const inputdata = (event) => {
    let { name, value } = event.target;
    setbilldate({ ...billdate, [name]: value });
  };
  var today = new Date();
 const D = today.toISOString().substring(0, 10);
    console.log(D)

  const [ses, setSes] = useState(session);
  if (ses.status == "store") {
      window.location.assign("/");

  }
  const Opbill = (e) => {
    e.preventDefault();

    var data = {
     opdate: D,
     enddate: billdate.date
    }
    console.log(data)
    if(data.enddate =="")
    
    {
      Swal.fire(
            "กำหนดวันแจ้งเปิดบิลล้มเหลว",
            "กรุณาระบุวันหมดเขตการส่งบิล",
            "warning"
          );
       }else{
        axios.post(API("Opbill"), data) //ส่งค่าไปแอดใน DB
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
    
            Swal.fire(
              "แจ้งกำหนดการเปิดบิลสำเร็จ",
              "success"
            )
            .then(() => window.location.reload());
          } 
       }
    )}
    
    
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavBar />

      <div style={{ margin: 10 }}></div>
      <Container className="container-fluid TZS-Container">
        <Row>
          <Col lg="3" className="col-ContentSetting">
            <StaffLeftMenu />
          </Col>

          <Col lg="9" className="col-ContentSetting">
            <Card className="HeaderShadow">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb BreadcrumbStyle">
                  <li className="breadcrumb-item">
                    <a href="/adminpage">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    หน้าหลักระบบผู้ดูแล
                  </li>
                </ol>
              </nav>
              <Card className="CardHeaderStyle">
                <h5 style={{ margin: "0px" }}>
                  <img
                    className="header-1-Icon"
                    src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                  />
                  หน้าหลักระบบผู้ดูแล
                </h5>
              </Card>
            </Card>
            {/* <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                ดูภาพรวมของระบบ
                            </CardBody>
                        </div> */}

            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody className="CardBody-WithBoxContent">
                สร้างเอกสารวางบิลภายในวันที่{" "}
                <div class="quantity">
                  <Input type="date" name="date" id="category" onChange={inputdata} required/>
                  
                </div>
                <div className="borderline" />
                <div className="NotFoundTxtInBox">
                  <Button
                    color="danger"
                    size="lg"
                    className="Button-Style"
                    block
                    onClick={(e)=>Opbill(e)}
                  >
                    บันทึก
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Adminpage;
