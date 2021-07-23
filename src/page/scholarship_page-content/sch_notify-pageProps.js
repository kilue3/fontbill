import React, { useState, useEffect } from 'react';
import { Container, Card, Button, CardTitle, CardText, Row, Col, Badge, CardBody, Breadcrumb, BreadcrumbItem, FormGroup, Label, Input, Form } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import RightContent from "../../component/structure_global/right_content";


const title = 'ทุนกาxรศึกษา';

const ResultContent = ({ id }) => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    

    const [Resultinfo, setResultinfo] = useState([]);


    const page = () => {
        axios.get("http://localhost:8080/Mback/public/Result/" + id)
            .then((response) => {
                setResultinfo(response.data);
            });
   
     


    };

    useEffect(() => {
        page();
    }, []);
    
  
    
    return (
        <>  {Resultinfo.map((result) => {
            return (
                <>
                <Helmet key={result.result_id}>
                <title>{title}</title>
            </Helmet>


            <Container className="container-fluid TZS-Container">
                <Row>

                    <Col lg="3" className="col-ContentSetting">
                     
                    <Card className="CardBackground-1">
                            <CardBody className="">
                                <h6>
                                    <img className="header-1-Icon" src="https://tzs-global.com/website_factor-image/button_icon/save_alt.png" />
                                    ไฟล์ที่เกี่ยวข้อง
                                </h6>
                                <div className="borderline" />
                                { result.file== "" ?
                                    <div className="NotFoundTxtInBox">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                                        ไม่พบข้อมูล
                                    </div>
                                    :
                                    <Button className="Button-Style" color="secondary" href={result.file} block>ดาวน์โหลดไฟล์เอกสาร</Button>

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
                                    <li className="breadcrumb-item"><a href="/allScholarshipNotify">ประกาศทุนการศึกษา</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{result.result_name}</li>
                                </ol>
                            </nav>
                            <Card className="CardHeaderStyle">
                                <h5 style={{ margin: '0px' }}>
                                    {result.result_name}
                                </h5>
                            </Card>
                        </Card>
                        <div className="CardHeaderDetail">
                            <CardBody className="CardBody">
                                คำอธิบาย
                                <div className="borderline" />
                                {result.result_detail}
                            </CardBody>
                        </div>

                    </Col>

                </Row>
            </Container>
   </>
            );
        })}
        </>   
     
    )
}

export default ResultContent;