import React from 'react';
import Navbar from "../../component/structure_global/navbar"

import Detail_bill_admin from "./component/detail_bill_admin"
const title = 'ทุนการศึกษา';

const bill_detail_admin = (props) => {

    return (
        <>


            <Navbar/>

            <Detail_bill_admin id={props.match.params.id} />


        </>
    )
}

export default bill_detail_admin;
