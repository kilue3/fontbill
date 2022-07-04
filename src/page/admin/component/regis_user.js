import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Form,
  Card,
  Row,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../API/API";

const Registerusers = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  /////////////resetpass////////////
  const log = {
    pass: "",
    fullname: "",
    username: "",
    tel: "",
    status: "admin",
  };
  const [Users, setUsers] = useState(log);
  const inputdata = (event) => {
    let { name, value } = event.target;
    setUsers({ ...Users, [name]: value });
  };
 
  const register = (e) => {
    e.preventDefault();

    var data = {
      fullname: Users.fullname,
      username: Users.username,
      tel: Users.tel,
      status: Users.status,
      password: Users.pass,
    };
    var minc = data.password.length;
    if(data.fullname!= ""||data.username!= ""||data.tel!=""||data.password!=""||data.status!=" " ){
        if(minc==8){
    
                    axios.post(API("Registerusers"), data) //ส่งค่าไปแอดใน DB
                  .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
    
                      Swal.fire(
                        "แอด user สำเร็จ",
                        "success"
                      )
                      .then(() => window.location.reload());
                    } else{
                      Swal.fire(
                        "เแอด user ล้มเหลว",
                        "ขื่อผู้ใช้นี้มีอยู่ในระบบอยู้แล้ว",
                        "warning"
                      );
                      // .then(() => window.location.reload())
                    }
                  })
    
                  .catch((error) => {
                    console.log("error");
                  }); //ใช้ ดัก Error
             
        }else{
            Swal.fire(
                "เปลี่ยนรหัสผ่านล้มเหลว",
                "กรุณาตั้งรหัสผ่าน 8 หลัก",
                "warning"
              );
        }
    }else{
        Swal.fire(
            "เพิ่มผู้ใช้ใหม่ล้มเหลว",
            "กรุณากรอกข้อมูลให้ครบ",
            "warning"
          );
    }
    
  };
  /////////////delectuser////////////////

  return (
    <div style={{ marginTop: "0px", marginLeft: "10px" }}>
      <Button
        outline
        color="info"
        size="md"
        style={{ marginBottom: 10 }}
        onClick={toggle}
      >
        เพิ่มผู้ใช้งานในระบบ
      </Button>

      <Form align="right">
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}> เพิ่มผู้ใช้งานในระบบ </ModalHeader>
          <ModalBody>
            <FormGroup align="left">
              <Card className="CardBackground-1">
                ชื่อ-สกุล
                <Input type="text" name="fullname" onChange={inputdata} />
                ชื่อผู้ใช้
                <Input type="text" name="username" onChange={inputdata} />
                รหัสผ่าน
                <Input
                  type="password"
                  name="pass"
                  min="8"
                  max="8"
                  onChange={inputdata}
                />
                status
                <Input
                  type="select"
                  name="status"
                  id="title"
                  onChange={inputdata}
                  required
                >
                  <option value="admin">admin</option>
                  <option value="normal">normal</option>
                </Input>
                Tel
                <Input type="text" name="tel" onChange={inputdata} />
              </Card>
            </FormGroup>
            <div align="right">
              <div style={{ maxWidth: "250px" }}></div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="Button-Style"
              size="md"
              onClick={(e) => register(e)}
            >
              ตกลง
            </Button>
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

export default Registerusers;
