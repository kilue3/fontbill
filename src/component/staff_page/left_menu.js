import React, { useState } from 'react'
import { Button, Card, CardTitle, CardText, Row, Col, CardBody } from 'reactstrap';
const StaffLeftMenu = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    return (
        <>
            <div class="TZS-LeftMenu-Container">
                <Row>
                    <div className="col-sm-6 col-md-6 col-lg-12 col-LeftMenuSetting">
                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <a href="/staff_page">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/house.png" />
                                        หน้าหลักระบบผู้ดูแล
                                    </div>
                                </a>
                            </CardBody>
                        </Card>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                {status.status == "ผู้ดูแล" &&
                                    <a href="/staff/manage_user">
                                        <div className="buttonMenu">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                            ผู้ใช้งานในระบบ
                                        </div>
                                    </a>
                                }
                                <a href="/staff/manage_user">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                        ผู้ใช้งานในระบบ
                                    </div>
                                </a>
                                <a href="/staff/approve_user">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/assignment_ind.png" />
                                        อนุมัติผู้ใช้งาน
                                    </div>
                                </a>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-12 col-LeftMenuSetting">
                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
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
                                <a href="/staff/manage_category">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/list.png" />
                                        หมวดหมู่ทุนการศึกษา
                                    </div>
                                </a>
                                <a href="/staff/manage_agency">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/work.png" />
                                        หน่วยงานทุนการศึกษา
                                    </div>
                                </a>
                            </CardBody>
                        </Card>

                        {status.status == "ผู้ดูแล" &&
                            <Card className="CardBackground-1">
                                <CardBody className="CardBody">
                                    <div className="borderline" style={{ margin: '0px' }}/>
                                    <a href="/staff/Manage_system_show">
                                        <div className="buttonMenu">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/flags.png" />
                                            ชื่อและโลโก้
                                        </div>
                                    </a>
                                  
                                    <a href="/staff/slideShow">
                                        <div className="buttonMenu">
                                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/photo.png" />
                                            รูปภาพสไลด์
                                        </div>
                                    </a>

                                    <a href="/staff/ShowApprovalSubScholar">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                        อนุมัติการแสดงทุนการศึกษา
                                    </div>
                                </a>
                                </CardBody>
                            </Card>
                        }
                    </div>
                </Row>
            </div>
        </>
    )
}

export default StaffLeftMenu;
