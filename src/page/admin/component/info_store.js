import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
 Col,
  Form,
  Card,
  CardBody,
  Row,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../API/API";
import Resetpassstore from "./resetpass_store";


const Info_store = ({ id }) => {
  const { className } = id;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const userdata = {};

  /////////////////userget//////////////////////
  
  const [userinfo, setuserdata] = useState(userdata);

  useEffect(() => {
    axios.get(API("Findstore") + id).then((response) => {
      setuserdata(response.data);
    });
  }, []);
 ///////////////////localstate///////////
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    uname: localStorage.getItem("username"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);
  /////////////delectuser////////////////
  function alertdelect() {
    Swal.fire({
      title: "คำเตือนลบบัญชีผู้ใช้?",
      text: "เมื่อลบบัญชีผู้ใช้นี้แล้วจะไม่สามารถใช้งานได้อีก",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API("Delectstore") + id) //ส่งค่าไปแอดใน DB
          .then((res) => {
            if (res.data.message == "success") {
              ////ต่อตรงนี้
              Swal.fire("Deleted!", "ลบบัญชีผู้สำเร็จ.", "success")
                .then(() => setModal(!modal))
                .then(() => window.location.reload());
            } else {
              Swal.fire("ลบผู้ใช้ไม่สำเร็จ", "", "error");
            }
          })

          .catch((error) => {
            console.log("error");
          }); //ใช้ ดัก Error
      }
    });
  }

  return (
    <div style={{ marginTop: "0px", marginLeft: "10px" }}>
      <Button color="success" onClick={toggle} outline>
        รายละเอียด
      </Button>
      <Form align="right">
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}> ID :    {id} </ModalHeader>
          <ModalBody>
            <FormGroup align="left">
              <h3 for="more_detail">รายละเอียดร้านค้า</h3>

              <Card className="CardBackground-1">
                <CardBody className="">
                  
                  <div className="borderline" />
                  <div align="center" style={{ marginBottom: "10px" }}>
                  
                      <Button
                        className="Button-Style"
                        color="warning"
                        style={{
                          paddingRight: "6px",
                          borderTopLeftRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                      >
                        ร้านค้า
                        <img
                          className="buttonMenuIcon"
                          src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                          style={{ marginRight: "0px", marginLeft: "5px" }}
                        />
                      </Button>
                 
                  </div>
                  <Row>
                    <div className="col-4" align="right">
                      ชื่อร้านค้า :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.store_name}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-4" align="right">
                      ชื่อผู้ติดต่อ :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.contactname}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-4" align="right">
                      Email :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.email}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-4" align="right">
                      ชื่อผู้ใช้ :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.username}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-4" align="right">
                    Address :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.Address}</b>
                    </div>
                  </Row>
                  {ses.status == "admin" ? (
                    <Row>
                      <div className="col-4" align="right">
                        รหัสผ่าน :
                      </div>
                      <div className="col-8" align="left">
                        <b>{userinfo.password}</b>
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}
                  <Row>
                    <div className="col-4" align="right">
                      เบอร์โทรศัพท์ :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.tel}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-4" align="right">
                    VendGroup :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.VendGroup}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-4" align="right">
                    TaxGroup:
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.taxGroup}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6" align="right">
                    WHT Registration ID:
                    </div>
                    <div className="col-6" align="left">
                      <b>{userinfo.BPC_WHTid}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-4" align="right">
                    BranchNo  :
                    </div>
                    <div className="col-8" align="left">
                      <b>{userinfo.BPC_BranchNo}</b>
                    </div>
                  </Row>
                  <div className="borderline" />
                  <Form>
                    <div align="center">
                
                      {userinfo.status == "admin" ? (
                        ""
                      ) : (
                        <>
                          <Row>
                            <Col md="6">
                              <Button
                                className="Button-Style"
                                color="danger"
                                outline
                                onClick={(e) => alertdelect(e)}
                              >
                                ลบบัญชีผู้ใช้
                              </Button>
                            </Col>
                            <Col md="6">
                                <Resetpassstore id={id}/>
                          
                            </Col>

                          </Row>
                        </>
                      )}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </FormGroup>
            <div align="right">
              <div style={{ maxWidth: "250px" }}></div>
            </div>
          </ModalBody>
          <ModalFooter>
           
            <Button
              color="danger"
              className="Button-Style"
              size="md"
              onClick={toggle}
            >
              ปิด
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
};

export default Info_store;
