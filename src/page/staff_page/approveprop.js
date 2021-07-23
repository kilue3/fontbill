import React, { useState } from 'react';
import { Container, Card, Button, CardTitle, CardText, Row, Col, Badge, CardBody, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Helmet } from "react-helmet";
import ApproveUserDetail from "./approve_user_detail"
const title = 'ทุนการศึกษา';

const Approprop = (props) => {

    return (
        <>

            <ApproveUserDetail id={props.match.params.id} />


        </>
    )
}

export default Approprop;


