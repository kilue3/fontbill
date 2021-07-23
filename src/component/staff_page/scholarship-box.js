import React from 'react'
import { Button, Card, CardTitle, CardText, Row, Col, CardBody } from 'reactstrap';
const StaffLeftMenu = () => {
    return (
        <>
            <Card className="CardBackground-1">
                <CardBody className="CardBody">
                    <div className="borderline" style={{ margin: '0px' }}/>
                    <a href="/staff_page">
                        <div className="buttonMenu">
                            <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/error_outline_danger.png" />
                            หน้าหลักระบบผู้ดูแล
                        </div>
                    </a>
                </CardBody>
            </Card>
        </>
    )
}

export default StaffLeftMenu;
