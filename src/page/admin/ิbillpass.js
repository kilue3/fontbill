import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import {
  Container,
  Card,
  Button,
  Input,
  Row,
  Col,
  CardBody,
  Table,
} from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../API/API";

const title = "รายการวางบิล";

const Billpasspage = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  if (ses.status == "enable" || ses.status == null) {
    window.location.assign("/");
  }
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();

  const result = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
  });
  //   const [Billinmonth, setBillinmonth] = useState([]);
  // const data ={
  //   bmonth: month
  // }

  const [list, setlist] = useState([]);
  const [listmonth, setlistmonth] = useState([]);

  useEffect(() => {
    axios.get(API("Billpasslist")).then((response) => {
      setlist(response.data);
    });
    axios.get(API("Monthyearlist")).then((response) => {
      setlistmonth(response.data);
    });
  }, []);
  if ((ses.status == "") | (ses.status == "store")) {
    window.location.assign("/");
  }
  const getBillbymonth = (e, data) => {
    e.preventDefault();

    console.log(data);
    axios
      .get(API("Billbymonthyearlist") + data)
      .then((response) => {
        setlist(response.data);
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
                    รายการวางบิลทั้งหมด
                  </li>
                </ol>
              </nav>
              <Card className="CardHeaderStyle2">
                <Col md="6"></Col>
                <h2 style={{ margin: "0px" }}>รายการวางบิลทั้งหมด</h2>
              </Card>
            </Card>
            
            <Card className="HeaderShadow" style={{ margin: "0px" }}>
              <Card className="CardHeaderStyle">
                <Col md="6"></Col>
                <h5 style={{ margin: "0px" }}>เดือนที่มีการวางบิล
               <hr></hr>
                   <Row>
                    
                    {listmonth.map((listsm) => {
                      var limitday = new Date(listsm.year_and_month);
                      const result = limitday.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                      });
                      return (
                        <>
                          <Col md="3" sm="6">
                            <Button
                              color="warning"
                              block
                              style={{ marginTop: "10px" }}
                              onClick={(e, a) =>
                                getBillbymonth(e, listsm.year_and_month)
                              }
                            >
                              {result}
                            </Button>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </h5>
              </Card>
            </Card>
            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody>
                <h3>รายการบิลที่ผ่านการอนุมัติ</h3>
                {/* {ses.status == "admin" ? <Registerusers /> : ""} */}

                <Table bordered responsive hover>
                  <thead>
                    <tr>
                      <th>วัน-เวลา</th>
                      <th>ชื่อร้านค้า</th>
                      <th>เลขที่บิล </th>
                      <th>จำนวนเงิน</th>
                      <th>รายละเอียด</th>
                      <th>สถานะ</th>
                      <th>ดูรายละเอียด</th>

                      {/* {ses.status == "admin" ? <th>รายละเอียดผู้ใช้</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((lists) => {
                      return (
                        <>
                          <tr key={lists.bill_id}>
                            <td>{lists.bill_op_time}</td>
                            <th>{lists.Store_name}</th>

                            <th>{lists.bill_id}</th>
                            <th>{lists.bill_amount}</th>

                            <td>{lists.bill_detail}</td>

                            <td className="status">{lists.bill_status}</td>
                            <td>
                              {" "}
                              <Button
                                color="primary"
                                href={"/Billdetailfromadmin/" + lists.bill_id}
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
export default Billpasspage;
