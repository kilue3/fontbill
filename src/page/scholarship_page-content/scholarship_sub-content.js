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
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>


            <Container className="container-fluid TZS-Container">
                <Row>

                    <Col lg="3" className="col-ContentSetting">
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
                                    ไฟล์ที่เกี่ยวข้อง
                                </h6>
                                <div className="borderline" />
                                {Subscholar.file == "" ?
                                    <h6 style={{ color: "#FF0000", marginBottom: "0px" }}>
                                        ไม่มีไฟล์เอกสารสำหรับทุนนี้
                                    </h6>
                                    :
                                    <Button className="Button-Style" color="secondary" href={Subscholar.file} block>ดาวน์โหลดไฟล์เอกสาร</Button>

                                }
                            </CardBody>
                        </Card>
                        <RightContent />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">

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
                                <Button outline color="success" className="Button-Style mr-1">{Mscholar.Tname}</Button>

                                <Button outline color="info" className="Button-Style mr-1">{Mscholar.aname}</Button>

                                <Button outline color="warning" className="Button-Style mr-1">ปีงบประมาณ {Mscholar.year}</Button>
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
                                                            {cm.cm_dt}                                                </div>

                                                        {" "}
                                                        {cm.user_id != status.id &&//////ถุ้าcmid ไม่ตรงกับ Local sto ไม่สามารถลบได้
                                                            <Reply cm={cm} />
                                                        }


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
            </Container>

        </>
    )
}

export default Subpage;