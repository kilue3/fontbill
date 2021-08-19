import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Progress, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../../firebase/index"
import NavBar from "../../component/structure_global/navbar";

const title = 'เพิ่มทุนการศึกษา - ระบบผู้ดูแล';

const ScholarshipCreateMain = () => {
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


    ///////////////////////////agen///////////////
    const [Agen, setAgen] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/addAgency")
            .then((response) => {
                setAgen(response.data);
            });
        axios.get("http://localhost:8080/Mback/public/scholarTypeshow")
            .then((response) => {
                setType(response.data);
            });
    }, []);
    ////////////////////////type/////////////////////
    const [type, setType] = useState([]);
    /////////////////////////////////////////////////////
    const initScholar = {

        msch_name: "",

        msch_detail: "",
        ag_id: "",

        sch_type_id: "",
        yearbudged: /^[0-9\b]+$/,


    };
    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = "m_img";
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = mId + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`m_img/${newName}`).put(file);//firebase storeage
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
                storage.ref("m_img").child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    saveStudent(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [
        "image/jpeg",
        "image/png"
    ]
    const formik = useFormik({
        initialValues: initScholar,
        validationSchema: yup.object().shape(

            {//ยอมรับเมื่อข้อมูลตามนี้
                msch_name: yup.string().required("กรุณากรอกชื่อทุนการศึกษา"),
                msch_detail: yup.string().required("กรุณากรอกรายละเอียดทุนการศึกษา"),
                ag_id: yup.number().required("กรุณากรอกหน่วยงานทุนการศึกษา"),
                sch_type_id: yup.number().required("กรุณากรอกประเภททุนการศึกษา"),
                yearbudged: yup.number().required("กรุณากรอกปีทุนการศึกษา"),
                file: yup.mixed().test("fileSize", "ไฟล์รูปใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                }).test("fileType", "รองรับเฉพาะสกุล jpeg,png เท่านั้น", (file) => {
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

                const fileURL = "https://firebasestorage.googleapis.com/v0/b/fileupload-89d50.appspot.com/o/m_img%2F4_1628189027?alt=media&token=7179a67c-841e-47d1-8a6c-467ca99026df"
                saveStudent(fileURL)
            }
        },
    });

    const saveStudent = (fileURL) => {
        var data = {
            msch_name: formik.values.msch_name,

            msch_detail: formik.values.msch_detail,
            ag_id: formik.values.ag_id,

            sch_type_id: formik.values.sch_type_id,
            addby: session.id,
            yearbudged: formik.values.yearbudged,
            m_img: fileURL,


        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data)
            if (data['msch_name'] === "" || data['msch_detail'] === "" || data['ag_id'] === "" || data['sch_type_id'] === "" || data['yearbudged'] === "") {
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                    'error'
                )

            } else {
                axios.post("http://localhost:8080/Mback/public/addMshcholarship", data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////s
                            Swal.fire(
                                'เพิ่มทุนสำเร็จ',
                                'สามารถจัดการเกี่ยวกับทุนได้ในหน้า ทุนการศึกษา',
                                'success'
                            )
                                .then(() => window.location.assign("/staff/MainAddSunsholar/" + res.data.id))

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
                                <li className="breadcrumb-item"><a href="/staff/scholarship">ทุนการศึกษา</a></li>
                                <li className="breadcrumb-item active" aria-current="page">เพิ่มทุนการศึกษา</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/add_circle.png" />
                                    เพิ่มทุนการศึกษา
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
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="category">หมวดหมู่</Label>
                                                    <Input type="select" name="sch_type_id" id="category" value={formik.values.sch_type_id} onChange={formik.handleChange} required>
                                                        <option value=" " >กรุณาเลือกหมวดหมู่</option>

                                                        {type.map((stype) => {

                                                            return (

                                                                <option key={stype.type_id} value={stype.type_id}>{stype.sch_typename}</option>

                                                            );

                                                        })}
                                                    </Input>
                                                    {formik.errors.sch_type_id && formik.touched.sch_type_id && (
                                                        <p style={{ color: "red" }}>{formik.errors.sch_type_id}</p>

                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="agency">หน่วยงาน</Label>
                                                    <Input type="select" name="ag_id" id="agency" value={formik.values.ag_id} onChange={formik.handleChange} required>
                                                        <option value=" " >กรุณาเลือกหน่วยงาน</option>

                                                        {Agen.map((agen) => {

                                                            return (

                                                                <option key={agen.agen_id} value={agen.agen_id}>{agen.agen_name}</option>

                                                            );

                                                        })}

                                                    </Input>
                                                    {formik.errors.ag_id && formik.touched.ag_id && (
                                                        <p style={{ color: "red" }}>{formik.errors.ag_id}</p>

                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col md={12}>
                                                <FormGroup align="left">
                                                    <Label for="category">ปีงบประมาณ</Label>
                                                    <Input type="number" name="yearbudged" id="category" value={formik.values.yearbudged} onChange={formik.handleChange} Yearb required>

                                                    </Input>
                                                    {formik.errors.yearbudged && formik.touched.yearbudged && (
                                                        <p style={{ color: "red" }}>{formik.errors.yearbudged}</p>

                                                    )}
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <FormGroup align="left">
                                            <Label for="first_name">รายละเอียดเพิ่มเติม</Label>
                                            <Input type="textarea" rows="8" name="msch_detail" id="first_name" placeholder="รายละเอียดเพิ่มเติม" value={formik.values.msch_detail} onChange={formik.handleChange} required />
                                            {formik.errors.msch_detail && formik.touched.msch_detail && (
                                                <p style={{ color: "red" }}>{formik.errors.msch_detail}</p>

                                            )}
                                        </FormGroup>
                                        <FormGroup align="left">
                                            <Label for="ssch_file">รูปทุนการศึกษา (หากมี)</Label>
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

export default ScholarshipCreateMain;
