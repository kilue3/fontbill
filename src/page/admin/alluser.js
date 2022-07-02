import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Button, Table, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import Info_user from "./info_user";
const title = "ผู้ใช้ในระบบทั้งหมด";

const Alluser = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  const [User, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/Mback/public/allusers").then((response) => {
      setUser(response.data);
    });
  }, []);
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
                    ผู้ใช้งานในระบบ
                  </li>
                </ol>
              </nav>
              <Card className="CardHeaderStyle">
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
                <Table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ชื่อ เต็ม </th>
                      <th>ชื่อผู้ใช้ </th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {User.map((list) => {
                      return (
                        <>
                          <tr>
                            <th>{list.id}</th>
                            <td>{list.fullname}</td>
                            <td>{list.username}</td>
                            <td>{list.status}</td>
                            {ses.status == "admin" ? (
                              <Info_user id= {list.id} />
                            ) : (
                              ""
                            )}
                          </tr>
                        </>
                      );
                    })}
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

export default Alluser;
