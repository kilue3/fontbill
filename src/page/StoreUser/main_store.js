import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Row, Col, CardBody, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../API/API";
import Op_bill from "./component/opbill"
const title = "ระบบวางบิลออนไลน์";

const MainStorepage = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);

  
  //////////////check status/////////////////
  if (ses.status == "admin" || ses.status == null) {
    window.location.assign("/");
  }
  
  /////////////////checkdate///////////////////////////
  var today = new Date();
  const D = today.toISOString().substring(0, 10);
  console.log(today);


  const [Checktime, setChecktime] = useState([]);
  const [Dateshow, setDateshow] = useState([]);
  const [Limitdays, setLimitdays] = useState([]);

  const data = {
    date: D,
  };
  const page = () => {
    axios.post(API("Checkdate"), data).then((response) => {
      setChecktime(response.data);
      console.log(Checktime.message)

    });
    axios.get(API("Today")).then((response) => {
        setDateshow(response.data);
      });
      axios.get(API("Dateshows")).then((response) => {
        setLimitdays(response.data);
      });
  };

  console.log(Dateshow.Days)
  useEffect(() => {
    page();
  }, []);


  var limitday = new Date(Dateshow.Days);
  const result = limitday.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })


  if(Checktime.message ==="intime"){
    return (
        <>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <NavBar />
    
          <div style={{ margin: 10 }}></div>
          <Container className="container-fluD TZS-Container">
            <Row>
              <Col lg="3" className="col-ContentSetting">
                <StaffLeftMenu />
              </Col>
    
              <Col lg="9" className="col-ContentSetting">
                <Card className="HeaderShadow">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb BreadcrumbStyle">
                      <li className="breadcrumb-item">
                        <a href="/mainstore">หน้าหลัก</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        ระบบวางบิลออนไลน์
                      </li>
                    </ol>
                  </nav>
                  <Card className="CardHeaderStyle">
                    <h5 style={{ margin: "0px" }}>
                      <img
                        className="header-1-Icon"
                        src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                      />
                      ระบบวางบิลออนไลน์
                    </h5>
                  </Card>
                </Card>
    
                <Card className="CardBackground-1" style={{ margin: 10 }}>
                  <CardBody className="CardBody-WithBoxContent">
                    <h3>สร้างเอกสารวางบิลภายในวันที่ 1-{result}</h3>
                    <br></br>
                    <div class="quantity">
                      <Op_bill props={""}/>
                    </div>
                    <div className="borderline" />
                    <div className="NotFoundTxtInBox">
                   
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
  }else{
    return (
        <>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <NavBar />
    
          <div style={{ margin: 10 }}></div>
          <Container className="container-fluD TZS-Container">
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
                        ระบบวางบิลออนไลน์
                      </li>
                    </ol>
                  </nav>
                  <Card className="CardHeaderStyle">
                    <h5 style={{ margin: "0px" }}>
                      <img
                        className="header-1-Icon"
                        src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                      />
                      ระบบวางบิลออนไลน์
                    </h5>
                  </Card>
                </Card>
    
                <Card className="CardBackground-1" style={{ margin: 10 }}>
                  <CardBody className="CardBody-WithBoxContent">
                    <h1 class="animate-charcter" align="center">ระบบวางบิลออนไลน์ยังไม่เปิดใช้งาน สามารถใช้งานได้วันที่ 1-{Limitdays.Days}</h1>
                    <div class="quantity">
                      
                    </div>
                
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
  }
 
};

export default MainStorepage;
