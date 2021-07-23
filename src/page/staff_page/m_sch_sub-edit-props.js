import React, { useState, useEffect } from 'react';
import StaffLeftMenu from '../../component/staff_page/left_menu';
import { Container, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, Alert, Button, Progress } from "reactstrap";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../../firebase/index"

import NavBar from "../../component/structure_global/navbar";

const title = 'แก้ไขข้อมูลทุนการศึกษาย่อย - ระบบผู้ดูแล';

const ScholarshipCreateSub = ({ id }) => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status')
    }
    const [ses, setSes] = useState(session);

    //////mscholar////////////
    const initMscholar = {
        id: "",
        content: "",
        name: "",
        opday: "",
        edday: "",
        web: "",
        badget: "",
        badgetfor1: "",
        amount: "",
        mid: "",
        file: ""
    }
    const [Mscholar, setMscholar] = useState(initMscholar);
    useEffect(() => {
        axios.get("http://localhost:8080/Mback/public/findSshcholarshippage/" + id)
            .then((response) => {
                setMscholar(response.data);
                console.log(Mscholar);
            });
    }, [id]);


    const initScholarsub = {
        ssch_name: "",
        ssch_detail: "",
        ssch_budget: "",
        ssch_amount: "",
        ssch_other: "",
        ssch_notes: "",
        ssch_dopen: "",
        ssch_dclose: "",
        ssch_web: "",
        ssch_file: "",

        by_st_id: ses.id,


    }
    const [Scholarsub, setScholarsub] = useState(initScholarsub);

    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = Scholarsub.msch_id;
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = mId + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`file/${newName}`).put(file);//firebase storeage
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
                storage.ref("file").child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    saveScholar(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [

        "application/pdf",
    ]
    const formik = useFormik({
        initialValues: initScholarsub,
        validationSchema: yup.object().shape(

            {//ยอมรับเมื่อข้อมูลตามนี้
                ssch_name: yup.string().required("กรุณากรอกชื่อทุนการศึกษา"),
                ssch_detail: yup.string().required("กรุณากรอกรายละเอียดทุนการศึกษา"),
                ssch_budget: yup.number().required(),
                Budget_per_capital: yup.number().required(),
                ssch_amount: yup.number().required(),
                // ssch_notes: yup.string().required("กรอกข้อมูล"),
                ssch_dopen: yup.string().required("กรุณากรอกเวลาเปิดทุนการศึกษา"),
                ssch_dclose: yup.string().required("กรุณากรอกเวลาปิดทุนการศึกษา"),
                ssch_web: yup.string().required("กรอกข้อมูลเว็บไซต์ทุนการศึกษา"),
                file: yup.mixed().test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                }).test("fileType", "รองรับเฉพาะสกุลPDF", (file) => {
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
                saveScholar("")
            }
        },
    });

    const saveScholar = (fileURL) => {
        // e.preventDefault()

        var data = {
            ssch_name: formik.values.ssch_name,
            ssch_detail: formik.values.ssch_detail,
            ssch_budget: formik.values.ssch_budget,
            Budget_per_capital: formik.values.Budget_per_capital,
            ssch_amount: formik.values.ssch_amount,
            ssch_notes: formik.values.ssch_notes,
            ssch_dopen: formik.values.ssch_dopen,
            ssch_dclose: formik.values.ssch_dclose,
            ssch_web: formik.values.ssch_web,
            ssch_file: fileURL,

            by_st_id: Scholarsub.by_st_id,



        };//เอาค่าที่รับจาก form มาใส่ใน json
        if (data['ssch_name'] === "" || data['ssch_detail'] === "" || data['ssch_budget'] === ""
            || data['Budget_per_capital'] === "" || data['ssch_amount'] === "" || data['ssch_dopen'] === "" || data['ssch_dclose'] === "" || data['ssch_web'] === ""
            || data['msch_id'] === "" || data['by_st_id'] === "") {//ถ้าฟิลไหนเป็นค่าว่างจะไม่สมารถเพิ่มได้
            Swal.fire(

                'เกิดข้อผิดพลาด',
                'มีปัญหาบางอย่างเกิดขึ้น โปรดลองใหม่อีกครั้ง',
                'error'
            )

        } else {
            axios.put("http://localhost:8080/Mback/public/editSubshcholarship/" + id, data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เพิ่มทุนย่อยสำเร็จ',
                            'สามารถจัดการเกี่ยวกับทุนย่อยได้ในหน้า ทุนการศึกษา',
                            'success'
                        )
                            .then(() => window.location.assign("/staff/scholarship"))

                    } else {

                        Swal.fire(
                            'เพิ่มทุนย่อยล้มเหลว',
                            'ชื่อทุนย่อยนี้มีอยู่แล้วในระบบ โปรดเปลี่ยนชื่อทุนย่อย แล้วลองใหม่อีกครั้ง',
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
                                <li className="breadcrumb-item"><a href="/staff_staff">หน้าหลักระบบผู้ดูแล</a></li>
                                <li className="breadcrumb-item"><a href="/staff/scholarship">ทุนการศึกษา</a></li>
                                <li className="breadcrumb-item"><a href="/staff/scholarship">#ชื่อทุนการศึกษาหลัก</a></li>
                                <li className="breadcrumb-item active" aria-current="page">แก้ไขทุนการศึกษาย่อย ({Mscholar.name})</li>
                            </ol>
                        </nav>

                        <Card className="CardBackground-1">
                            <CardBody className="CardBody">
                                <h5 style={{ margin: '0px' }}>
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/edit.png" />
                                    แก้ไขทุนการศึกษาย่อย
                                </h5>
                                <h6 className="text-secondary" style={{ margin: '0px', marginLeft: "35px" }}>
                                    {Mscholar.name}<br /> ใน #ชื่อทุนการศึกษาหลัก
                                </h6>
                                <div className="borderline" />
                                <div align="center">
                                    <Form style={{ maxWidth: '700px' }} onSubmit={formik.handleSubmit}>
                                        <FormGroup align="left">
                                            <Label for="ssch_sub_name">ชื่อทุนการศึกษาย่อย</Label>
                                            <Input type="text" name="ssch_name" id="open_date" placeholder={Mscholar.name} value={formik.values.ssch_name}
                                                onChange={formik.handleChange} />
                                            {formik.errors.ssch_name && formik.touched.ssch_name && (
                                                <p style={{ color: "red" }}>{formik.errors.ssch_name}</p>

                                            )}

                                        </FormGroup>

                                        <div className="borderline" />
                                        <h6 align="left">ช่วงเวลาเปิดรับสมัคร</h6>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="open_date">วันที่เริ่ม</Label>
                                                    <Input type="date" name="ssch_dopen" id="open_date" placeholder={Mscholar.edday} value={formik.values.ssch_dopen} onChange={formik.handleChange} />
                                                    {formik.errors.ssch_dopen && formik.touched.ssch_dopen && (
                                                        <p style={{ color: "red" }}>{formik.errors.ssch_dopen}</p>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="close_date">วันที่สิ้นสุด</Label>
                                                    <Input type="date" name="ssch_dclose" id="close_date" placeholder={Mscholar.opday} value={formik.values.ssch_dclose}
                                                        onChange={formik.handleChange} />
                                                    {formik.errors.ssch_dclose && formik.touched.ssch_dclose && (
                                                        <p style={{ color: "red" }}>{formik.errors.ssch_dclose}</p>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <div className="borderline" />
                                        <h6 align="left">งบประมาณของทุนการศึกษา</h6>
                                        <Row >
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="total_budget">งบประมาณทั้งหมด</Label>
                                                    <Input type="number" min="0" name="ssch_budget" id="total_budget" placeholder={Mscholar.badget} value={formik.values.ssch_budget} onChange={formik.handleChange} />
                                                    {formik.errors.ssch_budget && formik.touched.ssch_budget && (
                                                        <div style={{ color: "red" }}>*กรอกข้อมูลที่เป็นตัวเลขเท่านั้นหรือถ้าไม่ทราบก็ใส่เป็น0</div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup align="left">
                                                    <Label for="budget_ssch">งบประมาณต่อทุน</Label>
                                                    <Input type="number" min="0" name="Budget_per_capital" id="budget_ssch" placeholder={Mscholar.badgetfor1} value={formik.values.Budget_per_capital} onChange={formik.handleChange} />
                                                    {formik.errors.Budget_per_capital && formik.touched.Budget_per_capital && (
                                                        <div style={{ color: "red" }}>*กรอกข้อมูลที่เป็นตัวเลขเท่านั้นหรือถ้าไม่ทราบก็ใส่เป็น0</div>
                                                    )}

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <div className="borderline" />
                                        <FormGroup align="left">
                                            <Label for="open_count">จำนวนที่เเปิดรับ</Label>

                                            <Input type="number" min="0" name="ssch_amount" id="open_count" placeholder={Mscholar.amount} value={formik.values.ssch_amount} onChange={formik.handleChange} />
                                            {formik.errors.ssch_amount && formik.touched.ssch_amount && (
                                                <div style={{ color: "red" }}>*กรอกข้อมูลที่เป็นตัวเลขเท่านั้นหรือถ้าไม่ทราบก็ใส่เป็น0</div>
                                            )}

                                        </FormGroup>
                                        <FormGroup align="left">
                                            <Label for="more_detail">รายละเอียดเพิ่มเติม</Label>
                                            <Input type="textarea" name="ssch_detail" id="more_detail" placeholder={Mscholar.content} value={formik.values.ssch_detail} onChange={formik.handleChange} />
                                            {formik.errors.ssch_detail && formik.touched.ssch_detail && (
                                                <p style={{ color: "red" }}>{formik.errors.ssch_detail}</p>
                                            )}
                                        </FormGroup>
                                        <FormGroup align="left">
                                            <Label for="more_detail">ลิงค์ทุน</Label>
                                            <Input type="textarea" name="ssch_web" id="more_detail" placeholder={Mscholar.web} value={formik.values.ssch_web} onChange={formik.handleChange} />
                                            {formik.errors.ssch_web && formik.touched.ssch_web && (
                                                <p style={{ color: "red" }}>{formik.errors.ssch_web}</p>
                                            )}
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
                                            <Button type="submit" className="Button-Style" block color="success" size="md" >
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

export default ScholarshipCreateSub;
