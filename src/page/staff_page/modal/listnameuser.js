
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Table, Form, } from 'reactstrap';
import axios from 'axios';

import Listnameuser from '../../staff_page/modal/listnameuser_page';
const Listname = ({ classroom }) => {
    const {
        className
    } = classroom;


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const s_class = classroom

    const [listname, setlistname] = useState([]);

    const page = () => {
        axios.get("http://localhost:8080/Mback/public/userlistbyclasspage/" + s_class)
            .then((response) => {
                setlistname(response.data);
            }, []);
    }

    useEffect(() => {
        page();
    }, []);



    return (
        <div>
            <Button className="Button-Style headerButton" outline color="primary" size="sm" onClick={toggle}>
                มัธยมศึกษาปีที่ {s_class}
            </Button>

            <Form align="right" >

                <Modal isOpen={modal} toggle={toggle} className={s_class}>
                    <ModalHeader toggle={toggle}> รายชื่อนักเรียน {s_class}</ModalHeader>
                    <ModalBody>
                        <FormGroup align="left">
                            <span>จำนวนทั้งหมด {listname.length}</span>
                            <Listnameuser id={s_class} />
                        </FormGroup>
                    </ModalBody>

                </Modal>
            </Form>
        </div>
    )
}

export default Listname
