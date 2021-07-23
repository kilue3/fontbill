import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button,  CardBody, CardHeader } from "reactstrap";

const Resultbox = ({ id }) => {
    const initMscholar = {
        id: "",
        content: "",
        name: "",
    }
    const [resultScholar, setMscholar] = useState(initMscholar);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/findresultshcholarship/" + id)
            .then((response) => {
                setMscholar(response.data);
            });
    }, [id]);

    return (
        <>
                <Card className="CardBackground-2" style={{ minHeight: '200px' }}>
                    <a href={"/ScholarshipNotify/" + resultScholar.id}>
                        <CardHeader className="" style={{ background: "#dadce0", borderRadius: "10px", borderBottom: "0px" }}>
                            <h6 className="text-dark" style={{ margin: '0px' }}>
                                <b>{resultScholar.name}</b>
                            </h6>
                        </CardHeader>
                    </a>
                    <CardBody className="text-secondary" style={{ padding: "10px" }}>
                    {resultScholar.content}
                        <div className="borderline" />
                        <Button href={"/ScholarshipNotify/" + resultScholar.id} className="Button-Style" outline >อ่านทั้งหมด</Button>
                    </CardBody>
                </Card>
        </>
    )
}

export default Resultbox;