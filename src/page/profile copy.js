import React, { useState, useEffect } from 'react';
import './profile.css';
import NavBar from "../component/structure_global/navbar";
import axios from 'axios';
import { Form, Input, Progress, Button, Container, TabContent, TabPane } from "reactstrap";
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
    }, []);
    ///////////////tab about
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
                    <Form onSubmit={formik.handleSubmit}>
                        <div class="row">
                            <div class="col-md-4">
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
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <div class="profile-head">

                                        <h5>
                                            {uinfo.fname}{" "}{uinfo.lname}
                                        </h5>
                                        <h6>
                                            {localStorage.getItem('status')}
                                        </h6>
                                    </div>
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                        </li>
                                    </ul>
                                    <br></br>
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
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>10$/hr</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>230</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>6 months</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Your Bio</label><br />
                                            <p>Your detail description</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </Form>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <NavBar />
                <Container className="container emp-profile">
                    <Form onSubmit={formik.handleSubmit}>
                        <div class="row">
                            <div class="col-md-4">
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
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>

                                </ul>
                                <br></br>
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

                            </div>

                        </div>


                    </Form>
                </Container>
            </>
        )
    }
}

export default Profile
