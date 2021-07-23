import React, { useState } from 'react';

import NavBar from "../component/structure_global/navbar";
import Footer from "../component/structure_global/footer";
import Subpage from "./scholarship_page-content/scholarship_sub-content"
const title = 'ทุนการศึกษา';

const ShowschSub = (props) => {

    return (
        <>
            <NavBar />
            <Subpage id={props.match.params.id} />
            <Footer />

        </>
    )
}

export default ShowschSub;


