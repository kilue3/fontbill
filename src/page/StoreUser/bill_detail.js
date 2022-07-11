import React from 'react';
import Navbar from "../../component/structure_global/navbar"

import Bill_detail_page from "./component/bill_detailpage"
const title = 'ทุนการศึกษา';

const Billdetail = (props) => {

    return (
        <>


            <Navbar/>

            <Bill_detail_page id={props.match.params.id} />


        </>
    )
}

export default Billdetail;
