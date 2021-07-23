import React from 'react';

import NavBar from "../component/structure_global/navbar";
import Footer from "../component/structure_global/footer";
import ResultContent from "./scholarship_page-content/sch_notify-pageProps";
const title = 'ประกาศ';

const result_showpage = (props) => {


    return (
        <>
            <NavBar />
            <ResultContent id={props.match.params.id} />
            <Footer />

        </>
    )
}


export default result_showpage;
