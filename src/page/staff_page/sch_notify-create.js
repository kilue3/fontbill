import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Button, Progress } from "reactstrap";

import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../../firebase/index"
import NavBar from "../../component/structure_global/navbar";

const title = 'เพิ่มทุนการศึกษา - ระบบผู้ดูแล';

const Newresult = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [ses, setSes] = useState(session);
    if (ses.status == "นักเรียน") {
        window.location.assign("/");

    }

    //////////////////////รายชื่อทุน/////////////////////
    useEffect(() => {

        axios.get("http://localhost:8080/Mback/public/allSubscholarship")
            .then((response) => {
                setlist(response.data);
            });
    }, []);
    const [listnamescholar, setlist] = useState([]);

    /////////////////////////////////////////////////////
    const initresultScholar = {

        msch_name: "",
        file: "",
        msch_detail: "",
        namescholar: ""


    };

    const [resultScholar, setResultScholar] = useState(initresultScholar);
    //    mr drop







    const saveResult = (fileURL) => {

        var data = {
            result_name: formik.values.msch_name,

            result_detail: formik.values.msch_detail,
            main_scholar_id: formik.values.namescholar,
            file: fileURL,

            addby: session.id,



        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data)
            if (data['result_name'] === "" || data['result_detail'] === "" || data['main_scholar_id'] === "" || data['sch_type_id'] === "" || data['addby'] === "") {
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )

            } else {
                axios.post("http://localhost:8080/Mback/public/addresult", data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////ต่อตรงนี้
                            Swal.fire(
                                'เพิ่มประกาศทุนสำเร็จ',
                                'สามารถจัดการเกี่ยวกับทุนได้ในหน้า ทุนการศึกษา',
                                'success'
                            )
                                .then(() => window.location.assign("/"))

                        } else {

                            Swal.fire(
                                'เพิ่มทุนล้มเหลว',
                                'ชื่อทุนนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุน แล้วลองใหม่อีกครั้ง',
                                'error'
                            )

                        }

                    })

                    .catch((error) => {
                        console.log("error");
                    });//ใช้ ดัก Error

            };
    }
    /////////////////////////////////upload file//////////////////////////

    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = "result";
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = mId + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`resultfile/${newName}`).put(file);//firebase storeage
        //ref เลือกfolder
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                //สร้าง % ในการอัพ โหลด
                setProgress(uploadProgress);
            },
            (error) => {
                console.log(error);

            },
            () => {

                storage.ref(`resultfile`).child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    saveResult(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    const formik = useFormik({
        initialValues: initresultScholar,
        validationSchema: yup.object().shape(

            {//ยอมรับเมื่อข้อมูลตามนี้
                msch_name: yup.string().required("กรุณากรอกชื่อทุนการศึกษา"),
                msch_detail: yup.string().required("กรุณากรอกรายละเอียดประกาศทุนการศึกษา"),
                namescholar: yup.string().required("กรุณาเลือกทุนการศึกษา"),
                file: yup.mixed().test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                }).test("fileType", "รองรับเฉพาะสกุลpdf", (file) => {
                    if (file) {
                        return SUPPORTED_TYPE.includes(file.type);
                    } else {
                        return true;
                    }
                }),

            }),
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file)
            }
            else {
                saveResult("")
            }
        },
    });


    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <NavBar />

            <Container className="container-fluid TZS-Container">
                <Row>

                    <Col lg="3" className="col-ContentSetting">
                        <StaffLeftMenu />
                    </Col>

                    <Col md="9" className="col-ContentSetting">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb CardBackground-1">
                                <li className="breadcrumb-item"><a href="/home">หน้าหลัก</a></li>
                                <li className="breadcrumb-item"><a href="/staff_page">หน้าหลักระบบผู้ดูแล</a></li>
                                <li className="breadcrumb-item"><a href="/staff/scholarship">ประกาศรายชื่อผู้ได้รับทุนการศึกษา</a></li>
                                <li className="breadcrumb-item active" aria-current="page">เพิ่มประกาศรายชื่อผู้ได้รับทุนการศึกษา</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/add_circle.png" />
                                    เพิ่มประกาศผลทุนการศึกษา
                                </h5>
                                <div className="borderline" />
                                <div align="center">
                                    <Form style={{ maxWidth: '700px' }} onSubmit={formik.handleSubmit} >
                                        <FormGroup align="left">
                                            <Label for="ssch_name_main">ชื่อทุนการศึกษา</Label>
                                            <Input type="text" name="msch_name" id="ssch_name_main" placeholder="ชื่อทุนการศึกษา" value={formik.values.msch_name} onChange={formik.handleChange} required />
                                            {formik.errors.msch_name && formik.touched.msch_name && (
                                                <p style={{ color: "red" }}>{formik.errors.msch_name}</p>

                                            )}
                                        </FormGroup>
                                        <Row >
                                            <Col md={12}>
                                                <FormGroup align="left">
                                                    <Label for="category">ชื่อทุนการศึกษา</Label>
                                                    <Input type="select" name="namescholar" id="category" onChange={formik.handleChange} value={formik.values.namescholar} required>
                                                        <option >กรุณาเลือกชื่อทุนการศึกษา</option>

                                                        {listnamescholar.map((stype) => {

                                                            return (

                                                                <option key={stype.ssch_id} value={stype.ssch_id}>{stype.ssch_name}</option>

                                                            );

                                                        })}
                                                    </Input>
                                                    {formik.errors.namescholar && formik.touched.namescholar && (
                                                        <p style={{ color: "red" }}>{formik.errors.namescholar}</p>

                                                    )}
                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <FormGroup align="left">
                                            <Label for="first_name">รายละเอียดเพิ่มเติม</Label>
                                            <Input type="textarea" rows="8" name="msch_detail" id="first_name" placeholder="รายละเอียดเพิ่มเติม" value={formik.values.msch_detail} onChange={formik.handleChange} required />
                                        </FormGroup>
                                        <FormGroup align="left">
                                            <Label for="ssch_file">ไฟล์เอกสารทุน(หากมี)</Label>
                                            <Input type="file" name="file" id="ssch_file" onChange={(e) => {
                                                formik.setFieldValue("file", e.currentTarget.files[0]);

                                            }} />
                                            <br />
                                            {progress !== 0 && (
                                                <Progress value={progress}>{progress}%</Progress>
                                            )}
                                            {formik.errors.file && formik.touched.file && (
                                                <p style={{ color: "red" }}>{formik.errors.file}</p>
                                            )}
                                        </FormGroup>


                                        <div className="borderline" />
                                        <div style={{ maxWidth: "300px" }} align="left">
                                            <Button className="Button-Style" block color="success" size="md" >
                                                <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>

                </Row>
            </Container>

        </>
    )
}

export default Newresult;
