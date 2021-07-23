import React, { useState, useEffect } from 'react';
import { Container, Card, Button, CardTitle, CardText, Row, Col, Badge, CardBody } from "reactstrap";
import { Helmet } from "react-helmet";
import RightContent from "../component/structure_global/right_content";

import NavBar from "../component/structure_global/navbar";
import Footer from "../component/structure_global/footer";
import axios from 'axios';
const title = 'หน้าแรก';


const Follow = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);

    const [Mscholar, setMscholar] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/followlist/"+session.id)
            .then((response) => {
                setMscholar(response.data);
            });
    }, []);
    return (
        <>
            <Helmet>
                <title>ทุนการศึกษาที่ติดตามไว้</title>
            </Helmet>
            <NavBar />
            <Container className="container-fluid TZS-Container">
                <Row>
                    <Col lg="12" className="col-ContentSetting" style={{ marginBottom: '20px' }}>
                    </Col>

                    <Col lg="3" className="col-ContentSetting">
                        <RightContent />
                    </Col>

                    <Col lg="9" className="col-ContentSetting">
                        <Card className="CardBackground-1">
                            <CardBody className="CardBody-WithBoxContent">
                                <CardTitle>ทุนการศึกษาที่ติดตามไว้</CardTitle>
                            {Mscholar.map((scholar) => {
                                            return (
                                                <div className="col-12 col-BoxContentSetting">
                                                    <a href={"/scholarshipSub/" + scholar.ssch_id}>
                            <div className="buttonMenu" key={scholar.msch_id}>
                            {scholar.ssch_name}
                            </div>
                        </a>
                                                   
                                                </div>
                                            );
                                        })}
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Container>

        </>
    );
}

export default Follow;
