import React from 'react';
import Navbar from "../../component/structure_global/navbar"

import BillbyYearpage from "./billbyyear"
const title = 'ทุนการศึกษา';

const bill_yearpage = (props) => {

    return (
        <>



            <BillbyYearpage id={props.match.params.id} />


        </>
    )
}

export default bill_yearpage;
