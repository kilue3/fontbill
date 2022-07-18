import React, { useState, useEffect } from "react";
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
  const [ses, setSes] = useState(session);
  ////////////////////////state date/////////////////////
  const log = {
    date: "",
  };
  const [billdate, setbilldate] = useState(log);
  const inputdata = (event) => {
    let { name, value } = event.target;
    setbilldate({ ...billdate, [name]: value });
  };

  //////////////check status/////////////////
  if (ses.status == "enable" || ses.status == null ) {
    window.location.assign("/");
  }

  ///////////กำหนดวันหมดเขตบิล/////////
  const Opbill = (e) => {
    e.preventDefault();
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const op_date = [year, month + 1, "1"].join("/");

    const withSlashes = [year, month + 1, billdate.date].join("/");
    console.log(withSlashes);
    var data = {
      opdate: op_date,
      enddate: withSlashes,
    };
    console.log(data);
    if (billdate.date == "") {
      Swal.fire(
        "กำหนดวันแจ้งเปิดบิลล้มเหลว",
        "กรุณาระบุวันหมดเขตการส่งบิล",
        "warning"
      );
    } else {
      axios
        .put(API("Billend"), data) //ส่งค่าไปแอดใน DB
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            Swal.fire("แจ้งกำหนดการเปิดบิลสำเร็จ", "success").then(() =>
              window.location.reload()
            );
          }
        });
    }
  };
  /////////////////checkdate///////////////////////////
  var today = new Date();
  const D = today.toISOString().substring(0, 10);
  console.log(D);
  const dayss = {
    time: "",
  };

  const [Checktime, setChecktime] = useState([]);
  const [Dateshow, setDateshow] = useState([]);
  const data = {
    date: D,
  };
  const page = () => {
    axios.post(API("Checkdate"), data).then((response) => {
      setChecktime(response.data);
    });

    axios.get(API("Dateshows")).then((response) => {
      setDateshow(response.data);
    });
  };
  useEffect(() => {
    page();
    // ใช้updateProductsบรรทัด 7
  }, []);
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

            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody className="CardBody-WithBoxContent">
                สร้างเอกสารวางบิลภายในวันที่{" "}
                <div class="quantity">
                  <Input
                    type="select"
                    name="date"
                    id="exampleSelectMulti"
                    onChange={inputdata}
                    required
                  >
                    <option>{Dateshow.Days}</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                  </Input>
                </div>
                <div className="borderline" />
                <div className="NotFoundTxtInBox">
                  <Button
                    color="danger"
                    size="lg"
                    className="Button-Style"
                    block
                    onClick={(e) => Opbill(e)}
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
