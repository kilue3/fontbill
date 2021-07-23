import React from 'react';

import NavBar from "../component/structure_global/navbar";
import Footer from "../component/structure_global/footer";
import Mcontent from "./scholarship_page-content/scholarship_main-content"
const title = 'ทุนการศึกษา';

const ShowschMain = (props) => {

    return (
        <>


            <NavBar />

            <Mcontent id={props.match.params.id} />

            <Footer />

        </>
    )
}

export default ShowschMain;
