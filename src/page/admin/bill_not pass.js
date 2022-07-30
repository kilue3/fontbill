import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import { Container, Card, Button, Input, Row, Col, CardBody ,Table} from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import API from "../API/API";
import Billlist from "./component/ิbillpass_list"
const title = "รายการวางบิล";

const Bill_notpass_page = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  if (ses.status == "enable" || ses.status == null ) {
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
    axios.get(API("Billnotpasslist")).then((response) => {
      setlist(response.data);
    });
    
   
  }, []);
  if (ses.status == "" | ses.status =="store") {
      window.location.assign("/");

  }
  
////////////////////search/////////////
const initSearch = {
  search: "",
};
const [Search, setSearch] = useState(initSearch);
const inputdata = (event) => {
  let { name, value } = event.target;
  setSearch({ ...Search, [name]: value });
};

const Searchbill = (e) => {
  e.preventDefault();
  var id = Search.search;
 
     axios.get(API("SearchIDbillnotpass")+ id ) //ส่งค่าไปแอดใน DB
            .then((res) => {
              setlist(res.data);
             
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
                    รายการวางบิลที่ไม่ผ่านการอนุมัติ
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
                  รายการวางบิลที่ไม่ผ่านการอนุมัติ 
                </h5>
              </Card>
            </Card>
            <Card className="HeaderShadow" style={{ margin: "0px" }}>
              <Card className="CardHeaderStyle">
                <Col md="6"></Col>
                <h5 style={{ margin: "0px" }}>
                  ค้นหาหมายเลขบิล
                  <hr></hr>
                  <Row>
                    <Col md="6">
                  
                      <Input type="text" name="search" placeholder="กรุณากรอกหมายเลขบิล" onChange={inputdata}></Input>
                    </Col>
                    <Col lg="3" md="6">
                  
                  <Button color="warning" block style={{ marginTop: "5px" }} onClick={(e)=>Searchbill(e)}>ค้นหา</Button>
                </Col>
                  </Row>
                </h5>
              </Card>
              </Card>
            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody>
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
                  {list.message == "notfound" ? <>
                  <div className="NotFoundTxtInBox">
                    <div Align="center"><b>ไม่พบหมายเลขบิลไม่ผ่านการอนุมัติ</b></div> 
                    </div>{" "}
                  </> : <>
                  <Billlist id={list}/>
                  </>}
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
export default Bill_notpass_page;
