import React, { useState ,useEffect} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Form,
  Card
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../API/API";

const Edit_Detail = ({ id }) => {
  const { className } = id;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const initBill = {};
  const [Bill, setBill] = useState(initBill);
  const page = () => {
    axios.get(API("Billid") + id).then((response) => {
      setBill(response.data);
    });
  };
  useEffect(() => {
    page();
  }, [id]);
  /////////////////////
  const log = {
    newdetail: "",
  };
  const [amount, setamount] = useState(log);
  const inputdata = (event) => {
    let { name, value } = event.target;
    setamount({ ...amount, [name]: value });
  };
  const Resetpassword = (e) => {
    e.preventDefault();

    var data = {
        newdetail: amount.newdetail,
    }; //เอาค่าที่รับจาก form มาใส่ใน json
  
        if(id != null){

                axios.put(API("Editdetailbill")+ id, data) //ส่งค่าไปแอดใน DB
              .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "success") {
                 
        
                  Swal.fire(
                    "แก้ไขรายละเอียดบิลสำเร็จ",
                    "success"
                  )
                  .then(() => window.location.reload());
                } else if (res.data.message == "notfound"){
                  Swal.fire(
                    "แก้ไขรายละเอียดบิลไม่สำเร็จ",
                    "ไม่พบเลขที่บิลนี้ในระบบ",
                    "warning"
                  );
                  // .then(() => window.location.reload())
                } else{
                    Swal.fire(
                        "แก้ไขรายละเอียดบิลไม่สำเร็จ",
                        
                        "warning"
                      );
                }
              })
        
              .catch((error) => {
                console.log("error");
              }); //ใช้ ดัก Error
            }else{
                Swal.fire(
                    "แก้ไขรายละเอียดบิลไม่สำเร็จ",
                    "ไม่พบเลขที่บิลนี้ในระบบ",
                    "warning"
                  );
            }
    
    
    
  };
  /////////////delectuser////////////////


  return (
    <div style={{ marginTop: "0px", marginLeft: "10px" }}>
      <Button className="Button-Style" color="warning" onClick={toggle}>
        แก้ไขรายละเอียดบิล
      </Button>
  
      <Form align="right">
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}> แก้ไขรายละเอียดบิล : {id} </ModalHeader>
          <ModalBody>
            <FormGroup align="left">
              <Card className="CardBackground-1">
                รายละเอียดก่อนแก้ไข :{Bill.billDetail} <br></br>
                รายละเอียดใหม่
                <Input type="textarea" name="newdetail"    onChange={inputdata} />

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

export default Edit_Detail;
