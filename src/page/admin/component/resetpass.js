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

const Resetpass = ({ id }) => {
  const { className } = id;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  
  /////////////resetpass////////////
  const log = {
    pass: "",
    repass: "",
  };
  const [pass, setpass] = useState(log);
  const inputdata = (event) => {
    let { name, value } = event.target;
    setpass({ ...pass, [name]: value });
  };
  const Resetpassword = (e) => {
    e.preventDefault();

    var data = {
      password: pass.pass,
      repassword: pass.repass,
    }; //เอาค่าที่รับจาก form มาใส่ใน json
var minc = data.password.length;
    if(minc==8){
        if(data.password == data.repassword){
       console.log(minc)

                axios.put(API("Repassword")+ id, data) //ส่งค่าไปแอดใน DB
              .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "success") {
                 
        
                  Swal.fire(
                    "เปลี่ยนรหัสผ่านสำเร็จ",
                    "success"
                  )
                  .then(() => window.location.reload());
                } else{
                  Swal.fire(
                    "เปลี่ยนรหัสผ่านล้มเหลว",
                    "รหัสผ่านทั้งสองไม่ตรงกัน",
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
                    "รหัสผ่านทั้งสองไม่ตรงกัน",
                    "warning"
                  );
            }
    }else{
        Swal.fire(
            "เปลี่ยนรหัสผ่านล้มเหลว",
            "กรุณาตั้งรหัสผ่าน 8 หลัก",
            "warning"
          );
    }
    
    
  };
  /////////////delectuser////////////////


  return (
    <div style={{ marginTop: "0px", marginLeft: "10px" }}>
      <Button className="Button-Style" color="warning" onClick={toggle}>
        เปลี่ยนรหัสผ่าน
      </Button>
  
      <Form align="right">
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}> เปลี่ยนรหัสผ่านผู้ใช้ : {id} </ModalHeader>
          <ModalBody>
            <FormGroup align="left">
              <Card className="CardBackground-1">
                รหัสผ่านใหม่
                <Input type="password" name="pass"  min="8" max="8" onChange={inputdata} />
                ยืนยันรหัสผ่าน
                <Input type="password" name="repass"   min="8"  max="8" onChange={inputdata} />

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
              onClick={(e)=>Resetpassword(e)}
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

export default Resetpass;
