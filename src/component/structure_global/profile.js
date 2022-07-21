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
import API from "../../page/API/API";
import Resetpass from "../../page/admin/component/resetpass";


const Profile = ({ id }) => {
  const { className } = id;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const userdata = {};
  /////////////////userget//////////////////////
  const [userinfo, setuserdata] = useState(userdata);

  useEffect(() => {
    axios.get(API("Info_user") + id).then((response) => {
      setuserdata(response.data);
    });
  }, []);
  /////////////resetpass////////////
 
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
          .delete(API("Delectuser") + id) //ส่งค่าไปแอดใน DB
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
      <div color="danger" onClick={toggle} outline>
      {session.fname} {session.lname}
      </div>
      <Form align="right">
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}> ID :    {id} </ModalHeader>
          <ModalBody>
            <FormGroup align="left">
              <h3 for="more_detail">รายละเอียดผู้ใช้</h3>

              <Card className="CardBackground-1">
                <CardBody className="">
                  
                  <div className="borderline" />
                  <div align="center" style={{ marginBottom: "10px" }}>
                    {userinfo.status == "admin" ? (
                      <Button
                        className="Button-Style"
                        color="primary"
                        style={{
                          paddingRight: "6px",
                          borderTopLeftRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                      >
                        แอดมิน
                        
                        <img
                          className="buttonMenuIcon"
                          src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                          style={{ marginRight: "0px", marginLeft: "5px" }}
                        />
                      </Button>
                    ) : (
                      <Button
                        className="Button-Style"
                        color="success"
                        style={{
                          paddingRight: "6px",
                          borderTopLeftRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                      >
                        ทั่วไป
                        <img
                          className="buttonMenuIcon"
                          src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                          style={{ marginRight: "0px", marginLeft: "5px" }}
                        />
                      </Button>
                    )}
                  </div>
                  <Row>
                    <div className="col-6" align="right">
                      ชื่อ :
                    </div>
                    <div className="col-6" align="left">
                      <b>{userinfo.fullname}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6" align="right">
                      นามสกุล :
                    </div>
                    <div className="col-6" align="left">
                      <b>{userinfo.username}</b>
                    </div>
                  </Row>
                 
                  <Row>
                    <div className="col-6" align="right">
                      เบอร์โทรศัพท์ :
                    </div>
                    <div className="col-6" align="left">
                      <b>{userinfo.tel}</b>
                    </div>
                  </Row>
                  <Row>
                    <div className="col-6" align="right">
                      สถานะ :
                    </div>
                    <div className="col-6" align="left">
                      <b>{userinfo.status}</b>
                    </div>
                  </Row>
                  <div className="borderline" />
                  <Form>
                    <div align="center">
                
                
                          <Row>
                      
                            <Col >
                                <Resetpass id={id}/>
                             
                            </Col>

                          </Row>
                    
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

export default Profile;
