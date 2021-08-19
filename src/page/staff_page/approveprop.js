import React, { useState } from 'react';
import ApproveUserDetail from "./approve_user_detail"
const title = 'ทุนการศึกษา';

const Approprop = (props) => {
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

    return (
        <>

            <ApproveUserDetail id={props.match.params.id} />


        </>
    )
}

export default Approprop;


