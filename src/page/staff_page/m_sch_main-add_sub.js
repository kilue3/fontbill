import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, FormText, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Helmet } from "react-helmet";

import ScholarshipCreateSub from "./m_sch_main-add_sub-props";

const title = 'เพิ่มทุนการศึกษารอง - ระบบผู้ดูแล';

const MscholaraddSub = (props) => {


    return (
        <>
            <ScholarshipCreateSub id={props.match.params.id} />

        </>
    )
}

export default MscholaraddSub;
