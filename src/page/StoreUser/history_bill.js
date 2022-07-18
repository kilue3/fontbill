import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Button, Input, Row, Col, CardBody ,Table} from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../API/API";

const title = "ประวัติการวางบิล";

const History_bill = () => {
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
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();

  const result = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
  
  })
//   const [Billinmonth, setBillinmonth] = useState([]);
// const data ={
//   bmonth: month
// }

  const [list, setlist] = useState([]);
  useEffect(() => {
    axios.get(API("Billhistory")+ses.id).then((response) => {
      setlist(response.data);
    });
    
    // axios.post(API("Billinmonth"),data).then((response) => {
    //   setlist(response.data);
    // });
  }, []);
  if (ses.status == "" | ses.status =="store") {
      window.location.assign("/");

  }
  

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
                  รายการวางบิลประจำเดือน 
                </h5>
              </Card>
            </Card>

            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody>
                {/* {ses.status == "admin" ? <Registerusers /> : ""} */}

                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>วัน-เวลา</th>
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
                          <tr>
                            <td>{lists.bill_op_time}</td>
 <th>{lists.bill_id}</th>
                            <th>{lists.bill_amount}</th>

                            <td>{lists.bill_detail}</td>
                            {lists.bill_status =="wait" ? (<><td className="status">สร้างใหม่</td></>):(<>
                            
                              <td className="status">{lists.bill_status}</td></>)}
                            

                            <td>
                              {" "}
                              <Button color="primary" href={"/Billdetailfrom/"+lists.bill_id} block>
ดูรายละเอียด                              </Button>
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
export default History_bill;
