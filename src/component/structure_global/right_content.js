import React, { useState, useEffect } from 'react'
import { Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import axios from 'axios';

const RightContent = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    const [Mscholar, setMscholar] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/endshcholarshiptoday")
            .then((response) => {
                setMscholar(response.data);
            });
    }, []);

    return (
        <>
            {status.status == null ?
            <div>
                </div>:
                <Card className="CardBackground-1">
                    <CardBody>
                      
                        {status.status == "นักเรียน" ?
                              <a href="/followpage">
                              <div className="buttonMenu">
                                  <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                  ทุนการศึกษาที่ติดตามไว้
                              </div>
                          </a>
                            : <div></div>}
                            {status.status == "อาจารย์" ?
                                <div>
                                    <a href="/staff_page">
                                        <div className="buttonMenu">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/house.png" />
                                            หน้าหลักระบบผู้ดูแล
                                        </div>
                                    </a>
                                    <a href="/staff/scholarship">
                                        <div className="buttonMenu">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                            ทุนการศึกษา
                                        </div>
                                    </a>
                                    <a href="/staff/resultpagestaff">
                                        <div className="buttonMenu">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/campaign.png" />
                                            ประกาศผลทุนการศึกษา
                                        </div>
                                    </a>
                                    <a href="/staff/manage_user">
                                        <div className="buttonMenu">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                            ผู้ใช้งานในระบบ
                                        </div>
                                    </a>
                                </div>
                            : <div></div>}
                       
                             
                    </CardBody>
                </Card>
            }
            <Card className="CardBackground-1">
                <CardBody>
                    <h6>
                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/notification_important.png" />
                        การแจ้งเตือน
                    </h6>
                    <div className="borderline" />
                    ไม่มีการแจ้งเตือน
                    <CardText>
                    {Mscholar.map((scholar) => {
                                            return (
                                                <div className="col-12 col-BoxContentSetting">
                                                    <a href={"/scholarshipSub/" + scholar.ssch_id}>
                            <div className="buttonMenu" key={scholar.msch_id}>
                            {scholar.ssch_name}ใกล้ปิดรับสมัครวันนี้
                            </div>
                        </a>
                                                   
                                                </div>
                                            );
                                        })}
                                                            </CardText>
                </CardBody>
            </Card>
        </>
    )
}

export default RightContent;