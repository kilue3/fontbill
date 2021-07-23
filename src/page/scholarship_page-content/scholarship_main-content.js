import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, CardBody, CardHeader, FormGroup, Label, Input, Form, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import RightContent from "../../component/structure_global/right_content";
import Edit from "./Editcomment";
import Reply from "./Reply";


const title = 'ทุนการศึกษา';

const Mcontent = ({ id }) => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    const initMscholar = {
        id: "",
        content: "",
        name: "",
        year: "",
        aname: "",
        Tname: "",
    }
    const [Mscholar, setMscholar] = useState(initMscholar);

    /////////////////////reply//////////Modal//////////////////
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    //////////////////////////////////////////////////////////////////
    const [commentsinfostudent, setcommentstudent] = useState([]);
    const page = () => {
        axios.get("http://localhost:8080/Mback/public/findMshcholarship/" + id)
            .then((response) => {
                setMscholar(response.data);
            });

        axios.get("http://localhost:8080/Mback/public/findSshcholarship/" + id)
            .then((response) => {
                setSubscholar(response.data);
            });
        axios.get("http://localhost:8080/Mback/public/commentfind/" + id)
            .then((response) => {
                setcommentstudent(response.data);
            });

    };
    useEffect(() => {
        page();
        // ใช้updateProductsบรรทัด 7
    }, id);
    /////////////////sentpost///////////////////////////
    const [Subscholar, setSubscholar] = useState([]);
    const initsentcomment = {
        detail: "",
    }
    const [sentcomment, setsentcomment] = useState(initsentcomment);
    const inputdata = (event) => {
        let { name, value } = event.target;
        setsentcomment({ ...sentcomment, [name]: value });


    }
    const Postcomment = (e) => {
        e.preventDefault()

        var data = {
            user_id: status.id,
            cm_dt: sentcomment.detail,
            ssch_id: id,
        };//เอาค่าที่รับจาก form มาใส่ใน json

        if (data['cm_dt'] === "") {
            Swal.fire(
                'เกิดข้อผิดพลาด',
                'กรุณากรอกข้อความใหม่อีกครั้ง',
                'error'
            )

        } else {
            axios.post("http://localhost:8080/Mback/public/comment", data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'Comment Success',
                            '',
                            'success'
                        )
                        page();
                    } else {

                        Swal.fire(
                            'Comment fail',
                            '',
                            'error'
                        )

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        };
    }
    const delectComment = async (cid) => {

        if (cid) {
            axios.delete("http://localhost:8080/Mback/public/commentdelect/" + cid)
                .then((response) => {
                    Swal.fire(
                        'Delect Success',
                        '',
                        'success'
                    )
                    page();

                })
        }
    };
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>


            <Container className="container-fluid TZS-Container">
                <Row>

                    <Col lg="3" className="col-ContentSetting">
                        <RightContent />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">

                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item"><a href="/allscholarship">ทุนการศึกษา</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{Mscholar.name}</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    {Mscholar.name}
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                                <Button outline color="success" className="Button-Style mr-1">{Mscholar.Tname}</Button>

                                <Button outline color="info" className="Button-Style mr-1">{Mscholar.aname}</Button>

                                <Button outline color="warning" className="Button-Style mr-1">ปีงบประมาณ {Mscholar.year}</Button>
                                <div className="borderline" />
                                {Mscholar.content}
                                <div className="borderline" />

                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูลทุนย่อย
                                </div>

                                <div className="EdgeRow-1">
                                    <Row>
                                    {Subscholar.map((ss) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">
                                                <Card className="CardBackground-2" style={{ minHeight: '200px' }}>
                                                    <a href={"/scholarshipSub/" + ss.ssch_id}>
                                                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                <b>{ss.ssch_name}</b>
                                                            </h6>
                                                        </CardHeader>
                                                    </a>
                                                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                        {ss.ssch_detail}
                                                        <div className="borderline" />
                                                        <Button href={"/scholarshipSub/" + ss.ssch_id} className="Button-Style" outline >อ่านทั้งหมด</Button>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            );
                                    })}
                                    </Row>
                                </div>

                            </CardBody>
                        </div>

                        <Card className="CardBackground-1" style={{ margin: '20px 0px 0px 0px', borderRadius: '10px 10px 0px 0px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                            <CardBody className="">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/question_answer.png" />
                                    ความคิดเห็น
                                </h5>
                                <div className="borderline" />
                                {commentsinfostudent == "" ?
                                    <div className="text-danger" align="center" style={{ marginTop: '50px', marginBottom: '50px' }}>
                                        <h5 style={{ margin: '0px' }}>
                                            <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่มีความคิดเห็น
                                    </h5>
                                    </div> : commentsinfostudent.map((cm) => {
                                        return (
                                            < div className="Comment" key={cm.user_id}>
                                                <Card className="CardBackground-2">
                                                    <CardBody className="CardBody-WithBoxContent">
                                                        <h5 style={{ marginBottom: '5px' }}>
                                                            <img style={{ borderRadius: "100%", border: "1px solid black", height: "40px", width: "40px", marginRight: "10px" }} src={cm.s_img || cm.st_img} />

                                                            {cm.s_fname}{" "}{cm.s_lname} {cm.st_fname}{" "}{cm.st_lname}
                                                        </h5>
                                                        <right><span style={{ color: "gray", fontSize: "15px", marginLeft: "48px" }}> {cm.Cm_Time}</span></right>
                                                        <hr />
                                                        <div className="text-muted" style={{ marginBottom: '5px' }}>
                                                            {cm.cm_dt}
                                                        </div>
                                                        {cm.user_id != status.id &&//////ถุ้าcmid ไม่ตรงกับ Local sto ไม่สามารถลบได้
                                                            <Reply cm={cm} />
                                                        }

                                                        {/* <Button color="link" style={{ margin: '0px', padding: '0px' }}>
                                                            ตอบกลับ
                                                </Button> */}
                                                        {" "}
                                                        {cm.user_id == status.id &&//////ถุ้าcmid ไม่ตรงกับ Local sto ไม่สามารถลบได้
                                                            <Button color="link" style={{ margin: '0px', padding: '0px' }} onClick={() => delectComment(cm.cm_id)} >ลบ</Button>
                                                        }
                                                        {cm.user_id == status.id &&
                                                            <Edit cm={cm} />
                                                        }
                                                    </CardBody>
                                                    {/* /////////reply/////////////////////// */}
                                                </Card>

                                            </div>
                                        );
                                    })
                                }

                            </CardBody>
                        </Card>
                        {status.status != null &&
                            <Card className="CardBackground-1" style={{ borderRadius: '0px 0px 10px 10px' }}>
                                <CardBody className="">

                                    <Form align="right" onSubmit={Postcomment}>
                                        <FormGroup align="left">
                                            <Label for="more_detail">แสดงความคิดเห็น</Label>
                                            <h6 className="text-danger" style={{}} >
                                                {/* <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" /> */}
                                                {/* คุณกำลังตอบกลับ <b>ชื่อ1 นามสกุล1</b> */}
                                            </h6>
                                            <Input type="textarea" name="detail" id="more_detail" placeholder="เขียนความคิดเห็นที่นี่" onChange={inputdata} />
                                        </FormGroup>
                                        <div align="right">
                                            <div style={{ maxWidth: "250px" }}>
                                                <Button type="submit" className="Button-Style" block color="primary" size="md" >
                                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/send_white.png" />
                                                ส่งความคิดเห็น
                                            </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        }
                    </Col>

                </Row>
            </Container >
        </>
    )
}

export default Mcontent;
