import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  FormGroup,
  Table,
  Progress,
  Input,
  Form,
  Button,
} from "reactstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import StaffLeftMenu from "../../../component/staff_page/left_menu";
import API from ".././../API/API";
import Edit_amount from "./edit_amount";

const Bill_detail_page = ({ id }) => {
  const session = {
    id: localStorage.getItem("id"),
    fname: localStorage.getItem("fname"),
    lname: localStorage.getItem("lname"),
    status: localStorage.getItem("status"),
  };
  const title = "บิลหมายเลข" + id;

  // const [status, SetStatus] = useState(session);
  const initBill = {};
  const [Bill, setBill] = useState(initBill);
  const [bFile, setFile] = useState([]);

  // //////////////////////////////////////////////////////////////////
  const page = () => {
    axios.get(API("Billid") + id).then((response) => {
      setBill(response.data);
    });
    axios.get(API("Listfile") + id).then((response) => {
      setFile(response.data);
    });
  };
  useEffect(() => {
    page();
  }, [id]);
  ///////////////uploadfile////////////////////////////////////////////////
  const initFile = {
    file: "",
  };
  const [fileup, setfileup] = useState(initFile);

  const handleFile = (e) => {
    let file = e.target.files[0];
    setfileup(file);
    // console.log(e.target.files,"$$$$");
    // console.log(e.target.files[0],"$$$$");
  };

  const savefile = (e) => {
let data = fileup
let formData = new FormData();
formData.append('image',data);

 axios.post(API("Movefile"),formData).then((response) => {
  setfileup(response.data);
    window.location.reload()
  });
};

  var today = new Date();
  const D = today.toISOString().substring(0, 10);
  // async function savefile() {
    // console.log(data)
    // if (data.filename == "") {
    //   Swal.fire("กรุณาเลือกไฟล์ก่อน", "", "warning").then(() =>
    //     window.location.reload()
    //   );
    // } else {
    //   axios
    //     .post(API("Addfire") + id, data) //ส่งค่าไปแอดใน DB
    //     .then((res) => {
    //       console.log(res.data.message);
    //       if (res.data.message == "success") {
    //         ////ต่อตรงนี้
    //         Swal.fire("อัพไฟล์สำเร็จ", "สำเร็จ", "success").then(() =>
    //           window.location.reload()
    //         );
    //       } else {
    //         Swal.fire("อัพไฟล์ไม่สำเร็จกรุณาลองใหม่อีกครั้ง", "ล้มเหลว", "error");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("error");
    //     }); //ใช้ ดัก Error
    // }
  // }

  // /////////////////delectfile///////////////////////////
  function alertdelect(fid) {
    console.log(fid);
    Swal.fire({
      title: "คำเตือน?",
      text: "เมื่อลบไฟล์นี้แล้วจะไม่สามารถดูได้อีกได้อีก",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API("Delectfile") + fid) //ส่งค่าไปแอดใน DB
          .then((res) => {
            if (res.data.message == "success") {
              ////ต่อตรงนี้
              Swal.fire("Deleted!", "ลบไฟล์สำเร็จ.", "success").then(() =>
                window.location.reload()
              );
            } else {
              Swal.fire("ลบไฟล์ไม่สำเร็จ", "", "error");
            }
          })

          .catch((error) => {
            console.log("error");
          }); //ใช้ ดัก Error
      }
    });
  }

  function DelectBill(e) {
    e.preventDefault();

    Swal.fire({
      title: "คำเตือน?",
      text: "คุณต้องการจะยกเลิกการแจ้งบิลนี้ใช้ไหม",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบ!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API("Delectbills") + id) //ส่งค่าไปแอดใน DB
          .then((res) => {
            if (res.data.message == "success") {
              ////ต่อตรงนี้
              Swal.fire("Deleted!", "ยกเลิกบิลสำเร็จ.", "success").then(() =>
                window.location.assign("/Billuser")
              );
            } else {
              Swal.fire("ยกเลิกบิลไม่สำเร็จ", "", "error");
            }
          })

          .catch((error) => {
            console.log("error");
          }); //ใช้ ดัก Error
      }
    });
  }

  // const [Subscholar, setSubscholar] = useState([]);

  // const initsentcomment = {
  //     detail: "",
  // }
  // const [sentcomment, setsentcomment] = useState(initsentcomment);
  // const inputdata = (event) => {
  //     let { name, value } = event.target;
  //     setsentcomment({ ...sentcomment, [name]: value });

  // }
  // const Postcomment = (e) => {
  //     e.preventDefault()

  //     var data = {
  //         user_id: status.id,
  //         cm_dt: sentcomment.detail,
  //         ssch_id: id,
  //     };//เอาค่าที่รับจาก form มาใส่ใน json

  //     if (data['cm_dt'] === "") {
  //         Swal.fire(
  //             'ดำเนินการล้มเหลว',
  //             'โปรดใส่ข้อความและลองใหม่อีกครั้ง',
  //             'error'
  //         )

  //     } else {
  //         axios.post("http://localhost:8080/Mback/public/comment", data)//ส่งค่าไปแอดใน DB
  //             .then((res) => {
  //                 if (res.data.message == "success") {
  //                     ////ต่อตรงนี้
  //                     Swal.fire(
  //                         'ดำเนินการสำเร็จ',
  //                         'เพิ่มความคิดเห็นสำเร็จแล้ว',
  //                         'success'
  //                     )
  //                     page();
  //                 } else {

  //                     Swal.fire(
  //                         'ดำเนินการล้มเหลว',
  //                         'เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น โปรดลองใหม่อีกครั้ง',
  //                         'error'
  //                     )

  //                 }

  //             })

  //             .catch((error) => {
  //                 console.log("error");
  //             });//ใช้ ดัก Error

  //     };
  // }
  // const delectComment = async (cid) => {

  //     if (cid) {
  //         axios.delete("http://localhost:8080/Mback/public/commentdelect/" + cid)
  //             .then((response) => {
  //                 Swal.fire(
  //                     'ดำเนินการสำเร็จ',
  //                     'ลบความคิดเห็นสำเร็จแล้ว',
  //                     'success'
  //                 )
  //                 page();

  //             })
  //     }
  // };

  // const showallcomment = async () => {
  //     axios.get("http://localhost:8080/Mback/public/commentfindall/" + id)
  //         .then((response) => {
  //             setcommentstudent(response.data);
  //         }, []);

  // };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Container className="container-fluid TZS-Container">
        <Row>
          <Col className="col-ContentSetting col-12 col-sm-12 col-lg-3">
            <StaffLeftMenu />
          </Col>

          <Col className="col-ContentSetting col-12 col-sm-12 col-lg-8">
            <Card className="HeaderShadow">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb BreadcrumbStyle">
                  <li className="breadcrumb-item">
                    <a href="/mainstore">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {title}
                  </li>
                </ol>
              </nav>
              <Card className="CardHeaderStyle">
                <h5 style={{ margin: "0px" }}>
                  <b>รายละเอียด {title}</b>{" "}
                  {Bill.billstatus == "wait" ? (
                    <>
                      <b className="status"> "สร้างใหม่"</b>
                    </>
                  ) : (
                    <>
                      <b className="status">"{Bill.billstatus}"</b>
                    </>
                  )}
                </h5>
              </Card>
            </Card>

            <Card
              className="CardBackground-1"
              style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <CardBody className="CardBody-WithBoxContent">
                <h6>
                  เพิ่มไฟล์
                  <Form>
                    <div class="profile-img">
                      <Input
                        type="file"
                        name="fileupload"
                        id="fileupload"
                        onChange={(e) => handleFile(e)}
                      />
                      <br />
                    </div>

                    <Button
                      className="Button-Style"
                      color="success"
                      size="md"
                      onClick={(e) => savefile(e)}
                    >
                      บันทึกข้อมูล
                    </Button>
                  </Form>
                </h6>
                <div className="borderline" />
                {bFile.message == "fail" ? (
                  <>
                    <div className="NotFoundTxtInBox">
                      <img className="buttonMenuIcon" src="" />
                      ไม่พบไฟล์เอกสารในบิลนี้
                    </div>{" "}
                  </>
                ) : (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>ชื่อไฟล์</th>
                        <th>เวลาอัพไฟล์ </th>
                        <th>ลบ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bFile.map((files) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <Button
                                  color="link"
                                  outline
                                  href={files.file_url}
                                >
                                  {files.file_name}
                                </Button>
                              </td>
                              <th>{files.file_date}</th>
                              <td>
                                {" "}
                                <Button
                                  color="danger"
                                  onClick={() => alertdelect(files.id)}
                                >
                                  ลบไฟล์
                                </Button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                )}

                <div className="EdgeRow-1">
                  <Row>
                    <div className="col-12 col-sm-12 col-lg-12 col-BoxContentSetting">
                      <Card
                        className="CardBackground-2"
                        style={{ minHeight: "200px" }}
                      >
                        <a href={"/scholarshipSub/"}>
                          <CardHeader
                            className=""
                            style={{
                              background: "#dadce0",
                              borderRadius: "10px",
                              borderBottom: "0px",
                            }}
                          >
                            <h6 className="text-dark" style={{ margin: "0px" }}>
                              <b>
                                ข้อมูลการวางบิล หมายเลขบิล: {id} ชื่อร้าน{" "}
                                {session.fname}
                              </b>{" "}
                              {Bill.bill_op_time}
                            </h6>
                          </CardHeader>
                        </a>

                        <CardBody
                          className="text-secondary"
                          style={{ padding: "10px" }}
                        >
                          <div className="borderline" />
                          <div>
                            <Row>
                              <Col md="8">
                                <b>ยอดวางบิล : {Bill.amount} บาท</b>
                              </Col>
                              <Col md="4">
                                <Edit_amount id={id} />
                              </Col>
                            </Row>
                          </div>

                          <div className="borderline" />
                          <div>รายละเอียดการวางบิล : {Bill.billDetail}</div>
                          <div align="right"></div>
                        </CardBody>
                      </Card>
                    </div>
                  </Row>
                </div>
              </CardBody>
            </Card>
            <Card
              className="CardBackground-1"
              style={{
                margin: "0px 0px 0px 0px",
                borderRadius: "10px 10px 10px 10px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                marginBottom: "10px",
              }}
            >
              <CardBody className="">
                <h6>
                  <img className="header-1-Icon" src="" />
                  โน็ต
                </h6>
                <div className="borderline" />
              </CardBody>
            </Card>
            <Card
              className="CardBackground-1"
              style={{
                margin: "0px 0px 0px 0px",
                borderRadius: "10px 10px 0px 0px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <CardBody className="">
                <h6>
                  <img className="header-1-Icon" src="" />
                  บันทึกข้อความ โน็ต/ ไม่บังคับ
                </h6>
                <div className="borderline" />
                <Form align="right" onSubmit={""}>
                  <FormGroup style={{ marginBottom: "5px" }}>
                    <Input
                      type="textarea"
                      name="detail"
                      id="more_detail"
                      placeholder=" บันทึกข้อความ โน็ต/ ไม่บังคับ"
                      onChange={""}
                    />
                  </FormGroup>
                  <Button
                    type="submit"
                    className="Button-Style"
                    block
                    color="primary"
                    size="md"
                  >
                    ส่งอนุมัติ
                  </Button>
                  <Button
                    type="submit"
                    className="Button-Style"
                    block
                    color="danger"
                    size="md"
                    onClick={(e) => DelectBill(e)}
                  >
                    ยกเลิกการวางบิล
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col className="col-ContentSetting col-12 col-sm-12 col-lg-3"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Bill_detail_page;
