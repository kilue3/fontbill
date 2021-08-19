import React, { useState, useEffect } from 'react';
import Slide from '../component/home-slide';
import { Container, Card, Row, Col,CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import NavBar from "../component/structure_global/navbar";
import Footer from "../component/structure_global/footer";
import Resultbox from "../component/sch_notify_box";
import Scholarship_Box from "../component/scholarship_box";
import RightContent from "../component/structure_global/right_content";
import axios from 'axios';
const title = 'ระบบการให้บริการสารสนเทศทุนการศึกษา ฯ';


const Home = (props) => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);

    const [Mscholar, setMscholar] = useState([]);
    const [Resultboxs, setResultboxs] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/Mshcholarship")
            .then((response) => {
                setMscholar(response.data);
            });
            axios.get("http://localhost:8080/Mback/public/resultlist")
            .then((response) => {
                setResultboxs(response.data);
            });
    }, []);

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <NavBar />

            <Container className="container-fluid TZS-Container">
                <Row>
                    <Col lg="12" className="col-ContentSetting" style={{ marginBottom: '20px' }}>
                        <Slide />
                    </Col>

                    <Col lg="3" className="col-ContentSetting">
                        <RightContent />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">
                        <Card className="HeaderShadow">
                            <Card className="CardHeaderStyle-Home">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                    ทุนการศึกษา
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                                <a href="/allscholarship">ดูทั้งหมด>></a>
                                <div className="borderline" />
                                {Mscholar == "" ?
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>
:
                                <div className="EdgeRow-1">
                                    <Row>
                                        {Mscholar.map((scholar) => {
                                            props.match.params.id = scholar.msch_id
                                            return (
                                                <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">
                                                    <div key={scholar.msch_id}><Scholarship_Box id={props.match.params.id} /></div>
                                                </div>
                                            );
                                        })}
                                    </Row>
                                </div>
}
                            </CardBody>
                        </div>

                        <Card className="HeaderShadow">
                            <Card className="CardHeaderStyle-Home">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/campaign.png" />
                                    ประกาศรายชื่อผู้ได้รับทุนการศึกษา                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody-WithBoxContent">
                                <a href="/allScholarshipNotify">ดูทั้งหมด>></a>
                                <div className="borderline" />
                                {Resultboxs == "" ?
                                <div className="NotFoundTxtInBox">
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                    ไม่พบข้อมูล
                                </div>
:
                                <div className="EdgeRow-1">
                                    <Row>
                                        {Resultboxs.map((result) => {
                                            props.match.params.id = result.result_id
                                            return (
                                                <div className="col-12 col-sm-6 col-lg-6 col-BoxContentSetting">
                                                    <div key={result.result_id}><Resultbox id={props.match.params.id} /></div>
                                                </div>
                                            );
                                        })}
                                    </Row>
                                </div>
}
                            </CardBody>
                        </div>
                    </Col>

                </Row>
            </Container>

            <Footer />
        </>
    );
}

export default Home;
