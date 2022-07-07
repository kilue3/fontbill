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
  CardBody,Input,
  Row,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../API/API";

const Op_bill = ({ props }) => {
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const userdata = {};
///////////date///////////////////////
const date = new Date();  // 2009-11-10
const month = date.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
  });
console.log(month);

  const inputdata = (event) => {
    let { name, value } = event.target;
    setbill({ ...bill, [name]: value });
  };
  ///////////////////localstate///////////
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    username: localStorage.getItem("username"),
    conname:localStorage.getItem("conname"),
    status: localStorage.getItem("status"),
  };
  const [ses, setSes] = useState(session);

  const logs = {
    bill_id: "",
    number: "",
    note: "",
    store_id: ses.id,
  };
 
  const [bill, setbill] = useState(logs);
  /////////////delectuser////////////////
  const opbill = (e) => {
    e.preventDefault();

    var data = {
      bill_id: bill.bill_id,
      bill_detail: bill.note,
      store_id: bill.store_id,
      number: bill.number,
    };
    if(data.bill_id!= ""||data.bill_detail!= ""||data.store_id!=""||data.number!="" ){
      
    
                    axios.post(API("Addbills"), data) //ส่งค่าไปแอดใน DB
                  .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
    
                      Swal.fire(
                        "เปิดบิลสำเร็จ",
                        "success"
                      )
                      .then(() => window.location.reload());
                    } else{
                      Swal.fire(
                        "เปิดบิลล้มเหลว",
                        "หมายเลขบิลนี้ได้เเจ้งเปิดบิลแล้ว",
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
            "เพิ่มผู้ใช้ใหม่ล้มเหลว",
            "กรุณากรอกข้อมูลให้ครบ",
            "warning"
          );
    }
}

  return (
    <div style={{ marginTop: "0px", marginLeft: "10px" }}>
      <Row>
        <Col sm="12">
          {" "}
          <Button
            color="danger"
            size="lg"
            className="Button-Style"
            onClick={toggle}
            block
          >
            ยื่นวางบิล{" "}
          </Button>
        </Col>
      </Row>

      <Form align="right">
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>ยื่นเรื่องวางบิล </ModalHeader>
          <ModalBody>
            <FormGroup align="left">
              <h3 for="more_detail">ยืนวางบิลประจำเดือน {month}</h3>

              <Form align="right">
          <ModalBody>
            <FormGroup align="left">
              <Card className="CardBackground-1">
                ชื่อ-สกุล :
               คุณ {ses.conname} {"(" + ses.fname + ")"}<br></br>
                เลขเลขสาร (เฉพาะใบเบิก)
                <Input type="text" name="bill_id" placeholder="กรุณากรอกเลขใบเบิก" onChange={inputdata} />
                ยอดรวมเงิน
                <Input
                  type="number"
                  name="number"
                  placeholder="กรุณากรอกยอดที่ต้องการเรียกเก็บเงิน"
                  onChange={inputdata}
                />
                บันทึกข้อความ(โน็ต)
                <Input
                  type="textarea"
                  name="note"
                  id="title"
                  onChange={inputdata}
                  required
                >
                  <option value="admin">admin</option>
                  <option value="normal">normal</option>
                </Input>
                
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
              onClick={(e) =>opbill(e)}
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
      </Form>
            </FormGroup>
            <div align="right">
              <div style={{ maxWidth: "250px" }}></div>
            </div>
          </ModalBody>
         
        </Modal>
      </Form>
    </div>
  );
};

export default Op_bill;
