import React  from 'react';


import NavBar from "../../component/structure_global/navbar";
import Userinfoprops from "./user_info_props"
const title = 'อนุมัติผู้ใช้งาน - ระบบผู้ดูแล';

const userinfo = (props) => {

    return (
        <>
        <NavBar />
        <Userinfoprops id={props.match.params.id} />
       
    </>
     
    )
}

export default userinfo;
