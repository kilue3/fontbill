import React, { useState, useEffect } from 'react'
import { Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import axios from 'axios';
import Search from '../structure_global/search ';

const RightContent = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [status, SetStatus] = useState(session);
    const [Mscholar, setMscholar] = useState([]);
    const [FollowCommet, setFollowCommet] = useState([]);
    const [MainscholarCommet, setMainscholarCommet] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/endshcholarshiptoday")
            .then((response) => {
                setMscholar(response.data);
            });
        if (status.id != null && status.status == "นักเรียน") {
            axios.get("http://localhost:8080/Mback/public/nottiflyfollowcomment/" + status.id)
                .then((response) => {
                    setFollowCommet(response.data);
                });
        }
        if (status.id != null && status.status == "อาจารย์" || status.status == "ผู้ดูแล") {
            axios.get("http://localhost:8080/Mback/public/nottiflyfollowcommentStaff/" + status.id)
                .then((response) => {
                    setFollowCommet(response.data);
                });
        } if (status.id != null && status.status == "อาจารย์" || status.status == "ผู้ดูแล") {
            axios.get("http://localhost:8080/Mback/public/nottiflyfollowcommentStaffMain/" + status.id)
                .then((response) => {
                    setMainscholarCommet(response.data);
                });
        }
    }, []);

    return (
        <>
            <Search />
            {status.status == "นักเรียน" ?
                <Card className="CardBackground-1">
                    <CardBody>
                        <h6>
                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/notification_important.png" />
                            การแจ้งเตือน <a href="/allnotification">ดูทั้งหมด</a>
                        </h6>


                        <div className="borderline" />
                        {Mscholar == "" && FollowCommet.message == "fail" ?
                            <div className="text-danger" align="center" >
                                <div className="NotFoundTxtInBox text-muted" style={{ marginTop: '25px', marginBottom: '15px' }}>
                                    ไม่มีการแจ้งเตือน
                                </div>
                            </div>
                            :
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


                                {status.status == "นักเรียน" & FollowCommet.message == "success" ? FollowCommet.data.map((Commet) => {

                                    return (
                                        <div>
                                            <a href={"/scholarshipSub/" + Commet.ssch_id}>
                                                <div className="buttonMenu" key={Commet.ssch_id}>
                                                    <b>{Commet.s_fname}{Commet.st_fname}</b>  ได้แสดงความคิดเห็นใน
                                                    <br/>
                                                    <b>{Commet.ssch_name.slice(0, 30)}...</b>
                                                    <br/>
                                                    <small>{Commet.Cm_time}</small>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                }) : <div></div>}

                            </CardText>
                        }
                    </CardBody>
                </Card> : <div></div>
            }
            {status.status == "อาจารย์" || status.status == "ผู้ดูแล" ?

                <Card className="CardBackground-1">
                    <CardBody>
                        <h6>
                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/notification_important.png" />
                            การแจ้งเตือน
                        </h6>
                        <div className="borderline" />
                        {Mscholar == "" && FollowCommet.message == "fail" && MainscholarCommet.message == "fail" ?
                            <div className="text-danger" align="center" >
                                <div className="NotFoundTxtInBox text-muted" style={{ marginTop: '25px', marginBottom: '15px' }}>
                                    ไม่มีการแจ้งเตือน
                                </div>
                            </div>
                            :

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


                                {status.status == "ผู้ดูแล" | status.status == "อาจารย์" && MainscholarCommet.message == "success" ?
                                    <CardText>
                                        <div style={{ marginBottom: "10px" }}>
                                            <b>แจ้งเตือนจากทุนหลัก</b>{" "}<a href="/allMainscholarnotificationStaff">ดูทั้งหมด</a>
                                        </div>
                                        {MainscholarCommet.data.map((MCommet) => {
                                            return (
                                                <a href={"/scholarshipMain/" + MCommet.msch_id}>
                                                    <div className="buttonMenu text-muted" key={MCommet.msch_id}>
                                                        <b>{MCommet.s_fname}{MCommet.st_fname}</b>  ได้แสดงความคิดเห็นใน  
                                                        <br/>
                                                        <b>{MCommet.msch_name.slice(0, 30)}...</b>
                                                        <br/>
                                                        <small>{MCommet.Cm_time}</small>
                                                    </div>
                                                </a>
                                            );
                                        })}        
                                    </CardText>
                                    : <div></div>}
                                {status.status == "ผู้ดูแล" | status.status == "อาจารย์" && FollowCommet.message == "success" ?
                                    <CardText>
                                        <div style={{ marginBottom: "10px" }}>
                                            <b>แจ้งเตือนจากทุนย่อย</b>{" "}<a href="/allnotificationStaff">ดูทั้งหมด</a>
                                        </div>
                                        {FollowCommet.data.map((Commet) => {
                                            return (
                                                <a href={"/scholarshipSub/" + Commet.ssch_id}>
                                                    <div className="buttonMenu text-muted" key={Commet.ssch_id}>
                                                        <b>{Commet.s_fname}{Commet.st_fname}</b>  ได้แสดงความคิดเห็นใน
                                                        <br/>
                                                        <b>{Commet.ssch_name.slice(0, 30)}...</b>
                                                        <br/>
                                                        <small>{Commet.Cm_time}</small>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </CardText>
                                    : <div></div>}
                            </CardText>
                        }
                    </CardBody>
                </Card> : <div></div>
            }
            {status.status == null ?
                <div>
                </div> :
                <div>
                    {status.status == "นักเรียน" ?
                        <Card className="CardBackground-1">
                            <CardBody>
                                <a href="/followpage">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/bookmark.png" />
                                        ทุนการศึกษาที่ติดตามไว้
                                    </div>
                                </a>
                                <a href="/allscholarship">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                        ทุนการศึกษา
                                    </div>
                                </a>
                                <a href="/allScholarshipNotify">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/campaign.png" />
                                        ประกาศรายชื่อผู้ได้รับทุนการศึกษา
                                    </div>
                                </a>
                            </CardBody>
                        </Card>
                        : <div></div>}
                    {status.status == "อาจารย์" || status.status == "ผู้ดูแล" ?
                        <Card className="CardBackground-1" style={{ border: '2px solid #007bff' }}>
                            <div style={{ marginTop: '-1px', marginLeft: '-1px', marginBottom: '-15px', background: '#007bff', color: '#FFFFFF', borderTopLeftRadius: '10px', borderBottomRightRadius: '10px', maxWidth: '150px', border: '1px solid #007bff' }} align="center">
                                เครื่องมือสำหรับครู
                            </div>
                            <CardBody>
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
                                        ประกาศรายชื่อผู้ได้รับทุนการศึกษา
                                    </div>
                                </a>
                                <a href="/staff/manage_user">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/person.png" />
                                        ผู้ใช้งานในระบบ
                                    </div>
                                </a>
                            </CardBody>
                        </Card>
                        : <div></div>}
                    {status.status == "อาจารย์" || status.status == "ผู้ดูแล" ?
                        <Card className="CardBackground-1">
                            <CardBody>
                                <a href="/allscholarship">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/article.png" />
                                        ทุนการศึกษา
                                    </div>
                                </a>
                                <a href="/allScholarshipNotify">
                                    <div className="buttonMenu">
                                        <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/campaign.png" />
                                        ประกาศรายชื่อผู้ได้รับทุนการศึกษา
                                    </div>
                                </a>
                            </CardBody>
                        </Card>
                    : <div></div>}
                </div>
            }

            <Card className="CardBackground-1">
                <CardBody>
                    <a href="/AllType">
                        <div className="buttonMenu">
                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/list_alt.png" />
                            ประเภท ทุนการศึกษา
                        </div>
                    </a>
                    <a href="/AllAgency">
                        <div className="buttonMenu">
                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/work.png" />
                            หน่วยงาน ทุนการศึกษา
                        </div>
                    </a>
                    <a href="/AllYear">
                        <div className="buttonMenu">
                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/today.png" />
                            ปีงบประมาณ ทุนการศึกษา
                        </div>
                    </a>
                </CardBody>
            </Card>
        </>
    )
}

export default RightContent;