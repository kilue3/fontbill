import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Button, Input, Row, Col, CardBody ,Table} from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../API/API";

const title = "รายการวางบิล";

const Billpage = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  if (ses.status == "store" || ses.status == null) {
    window.location.assign("/");
  }

  const [User, setUser] = useState([]);
  useEffect(() => {
    axios.get(API("Showlistnameusers")).then((response) => {
      setUser(response.data);
    });
  }, []);
  // if (ses.status == "นักเรียน") {
  //     window.location.assign("/");

  // }
  var today = new Date();

  const result = today.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

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
                    รายการวางบิลประจำเดือน 
                  </li>
                </ol>
              </nav>
              <Card className="CardHeaderStyle">
                <Col md="6"></Col>
                <h5 style={{ margin: "0px" }}>
                  <img
                    className="header-1-Icon"
                    src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
                  />
                  ผู้ใช้งานในระบบ
                </h5>
              </Card>
            </Card>

            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody>
                {/* {ses.status == "admin" ? <Registerusers /> : ""} */}

                <Table bordered>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ชื่อ เต็ม </th>
                      <th>ชื่อผู้ใช้ </th>
                      <th>สถานะ</th>

                      {ses.status == "admin" ? <th>รายละเอียดผู้ใช้</th> : ""}
                    </tr>
                  </thead>
                  <tbody>
                    {/* {User.map((list) => {
                      return (
                        <>
                          <tr>
                            <th>{list.id}</th>
                            <td>{list.fullname}</td>
                            <td>{list.username}</td>
                            <td>{list.status}</td>
                            <td>
                              {" "}
                              {ses.status == "admin" ? (
                                <Info_user id={list.id} />
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        </>
                      );
                    })} */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Billpage;
