import React, { useState, useEffect } from 'react';
import { Container, Card, Button, CardTitle, CardText, Row, Col, Badge, CardBody, Breadcrumb, BreadcrumbItem, FormGroup, Label, Input, Form } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import RightContent from "../../component/structure_global/right_content";
import Edit from "./Editcomment";
import Reply from "./Reply";

const title = 'ทุนการศึกษา';

const Subpage = ({ id }) => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    const initSubscholar = {
        id: "",
        content: "",
        name: "",
        opday: "",
        edday: "",
        web: "",
        badget: "",
        badgetfor1: "",
        amount: "",
        mid: "",
        file: ""

    }

    const [Subscholar, setSubscholar] = useState(initSubscholar);
    const initMessage = {
        message: ""
    }

    const [fmessage, setFmessage] = useState(initMessage);

    const page = () => {
        axios.get("http://localhost:8080/Mback/public/findSshcholarshippage/" + id)
            .then((response) => {
                setSubscholar(response.data);
            });
        // axios.get("http://localhost:8080/Mback/public/findSshcholarship/" + id)
        //     .then((response) => {
        //         setSubscholar(response.data);
        //     });
        axios.get("http://localhost:8080/Mback/public/commentfind/" + id)
            .then((response) => {
                setcommentstudent(response.data);
            });
        var data = {
            sid: status.id,
            schid: id
        }
        axios.post("http://localhost:8080/Mback/public/checkfollowScholar", data)
            .then((response) => {
                setFmessage(response.data);
            });


    };
    //////mscholar////////////

    useEffect(() => {
        page();
    }, []);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/findMshcholarship/" + Subscholar.mid)
            .then((response) => {
                setMscholar(response.data);
            });
    }, [Subscholar.mid]);
    const initMscholar = {
        id: "",
        content: "",
        name: "",
        year: "",
        aname: "",
        Tname: "",
    }
    const [Mscholar, setMscholar] = useState(initMscholar);
    const [commentsinfostudent, setcommentstudent] = useState([]);
    /////////////////sentpost/////////////////////////////////
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
    ////////////delectComment///////////////////
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
    ///////////FollowScholar////////////
    const FollowScholar = async () => {

        var data = {
            s_id: status.id,
            scholarid: Subscholar.id
        }

        if (data != "") {
            // console.log(data)
            axios.post("http://localhost:8080/Mback/public/followScholar", data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'ติดตามทุนนี้แล้ว',
                            'ติดตามทุนนี้แล้ว',
                            'success'
                        )
                            .then(() => window.location.reload())

                    } else {

                        Swal.fire(
                            'เพิ่มทุนล้มเหลว',
                            'ชื่อทุนนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุน แล้วลองใหม่อีกครั้ง',
                            'error'
                        )

                    }

                })
        }
    };
    /////////////Unfollow/////////////////
    const Unfollow = async (nid) => {

        if (nid) {
            axios.delete("http://localhost:8080/Mback/public/Unfollow/" + nid)
                .then((response) => {
                    Swal.fire(
                        'ยกเลิกติดตาม',
                        'คุณจะไม่ติดตามทุนนี้',
                        'success'
                    )
                    page();

                })
        }
    };

    const showallcomment = async () => {
        axios.get("http://localhost:8080/Mback/public/commentfindall/" + id)
            .then((response) => {
                setcommentstudent(response.data);

            }, []);
    };

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>


            <Container className="container-fluid TZS-Container">
                <Row>
                    <Col className="col-ContentSetting col-12 col-sm-6 col-lg-3">
                        {status.status == "นักเรียน" ?
                            fmessage.message == "none" ?
                                <Button className="Button-Style" color="danger" size="lg" block style={{ marginBottom: "10px" }} onClick={() => Unfollow(fmessage.nid)} >ยกเลิกติดตาม</Button>
                                :
                                <Button className="Button-Style" color="success" size="lg" block style={{ marginBottom: "10px" }} onClick={FollowScholar} >ติดตามทุนนี้</Button>
                            : <div></div>}
                        <Card className="CardBackground-1">
                            <CardBody className="">
                                <h6>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/save_alt.png" />
                                    เอกสารที่เกี่ยวข้อง
                                </h6>
                                <div className="borderline" />
                                {Subscholar.file == "" ?
                                    <div className="NotFoundTxtInBox" style={{ marginBottom: '10px' }}>
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบเอกสาร
                                    </div>
                                    :
                                    <Button className="Button-Style" color="secondary" href={Subscholar.file} block>ดาวน์โหลดไฟล์เอกสาร</Button>

                                }
                            </CardBody>
                        </Card>
                        <RightContent />
                    </Col>

                    <Col className="col-ContentSetting col-12 col-sm-6 col-lg-6">

                        <Card className="HeaderShadow">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb BreadcrumbStyle">
                                    <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item"><a href="/allscholarship">ทุนการศึกษา</a></li>
                                    <li className="breadcrumb-item"><a href={"/scholarshipMain/" + Mscholar.id}>{Mscholar.name}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{Subscholar.name}</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    <b>{Subscholar.name}</b>
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                ใน {Mscholar.name}
                                <div className="borderline" />
                                <Button outline color="success" href={"/allResult_forthis_Type/" + Mscholar.type} className="Button-Style mr-1">{Mscholar.Tname}</Button>

                                <Button outline color="info" href={"/allResult_forthis_agen/" + Mscholar.ag} className="Button-Style mr-1">{Mscholar.aname}</Button>

                                <Button outline color="warning" href={"/allResult_forthis_year/" + Mscholar.year} className="Button-Style mr-1">ปีงบประมาณ {Mscholar.year}</Button>
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1">
                            <CardBody className="">
                                <h5>
                                    คำอธิบาย
                                </h5>
                                <div className="borderline" />
                                <div className="text-muted">
                                    {Subscholar.content}
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="">
                                <h5>
                                    คุณสมบัติผู้สมัคร
                                </h5>
                                <div className="borderline" />
                                <div className="text-muted">
                                    Content
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="CardBackground-1">
                            <CardBody className="">
                                <h5>
                                    เว็บหลักทุน
                                </h5>
                                <div className="borderline" />
                                <div className="text-muted">
                                    <a href={Subscholar.web}>{Subscholar.web}</a>
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="CardBackground-1">
                            <CardBody className="">
                                <h5>
                                    งบประมาณของทุน
                                </h5>
                                <div className="borderline" />
                                <div className="text-muted">
                                    <h6 style={{ marginBottom: "0px" }}>
                                        <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/monetization_on.png" />
                                        งบประมาณต่อทุน : {Subscholar.badget} บาท
                                    </h6>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="">
                                <h5>
                                    จำนวนที่เปิดรับสมัครทุน
                                </h5>
                                <div className="borderline" />
                                <div className="text-muted">
                                    <h6 style={{ marginBottom: "0px" }}>
                                        <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/timeline.png" />
                                        จำนวนทั้งหมด : {Subscholar.amount} ทุน
                                    </h6>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="">
                                <h5>
                                    ช่วงเวลาเปิดรับสมัคร
                                </h5>
                                <div className="borderline" />
                                <div className="text-muted">
                                    <h6>
                                        <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/time.png" />
                                        วันที่เปิดรับสมัคร : {Subscholar.opday}
                                    </h6>
                                    <h6 style={{ marginBottom: "0px" }}>
                                        <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/time_outline.png" />
                                        วันที่สิ้นสุด : {Subscholar.edday}
                                    </h6>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="col-ContentSetting col-12 col-sm-6 col-lg-3">
                        <Card className="CardBackground-1" style={{ margin: '0px 0px 0px 0px', borderRadius: '10px 10px 0px 0px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                            <CardBody className="">
                                <h6>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/question_answer.png" />
                                    ความคิดเห็น
                                </h6>
                                <div className="borderline" />

                                {commentsinfostudent == "" ?
                                    <div className="text-danger" align="center" style={{ marginTop: '50px', marginBottom: '50px' }}>
                                        <div className="NotFoundTxtInBox">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                            ไม่มีความคิดเห็น
                                        </div>
                                    </div> : commentsinfostudent.map((cm) => {

                                        return (
                                            < div className="Comment" key={cm.user_id} style={{ marginTop: '10px' }}>
                                                <img style={{ borderRadius: "100%", border: "1px solid black", height: "30px", width: "30px", marginRight: "10px" }} src={cm.s_img || cm.st_img} />
                                                <div style={{ marginTop: '-30px', marginLeft: '35px' }}>
                                                    <Card className="CardBackground-2" style={{ minWidth: '200px' }}>
                                                        <CardBody className="CardBody" style={{ padding: '10px', paddingLeft: '15px' }}>

                                                            <div style={{ marginBottom: '5px' }}>

                                                                {cm.s_fname}{" "}{cm.s_lname} {cm.st_fname}{" "}{cm.st_lname}
                                                            </div>

                                                            <div className="text-muted" style={{}}>
                                                                {cm.cm_dt}
                                                            </div>
                                                        </CardBody>
                                                        {/* /////////reply/////////////////////// */}
                                                    </Card>
                                                    <div style={{ fontSize: "12px" }}>
                                                        <span style={{ color: "gray" }}> {cm.Cm_Time}</span>
                                                        {cm.user_id != status.id &&//////ถุ้าcmid ไม่ตรงกับ Local sto ไม่สามารถลบได้
                                                            <Reply cm={cm} />
                                                        }
                                                        {/* <Button color="link" style={{ margin: '0px', padding: '0px' }}>
                                                                    ตอบกลับ
                                                        </Button> */}
                                                        {" "}
                                                        {cm.user_id == status.id &&
                                                            <Edit cm={cm} />
                                                        }
                                                        {cm.user_id == status.id &&//////ถุ้าcmid ไม่ตรงกับ Local sto ไม่สามารถลบได้
                                                            <div style={{ marginTop: '-20px', marginLeft: '165px' }}>
                                                                <Button color="link" style={{ margin: '0px', padding: '0px', fontSize: "12px", color: "gray" }} onClick={() => delectComment(cm.cm_id)} >ลบ</Button>
                                                            </div>
                                                        }
                                                    </div>



                                                </div>

                                            </div>
                                        );
                                    })

                                }
                                <br />
                                <Button color="link" style={{ margin: '0px', padding: '0px', fontSize: "12px", color: "gray" }} onClick={showallcomment} >แสดงข้อมูลทั้งหมด</Button>
                            </CardBody>
                        </Card>


                        {status.status != null &&
                            <Card className="CardBackground-1" style={{ borderRadius: '0px 0px 10px 10px' }}>
                                <CardBody className="">
                                    <Form align="right" onSubmit={Postcomment}>
                                        <FormGroup style={{ marginBottom: '5px' }}>
                                            {/* <h6 className="text-danger" style={{}} >
                                                <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                                คุณกำลังตอบกลับ <b>ชื่อ1 นามสกุล1</b>
                                            </h6> */}
                                            <Input type="textarea" name="detail" id="more_detail" placeholder="เขียนความคิดเห็นที่นี่" onChange={inputdata} />
                                        </FormGroup>
                                        <Button type="submit" className="Button-Style" block color="primary" size="md" >
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/send_white.png" />
                                            ส่งความคิดเห็น
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        }
                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default Subpage;