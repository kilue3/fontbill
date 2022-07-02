import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Button, Input, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";

const title = "หน้าหลักระบบผู้ดูแล";

const Adminpage = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  // if (ses.status == "นักเรียน") {
  //     window.location.assign("/");

  // }

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
                  <Input type="select" name="day" id="category" required>
                    <option value="1 ">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </Input>
                </div>
                <div className="borderline" />
                <div className="NotFoundTxtInBox">
                  <Button
                    color="danger"
                    size="lg"
                    className="Button-Style"
                    block
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
