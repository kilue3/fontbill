import React, { useState, useEffect } from 'react';
import './profile.css';
import NavBar from "../component/structure_global/navbar";
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col, Form, Input, Progress, Button, Container, FormGroup } from 'reactstrap';
import classnames from 'classnames';

import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from "yup";
import { storage } from "../firebase/index"

const Profile = () => {

    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        status: localStorage.getItem('status'),

        img: localStorage.getItem('img')
    }

    const [ses, setSes] = useState(session);
    const info = {
        fname: "",
        lname: "",
        email: "",
        img: "",
        grade: "",
        class: "",
        title: "",
        id: "",
        tel: ""
    }
    const [uinfo, setInfo] = useState(info);
    const initImg = {
        file: ""
    }
    //////////////tab////////////////

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const page = () => {
        if (ses.status == "นักเรียน") {

            axios.get("http://localhost:8080/Mback/public/profilestudent/" + ses.id)
                .then((response) => {
                    setInfo(response.data);
                });
        } else if (ses.status == "อาจารย์") {
            axios.get("http://localhost:8080/Mback/public/profilestaff/" + ses.id)
                .then((response) => {
                    setInfo(response.data);
                });
        }
    }
    useEffect(() => {
        page()
    }, [ses.id]);

////////////////////////edit info//////////////////////////////////
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        setInfo({ ...uinfo, [name]: value });
 }
    const saveEdit = () => {
        var Dataedit = {
            fname: uinfo.fname,
            lname: uinfo.lname,
            grade: uinfo.grade,
            class: uinfo.class,
            tel: uinfo.tel
        };//เอาค่าที่รับจาก form มาใส่ใน array
        if (ses.status == "นักเรียน"){
        axios.put("http://localhost:8080/Mback/public/editinfostudent/" + ses.id, Dataedit)//ส่งid และ dataค่าไปแอดใน DB
            .then((response) => {
                console.log(ses.id);
                Swal.fire(

                    'แก้ไข',
                    'ข้อมูลสำเร็จ',
                    'success'
                )
                    page();
            })
            .catch((error) => {
                console.log(error);
            });//ใช้ ดัก Error
        }else{
            axios.put("http://localhost:8080/Mback/public/editinfostaff/" + ses.id, Dataedit)//ส่งid และ dataค่าไปแอดใน DB
                .then((response) => {
                    console.log(ses.id);
                    Swal.fire(

                        'แก้ไข',
                        'ข้อมูลสำเร็จ',
                        'success'
                    )
                    page();
                })
                .catch((error) => {
                    console.log(error);
                });//ใช้ ดัก Error
        }
    };
    ////////////////////////////////////upload img///////////////////////////////
    const [progress, setProgress] = useState(0);
    const uploadFileToFirebase = (file) => {
        const mId = ses.id;
        const timestamp = Math.floor(Date.now() / 1000); //เวลาในนี้
        const newName = mId + "_" + timestamp;//เปลี่ยนชื่อ
        const uploadTask = storage.ref(`${ses.id}/${newName}`).put(file);//firebase storeage
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
                storage.ref(ses.id).child(newName).getDownloadURL().then((fileURL) => {
                    // ref จาก folderไหน  child ชื่อไฟล? get url
                    console.log(fileURL);
                    saveImg(fileURL);
                });
            }

        )

    }
    const FILE_SIZE = 3000 * 1024;
    const SUPPORTED_TYPE = [
        "image/jpeg",
        "image/png"]
    const formik = useFormik({
        initialValues: initImg,
        validationSchema: yup.object().shape(

            {//ยอมรับเมื่อข้อมูลตามนี้
                file: yup.mixed().test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                }).test("fileType", "รองรับเฉพาะสกุลjpeg", (file) => {
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
                saveImg("")
            }
        },
    });

    const saveImg = (fileURL) => {
        var data = {
            img: fileURL,
        };
        if (data.img == "") {
            Swal.fire(
                'กรุณาเลือกรูปก่อน',
                '',
                'warning'
            )
                .then(() => window.location.reload())
        } else {
            if (ses.status == "นักเรียน") {
                axios.put("http://localhost:8080/Mback/public/editimgstudent/" + ses.id, data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////ต่อตรงนี้
                            Swal.fire(

                                'อัพรูปภาพ',
                                'สำเร็จ',
                                'success'
                            )
                                .then(() => window.location.reload())
                        } else {

                            Swal.fire(
                                'อัพรูปภาพ',
                                'ล้มเหลว',
                                'error'
                            )

                        }

                    })

                    .catch((error) => {
                        console.log("error");
                    });//ใช้ ดัก Error

            } else if (ses.status == "อาจารย์") {

                axios.put("http://localhost:8080/Mback/public/editimgstaff/" + ses.id, data)//ส่งค่าไปแอดใน DB
                    .then((res) => {
                        console.log(res.data.message);
                        if (res.data.message == "success") {
                            ////ต่อตรงนี้
                            Swal.fire(

                                'อัพรูปภาพ',
                                'สำเร็จ',
                                'success'
                            )
                                .then(() => window.location.reload())
                        } else {

                            Swal.fire(
                                'อัพรูปภาพ',
                                'ล้มเหลว',
                                'error'
                            )

                        }

                    })

                    .catch((error) => {
                        console.log("error");
                    });//ใช้ ดัก Error
            }
        }


    }
    if (ses.status == "นักเรียน") {
        return (
            <>
                <NavBar />
                <Container className="container emp-profile">

                    <div class="row">
                        <div class="col-md-4">
                            <Form onSubmit={formik.handleSubmit}>
                            <div class="profile-img">
                                <img src={uinfo.img} alt="" />
                                
                                <div class="file btn btn-lg btn-primary">
                                    Change Photo
                                          
                                        <Input type="file" name="file" id="ssch_file" onChange={(e) => {
                                            formik.setFieldValue("file", e.currentTarget.files[0]);
                                        }} />
                                        <br />
                                        {progress !== 0 && (
                                            <Progress value={progress}>{progress}%</Progress>
                                        )}
                                        {formik.errors.file && formik.touched.file && (
                                            <p style={{ color: "red" }}>{formik.errors.file}</p>
                                        )}                                        </div>
                                </div>

                                <Button type="submit" className="Button-Style" block color="success" size="md" >
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                               </Form>
                           
                        </div>
                        <div class="col-md-8">

                            <div class="profile-head">

                                <h5>
                                    {uinfo.fname}{" "}{uinfo.lname}
                                </h5>
                                <h6>
                                    {localStorage.getItem('status')}
                                </h6>
                            </div>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        About
          </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        แก้ไข
          </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <br />
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>User Id :  {uinfo.id}</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Name : {uinfo.fname}{" "}{uinfo.lname}</label>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Email : {uinfo.email}</label>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Phone : {uinfo.tel}</label>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Class : {uinfo.class}</label>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Grade : {uinfo.grade}</label>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <Card body>
                                                <Form>
                                                    <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                                                    <CardText>ชื่อต้น</CardText>
                                                        <Input type="text" name="fname" value={uinfo.fname} onChange={handleInputChange} />

                                                    <CardText>นามสกุล</CardText>
                                                    <Input type="text" name="lname"   value={uinfo.lname} onChange={handleInputChange}/>
                                                   
                                                    <CardText>เบอร์ติดต่อ </CardText>
                                                    <Input type="number" name="tel"  value={uinfo.tel}onChange={handleInputChange}/>
                                                    <CardText>class </CardText>
                                                    <Input type="text" name="class"  value={uinfo.class} onChange={handleInputChange}/>
                                                    <CardText>เกรด </CardText>
                                                    <Input type="number" name="grade"  value={uinfo.grade} onChange={handleInputChange} />
                                                    <hr></hr>
                                                    <Button color="success" onClick={saveEdit} className="btn-lg block">
                                                        บันทึกข้อมูล
                                                    </Button>
                                                </Form>
                                                
                                            </Card>
                                        </Col>

                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>

                    </div>




                </Container>
            </>
        )
    } else {
        return (
            <>
                <NavBar />
                <Container className="container emp-profile">
                
                        <div class="row">
                            <div class="col-md-4">
                            <Form onSubmit={formik.handleSubmit}>
                                <div class="profile-img">
                                    <img src={uinfo.img} alt="" />
                                    <div class="file btn btn-lg btn-primary">
                                        Change Photo
                             <Input type="file" name="file" id="ssch_file" onChange={(e) => {
                                            formik.setFieldValue("file", e.currentTarget.files[0]);
                                        }} />
                                        <br />
                                        {progress !== 0 && (
                                            <Progress value={progress}>{progress}%</Progress>
                                        )}
                                        {formik.errors.file && formik.touched.file && (
                                            <p style={{ color: "red" }}>{formik.errors.file}</p>
                                        )}                                        </div>
                                </div>

                                <Button type="submit" className="Button-Style" block color="success" size="md" >
                                    <img className="buttonMenuIcon" src="https://tzs-global.com/website_factor-image/button_icon/save_white.png" />
                                                บันทึกข้อมูล
                                            </Button>
                                            </Form>
                                {/* <div class="profile-work">
                                <p>WORK LINK</p>
                                <a href="">Website Link</a><br />
                                <a href="">Bootsnipp Profile</a><br />
                                <a href="">Bootply Profile</a>
                                <p>SKILLS</p>
                                <a href="">Web Designer</a><br />
                                <a href="">Web Developer</a><br />
                                <a href="">WordPress</a><br />
                                <a href="">WooCommerce</a><br />
                                <a href="">PHP, .Net</a><br />
                            </div> */}
                            </div>
                        <div class="col-md-8">

                            <div class="profile-head">

                                <h5>
                                    {uinfo.fname}{" "}{uinfo.lname}
                                </h5>
                                <h6>
                                    {localStorage.getItem('status')}
                                </h6>
                            </div>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        About
          </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        แก้ไข
          </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <br />
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>User Id :  {uinfo.id}</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Name : {uinfo.fname}{" "}{uinfo.lname}</label>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Email : {uinfo.email}</label>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label>Phone : {uinfo.tel}</label>
                                                </div>

                                            </div>
                                           
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <Card body>
                                                <Form>
                                                    <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                                                    <CardText>ชื่อต้น</CardText>
                                                    <Input type="text" name="fname" value={uinfo.fname} onChange={handleInputChange} />

                                                    <CardText>นามสกุล</CardText>
                                                    <Input type="text" name="lname" value={uinfo.lname} onChange={handleInputChange} />

                                                    <CardText>เบอร์ติดต่อ </CardText>
                                                    <Input type="number" name="tel" value={uinfo.tel} onChange={handleInputChange} />
                                                   
                                                    <hr></hr>
                                                    <Button color="success" onClick={saveEdit} className="btn-lg block">
                                                        บันทึกข้อมูล
                                                    </Button>
                                                </Form>

                                            </Card>
                                        </Col>

                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>

                </Container>
            </>
        )
    }
}

export default Profile
