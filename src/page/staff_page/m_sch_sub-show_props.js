import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardHeader, Button, Row, Col, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';

import NavBar from "../../component/structure_global/navbar";

const title = 'ทุนการศึกษาย่อย - ระบบผู้ดูแล';

const ShscholarShow = ({ id }) => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [ses, setSes] = useState(session);
    if (ses.status == "นักเรียน") {
        window.location.assign("/");

    }

    const [ShscholarShow, setShscholarShow] = useState([]); //ดึงมาจาก Product api

    const [Mscholar, setMscholar] = useState([]);

    const updateShscholarShow = () => {
        axios.get("http://localhost:8080/Mback/public/findSshcholarship/" + id)
            .then((response) => {
                setShscholarShow(response.data);
            });
        axios.get("http://localhost:8080/Mback/public/findMshcholarship/" + id)
            .then((response) => {
                setMscholar(response.data);
            });
    };

    useEffect(() => {
        updateShscholarShow();
    }, [id]);

    //---------------- ลบทุนย่อย
    const delectSubSch = async (id) => {

        if (id) {
            axios.delete("http://localhost:8080/Mback/public/delectSubscholarship/" + id)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'ลบข้อมูลทุนการศึกษาสำเร็จ',
                            'ทุนการศึกษานี้ และ ทุนการศึกษาย่อยที่อยู่ในทุนนี้ ถูกลบข้อมูลเรียบร้อยแล้ว',
                            'success'
                        )
                            .then(() => window.location.reload())

                    }

                })

                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        }

    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <NavBar />

            <Container className="container-fluid TZS-Container">
                <Row>

                    <Col lg="3" className="col-ContentSetting">
                        <StaffLeftMenu />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb CardBackground-1">
                                <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                <li className="breadcrumb-item"><a href="/staff_page/scholarship">ทุนการศึกษา</a></li>
                                <li className="breadcrumb-item active" aria-current="page">ทุนการศึกษาย่อย ใน {Mscholar.name}</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                    ทุนการศึกษาย่อย
                                </h5>
                                <h6 className="text-secondary" style={{ marginLeft: "35px", marginBottom: '0px' }}>
                                    ใน {Mscholar.name}
                                </h6>
                                <div className="borderline" />
                                <div className="EdgeRow-1">
                                    <Row>

                                        {ShscholarShow == "" ?
                                            <div className="col-12">
                                                <div className="text-danger" align="center" style={{ marginTop: '200px', marginBottom: '200px' }}>
                                                    <h5 style={{ margin: '0px' }}>
                                                        <img className="" style={{ height: "60px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                                        <br />ไม่มีข้อมูลที่จะแสดง
                                                    </h5>
                                                </div>
                                            </div>

                                            : ShscholarShow.map((ShscholarShow) => {

                                                return (
                                                    <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">

                                                        <div key={ShscholarShow.msch_id}  >
                                                            <Card className="CardBackground-2 Hover-CardBackground-2">
                                                                <a href={"/scholarshipSub/" + ShscholarShow.ssch_id}>
                                                                    <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                                                                        <h6 className="text-dark" style={{ margin: '0px' }}>
                                                                            <b>{ShscholarShow.ssch_name}</b>
                                                                        </h6>
                                                                    </CardHeader>
                                                                </a>
                                                                <CardBody className="text-secondary" style={{ padding: "10px" }}>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/restore.png" />
                                                                        ช่วงเวลาเพิ่มทุน : {ShscholarShow.timeadd}
                                                                    </h6>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/receipt_long.png" />
                                                                        ช่วงเวลารับสมัครทุน : {ShscholarShow.ssch_dopen} ถึง {ShscholarShow.ssch_dclose}
                                                                    </h6>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                                                        จำนวนรับสมัครทุน : {ShscholarShow.ssch_amount}
                                                                    </h6>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/monetization_on.png" />
                                                                        งบประมาณต่อทุน : {ShscholarShow.Budget_per_capital}
                                                                    </h6>
                                                                    <h6 style={{ margin: '0px' }}>
                                                                        <img className="contentIcon" src="https://tzs-global.com/website_factor-image/button_icon/monetization_on.png" />
                                                                        งบประมาณทั้งหมด : {ShscholarShow.ssch_budget}
                                                                    </h6>
                                                                    <div className="borderline" />
                                                                    <div align="left">
                                                                        <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} href={"/staff/editDataShscholar/" + ShscholarShow.ssch_id} >
                                                                            <img className="Button-icon" style={{ height: "18px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/edit_white.png" />
                                                                        </Button>
                                                                        <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px" }} href={"/staff/editDataShscholar/" + ShscholarShow.ssch_id} >
                                                                            แก้ไขข้อมูล
                                                                        </Button>
                                                                    </div>
                                                                    <div className="borderline" />
                                                                    <div align="left">
                                                                        <Button className="Button-Style" color="secondary" size="sm" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", marginBottom: "0px" }} onClick={() => delectSubSch(ShscholarShow.ssch_id)} >
                                                                            <img className="Button-icon" style={{ height: "17px", width: "auto" }} src="https://tzs-global.com/website_factor-image/button_icon/delete_forever_white.png" />
                                                                        </Button>
                                                                        <Button className="Button-Style" outline color="secondary" size="sm" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", marginBottom: "0px" }} onClick={() => delectSubSch(ShscholarShow.ssch_id)} >
                                                                            ลบทุนการศึกษา
                                                                        </Button>
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        </div>

                                                    </div>
                                                );
                                            })
                                        }
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default ShscholarShow;
