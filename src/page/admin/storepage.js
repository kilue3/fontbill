import React, { useState, useEffect } from "react";
import StaffLeftMenu from "../../component/staff_page/left_menu";
import {
  Container,
  Card,
  Button,
  Table,
  Row,
  Col,
  CardBody,
  Input,
} from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../../component/structure_global/navbar";
import axios from "axios";
import Info_store from "./component/info_store";
import API from "../API/API";
import Registerstore from "./component/regis_store";
import Userlist from "./component/userlist";

const title = "บัญชีร้านค้าในระบบทั้งหมด";

const Storepage = () => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  const [list, setlist] = useState([]);

  if (ses.status == "enable" || ses.status == null) {
    window.location.assign("/");
  }
  ///////////////////////userlisr///////////////////////////
  const [User, setUser] = useState([]);

  useEffect(() => {
    axios.get(API("Storelist")).then((response) => {
      setUser(response.data);
    });
  }, []);
  ////////////////////////search////////////////////////////
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

    axios
      .get(API("SearchNameStore") + id) //ส่งค่าไปแอดใน DB
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
                    บัญชีร้านค้าในระบบทั้งหมด
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
                  บัญชีร้านค้าในระบบทั้งหมด
                </h5>
              </Card>
            </Card>
            <Card className="HeaderShadow" style={{ margin: "0px" }}>
              <Card className="CardHeaderStyle">
                <Col md="6"></Col>
                <h5 style={{ margin: "0px" }}>
                  ค้นหาผู้ใช้ในระบบ
                  <hr></hr>
                  <Row>
                    <Col md="6">
                      <Input
                        type="text"
                        name="search"
                        placeholder="กรุณากรอกชื่อร้านค้า"
                        onChange={inputdata}
                      ></Input>
                    </Col>
                    <Col lg="3" md="6">
                      <Button
                        color="warning"
                        block
                        style={{ marginTop: "5px" }}
                        onClick={(e) => Searchbill(e)}
                      >
                        ค้นหา
                      </Button>
                    </Col>
                  </Row>
                </h5>
              </Card>
            </Card>
            <Card className="CardBackground-1" style={{ margin: 10 }}>
              <CardBody>
                {ses.status == "admin" ? <Registerstore /> : ""}
                <Table bordered responsive hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ชื่อร้านค้า </th>
                      <th>Username</th>
                      {ses.status == "admin" || ses.status == "normal" ? (
                        <th>รายละเอียดร้านค้า</th>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {list == "" ? (
                      <>
                        <Userlist id={User} />
                      </>
                    ) : (
                      <></>
                    )}

                    {list.message == "success" ? (
                      <>
                        {list.data.map((lists) => {
                          return (
                            <>
                              <tr>
                                <th>{lists.Store_id}</th>

                                <td>{lists.Store_name}</td>
                                <td>{lists.Store_username}</td>
                                <td>
                                  {" "}
                                  {ses.status == "admin" ||
                                  ses.status == "normal" ? (
                                    <Info_store id={lists.Store_id} />
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                       
                      </>
                    )}

{list.message == "notfound"  ? (
                      <>
                        <br></br>
                        <h5 align="center">ไม่พบร้านค้าที่ค้นหา</h5>
                      </>
                    ) : (
                      <></>
                    )}
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

export default Storepage;
