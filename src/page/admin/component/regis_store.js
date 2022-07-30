import React, { useState, useEffect } from "react";
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
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../../API/API";

const Registerstore = (props) => {
  const { className } = props;
  const [SearchStores, setSearchStores] = useState(); //เซตเป็นค่าว่างเพื่อในการเก็บค่าที่เปลี่ยนแปลงจาก handleChange

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [Stores, setStores] = useState([]);
  const [Message, setMessage] = useState([]);
  const [Storeinfo, setStoreinfo] = useState([]);

  ////////////////////search///////////////////////////
  const handleChange = (event) => {
    setSearchStores(event.target.value); //รับค่าจาก value ที่กรอกข้อมูลมาและเตรียมเปลี่ยนค่ามาเป็นข้อมูลที่ต้องการ
  };

  useEffect(() => {
    axios
      .get(API("SearchStore") + SearchStores) //โดย axios นั่นดึงค่า url
      .then((response) => {
        //ใช้ตัวแปรค่า คือ responseเพื่อเก็บค่า

        setStores(response.data); // เก็บค่า response หลังจาก ดึงค่าข้อมูลผลลัพธ์
      });
  }, [SearchStores]);
  // useEffect(() => {
  //   axios.get(API("Getstore")).then((response) => {
  //     setStores(response.data);
  //   });
  // }, []);

  const checkID = {
    Id: "",
  };
  const [Checkid, setCheckid] = useState(checkID);
  
  const CheckIds = (e,aid) => {
    e.preventDefault();

    var id = aid;
    if (id != "") {
      axios
        .get(API("CheckStore") + id) //ส่งค่าไปแอดใน DB
        .then((res) => {
          setMessage(res.data);
          if (res.data.message == "success") {
            axios.get(API("Getstoreinfo") + id).then((res) => {
              setStoreinfo(res.data);
            });
          } else {
            Swal.fire(
              "เแอด user ล้มเหลว",
              "ขื่อผู้ใช้นี้มีอยู่ในระบบอยู้แล้ว",
              "warning"
            );
            // .then(() => window.location.reload())
          }
        });
    } else {
      Swal.fire("เแอด user ล้มเหลว", "ไม่พบรายชื่อระบบ", "warning");
    }
  };
  /////////////registd////////////
  const log = {
    contactname: "",
    email: "",
    pass: "",
    storename: "",
    username: "",
    tel: "",
  };
  const [Users, setUsers] = useState(log);
  const inputdata = (event) => {
    let { name, value } = event.target;
    setUsers({ ...Users, [name]: value });
  };

  const register = (e, Storeinfos) => {
    e.preventDefault();
    console.log(Storeinfos);
    var data = {
      storename: Storeinfos.Name,
      username: Storeinfos.AccountNum,
      tel: Storeinfos.Phone,
      email: Storeinfos.Email,
      password: Storeinfos.AccountNum,
      contactname: Storeinfos.Name,
      BPC_BranchNo: Storeinfos.BPC_BranchNo,
      BPC_WHTid: Storeinfos.BPC_WHTid,
      Address: Storeinfos.Address,
      VendGroup: Storeinfos.VendGroup,
      TaxGroup: Storeinfos.TaxGroup,
    };
    console.log(data);

    axios
      .post(API("AddStore"), data) //ส่งค่าไปแอดใน DB
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message == "success") {
          Swal.fire("แอด user สำเร็จ", "success").then(() =>
            window.location.reload()
          );
        } else {
          Swal.fire(
            "เแอด user ล้มเหลว",
            "ขื่อผู้ใช้นี้มีอยู่ในระบบอยู้แล้ว",
            "warning"
          ).then(() => window.location.reload())
        }
      })

      .catch((error) => {
        console.log("error");
      }); //ใช้ ดัก Error
  };
  /////////////delectuser////////////////
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggles = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div style={{ marginTop: "0px", marginLeft: "10px" }}>
      <Button
        outline
        color="info"
        size="md"
        style={{ marginBottom: 10 }}
        onClick={toggle}
      >
        เพิ่มบัญชีร้านค้าในระบบ
      </Button>

      <Form align="right">
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}> เพิ่มบัญชีร้านค้าในระบบ </ModalHeader>
          <ModalBody>
            <FormGroup align="left">
              <Card className="CardBackground-1">
                ชื่อร้านค้า
                {Message.message == null ? (
                  <>
                  <Dropdown>
                    <Input
                      onChange={handleChange}
                      list="select"                      
                      name="ssch_name"
                      placeholder="ค้นหาชื่อร้านค้า" 
                      
                    />
<br></br>


                    {Stores == null ? (
                      <></>
                    ) : (
                      <>
                        {Stores.map((s) => {
                          return (
                            <>
<option  onClick={(e,a) => CheckIds(e,s.AccountNum)}> {s.Name} </option>
                              <hr></hr>
                             
                             
                            </>
                          );
                        })}
                      </>
                    )}
                    </Dropdown>

                    <br></br>
                    <Button
                      color="primary"
                      className="Button-Style"
                      block
                      size="md"
                      onClick={(e) => CheckIds(e)}
                    >
                      ดึงข้อมูล
                    </Button>{" "}
                  </>
                ) : (
                  ""
                )}
              </Card>
            </FormGroup>
            {Message.message == "success" ? (
              <>
                {Storeinfo.map((Storeinfos) => {
                  return (
                    <>
                      <h4>{Storeinfos.Name}</h4>
                      <hr></hr>
                      ชื่อบริษัท : {Storeinfos.Name}
                      <br></br>
                      Email : {Storeinfos.Email} <br></br>
                      ชื่อผู้ใช้ : {Storeinfos.AccountNum} <br></br>
                      เบอร์ติดต่อ : {Storeinfos.Phone}
                      <br></br>
                      TaxGroup : {Storeinfos.TaxGroup}
                      <br></br>
                      Address: {Storeinfos.Address}
                      <br></br>
                      VendGroup: {Storeinfos.VendGroup}
                      <br></br>
                      WHT Registration ID : {Storeinfos.BPC_WHTid}
                      <br></br>
                      BranchNo : {Storeinfos.BPC_BranchNo}
                      <br></br>
                      {/* <FormGroup align="left"  >
                <Card className="CardBackground-1">

                Email
                <Input type="email" name="email"  defaultValue={Storeinfos.Email == ""?(""):(Storeinfos.Email)} onChange={inputdata} />
                ชื่อผู้ใช้
                <Input type="text" name="username" defaultValue={Storeinfos.AccountNum == ""?(""):(Storeinfos.AccountNum)} onChange={inputdata} />
                ชื่อผู้ติดต่อ
                <Input type="text" name="contactname"  defaultValue={Storeinfos.Name} onChange={inputdata} />
                รหัสผ่าน
                <Input
                  type="password"
                  name="pass"
                  min="8"
                  max="8"
                  defaultValue={Storeinfos.AccountNum}
                  onChange={inputdata}
                />
                Tel
                <Input type="text" name="tel" defaultValue={Storeinfos.Phone} onChange={inputdata} />
              </Card>
            </FormGroup> */}
                      <hr></hr>
                      <Button
                        color="primary"
                        className="Button-Style col-12"
                        size="md"
                        onClick={(e, a) => register(e, Storeinfos)}
                      >
                        ตกลง
                      </Button>
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}

            <div align="right">
              <div style={{ maxWidth: "250px" }}></div>
            </div>
          </ModalBody>
          <ModalFooter>
            {Message.message == null ? <></> : <></>}
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

export default Registerstore;
