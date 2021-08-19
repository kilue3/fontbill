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
    }, [id]);
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
                        <RightContent />
                    </Col>

                    <Col className="col-ContentSetting col-12 col-sm-6 col-lg-6">

                        <img src={Mscholar.m_img} alt="" style={{ width: "100%", borderTopLeftRadius: '10px', borderTopRightRadius: '10px', marginBottom: '-10px' }} />

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
                                    <b>{Mscholar.name}</b>
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail" style={{ borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', marginBottom: '0px' }}>
                            <CardBody className="CardBody">
                                <Button outline color="success" href={"/allResult_forthis_Type/" + Mscholar.type} className="Button-Style mr-1">
                                    {Mscholar.Tname}
                                </Button>
                                <Button outline color="info" href={"/allResult_forthis_agen/" + Mscholar.ag} className="Button-Style mr-1">
                                    {Mscholar.aname}
                                </Button>
                                <Button outline color="warning" href={"/allResult_forthis_year/" + Mscholar.year} className="Button-Style mr-1">
                                    ปีงบประมาณ {Mscholar.year}
                                </Button>
                                <div className="borderline" />
                                {Mscholar.content}
                            </CardBody>
                        </div>

                        <Card className="CardBackground-1" style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
                            <CardBody className="CardBody-WithBoxContent">
                                <h6>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                    ทุนการศึกษาใน {Mscholar.name}
                                </h6>
                                <div className="borderline" />
                                {Subscholar == "" ?
                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบทุนการศึกษาใน {Mscholar.name}
                                    </div> :

                                    <div className="EdgeRow-1">
                                        <Row>
                                            {Subscholar.map((ss) => {
                                                return (

                                                    <div className="col-12 col-sm-12 col-lg-12 col-BoxContentSetting">
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
                                                                <div>
                                                                    <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/timeline.png" />
                                                                    จำนวนเปิดรับสมัคร : {ss.ssch_amount}
                                                                </div>
                                                                <div>
                                                                    <img className="header-2-Icon" src="https://tzs-global.com/website_factor-image/button_icon/time.png" />
                                                                    ช่วงเวลาเปิดรับสมัคร : {ss.ssch_dopen} - {ss.ssch_dclose}
                                                                </div>
                                                                <div className="borderline" />
                                                                <div align="right">
                                                                    <Button href={"/scholarshipSub/" + ss.ssch_id} className="Button-Style" outline >อ่านทั้งหมด</Button>
                                                                </div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                );
                                            })}
                                        </Row>
                                    </div>}
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="col-ContentSetting col-12 col-sm-12 col-lg-3">

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
                                <Button color="link" style={{ margin: '0px', padding: '0px', fontSize: "12px", color: "gray" }} onClick={showallcomment} >แสดงข้อมูลทั้งหมด อีก {showallcomment.length}</Button>
                            </CardBody>
                        </Card>


                    </Col>

                </Row>
            </Container >
        </>
    )
}

export default Mcontent;
