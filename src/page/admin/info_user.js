
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
const Info_user = ({ id }) => {
    const {
        className
    } = id;


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

   
    const initsentcomment = {
        detail: "",
    }
    const [sentcomment, setsentcomment] = useState(initsentcomment);
    const inputdata = (event) => {
        let { name, value } = event.target;
        setsentcomment({ ...sentcomment, [name]: value });


    }
    const Editcomment = (e) => {
        e.preventDefault()

        var data = {
            cm_dt: sentcomment.detail
        };//เอาค่าที่รับจาก form มาใส่ใน json

        if (data['cm_dt'] === "") {
            Swal.fire(
                'เกิดข้อผิดพลาด',
                'กรุณากรอกข้อความใหม่อีกครั้ง',
                'error'
            )

        } else {
            axios.post("http://localhost:8080/Mback/public/commentedit/" + id, data)//ส่งค่าไปแอดใน DB
                .then((res) => {
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(
                            'Comment Success',
                            '',
                            'success'
                        )
                            .then(() => setModal(!modal),
                                window.location.reload())

                    } else {

                        Swal.fire(
                            'Comment fail',
                            '',
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
        <div style={{ marginTop: '0px', marginLeft: '10px' }}>
            <Button className='danger' onClick={toggle}>รายละเอียด</Button>
            <Form align="right" >

                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}> กหฟ </ModalHeader>
                    <ModalBody>
                        <FormGroup align="left">
                            <Label for="more_detail">แสดงความคิดเห็น</Label>

                            <Input type="textarea" name="detail" id="more_detail" onChange={inputdata} placeholder="เขียนความคิดเห็นที่นี่" />
                        </FormGroup>
                        <div align="right">
                            <div style={{ maxWidth: "250px" }}>

                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="Button-Style" size="md" onClick={Editcomment}>ตกลง</Button>
                        <Button color="danger" className="Button-Style" size="md" onClick={toggle}>ยกเลิก</Button>
                    </ModalFooter>
                </Modal>
            </Form>
        </div>
    )
}

export default Info_user
