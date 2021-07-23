
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Form, } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
const Listname = ({ classroom }) => {
    const {
        className
    } = classroom;


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const   s_class = "มัธยมศึกษาปีที่ "+classroom
       
    const [listname, setlistname] = useState([]);

    const page = () => {
        axios.get("http://localhost:8080/Mback/public/userlistbyclasspage/" + s_class)
        .then((response) => {
            setlistname(response.data);
        },[]);
    }

    useEffect(() => {
        page();
    },[]);
    

    
    return (
        <div>
            <Button className="Button-Style headerButton" outline color="primary" size="sm" onClick={toggle}>
                {s_class}
            </Button>
          
            <Form align="right" >

                <Modal isOpen={modal} toggle={toggle} className={s_class}>
                    <ModalHeader toggle={toggle}> รายชื่อนักเรียน {s_class}</ModalHeader>
                    <ModalBody>
                        <FormGroup align="left">
                        {listname.map((user) => {
                                            //   ต้องใช้ key กับ id
                                            return (
                                                    <div key={user.s_id}  >
                                                        <a href= {"/userinfo/" + user.s_id}> {user.s_title}{" "}{user.s_fname}{" "} {user.s_lname}</a>
                                                        <br/>
                                           </div>
                                       
                                            );
                                        })}
                        </FormGroup>
                        <div align="right">
                            <div style={{ maxWidth: "250px" }}>

                            </div>
                        </div>

                    </ModalBody>
                   
                </Modal>
            </Form>
        </div>
    )
}

export default  Listname
