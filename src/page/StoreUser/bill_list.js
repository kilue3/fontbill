import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Button, Table, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import API from "../API/API";
const title = "รายชื่อบิลที่ยื่น";

const Billlist = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  if (ses.status == "store" || ses.status == null) {
    window.location.assign("/Billuser");
  }

  const [list, setlist] = useState([]);

  useEffect(() => {
    axios.get(API("BilllistAtive") + ses.id).then((response) => {
      setlist(response.data);
    });
  }, []);

  var limitday = new Date();
  const result = limitday.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
  });
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
                    <a href="/mainstore">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    รายการบิลที่แจ้งเบิก
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
                  รายการบิลที่แจ้งเบิก <b>{result}</b>
                </h5>
              </Card>
            </Card>

            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody>
                <h4>รายการบิลที่แจ้งเบิก</h4>
                <Table bordered responsive hover>
                  <thead>
                    <tr>
                      <th>วันเวลา</th>
                      <th>หมายเลขบิล </th>
                      <th>โน็ต</th>
                      <th>สถานะ</th>
                      <th>ดูรายละเอียด</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((lists) => {
                      return (
                        <>
                          <tr>
                            <td>{lists.bill_op_time}</td>

                            <th>{lists.bill_id}</th>
                            <td>{lists.bill_detail}</td>
                            {lists.bill_status == "wait" ? (
                              <>
                                <td className="status">
                                  <b>สร้างใหม่</b>
                                </td>
                              </>
                            ) : (
                              <>
                                <td
                                  className="status"
                                  style={{ color: "green" }}
                                >
                                  <b>{lists.bill_status}</b>
                                </td>
                              </>
                            )}

                            <td>
                              {" "}
                              <Button
                                color="primary"
                                href={"/Billdetailfrom/" + lists.bill_id}
                                block
                              >
                                ดูรายละเอียด{" "}
                              </Button>
                            </td>
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

export default Billlist;
